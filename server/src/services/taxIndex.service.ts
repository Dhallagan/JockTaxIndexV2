import { Response } from 'express';
import { TaxIndexRepository } from "../repositories/taxIndex.repository";
import { LeagueRepository } from './../repositories/league.repository';
import readXlsxFile from 'read-excel-file/node'
import { Workbook } from 'exceljs'
import Tempfile from 'tempfile'
import {Tax} from './../models/Tax'
import { AnyTxtRecord } from 'dns';

export class TaxIndexService {

    private taxIndexRepository: TaxIndexRepository;
    private leagueRepository: LeagueRepository;

    constructor() {
        this.taxIndexRepository = new TaxIndexRepository();
        this.leagueRepository = new LeagueRepository();
    }

    public async createTaxIndex(res: Response, leagueId: number, viewModel: any) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        viewModel.League = league;
        await this.taxIndexRepository.createTaxIndex(viewModel);

        return res.status(200).json({'msg': 'TaxIndex has been added successfully.'})
    }

    public async getTaxIndexes(res: Response, leagueId: number) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        const taxIndexes = await this.taxIndexRepository.getTaxIndexes(league);

        return res.status(200).json(taxIndexes);
    }

    public async getTaxIndex(res: Response, leagueId: number, taxIndexId: number) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        const taxIndex = await this.taxIndexRepository.getTaxIndex(league, taxIndexId);
        //e.log(taxIndex);

        if (!taxIndex) {
            return res.status(422).json({'errors': [{'msg': 'TaxIndex does not exist.'}]})
        }

        return res.status(200).json(taxIndex);
    }

    public async updateTaxIndex(res: Response, leagueId: number, taxIndexId: number, viewModel: any) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        const taxIndex = await this.taxIndexRepository.getTaxIndex(league, taxIndexId);

        if (!taxIndex) {
            return res.status(422).json({'errors': [{'msg': 'TaxIndex does not exist.'}]})
        }

        viewModel.League = league;
        await this.taxIndexRepository.updateTaxIndex(taxIndexId, viewModel);

        return res.status(200).json({'msg': 'Updated successfully.'})
    }

    public async deleteTaxIndex(res: Response, leagueId: number, taxIndexId: number) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        const taxIndex = await this.taxIndexRepository.getTaxIndex(league, taxIndexId);

        if (!taxIndex) {
            return res.status(422).json({'errors': [{'msg': 'TaxIndex does not exist.'}]})
        }

        await this.taxIndexRepository.deleteTaxIndex(taxIndexId);

        return res.status(200).json({'msg': 'Removed successfully'});
    }

    public async importTaxIndexes(res: Response, leagueId: number, filePath: string) {

        const schema = {
            'Team': {
                prop: 'Team',
                type: String
            },
            'League': {
                prop: 'League',
                type: String
            },
            'Country': {
                prop: 'Country',
                type: String
            },
            'IncomeFrom': {
                prop: 'IncomeFrom',
                type: Number
            },
            'IncomeTo': {
                prop: 'IncomeTo',
                type: Number
            },
            'NetIncome': {
                prop: 'NetIncome',
                type: Number
            },
            'Deductions': {
                prop: 'Deductions',
                type: Number
            },
            'FederalTax': {
                prop: 'FederalTax',
                type: Number
            },
            'MedicareTax': {
                prop: 'FicaTax',
                type: Number
            },
            'StateTax': {
                prop: 'StateTax',
                type: Number
            },
            'CityTax': {
                prop: 'CityTax',
                type: Number
            },
            'Credits': {
                prop: 'Credits',
                type: Number
            },
            'ForeignTax': {
                prop: 'ForeignTax',
                type: Number
            },
            'ForeignTaxCredit': {
                prop: 'ForeignTaxCredit',
                type: Number
            },
        }
        const data = await readXlsxFile(filePath, { schema });
        console.log(data.errors);

        for (let i = 0; i < data.rows.length; i++) {

            const leagueExists: any = await this.leagueRepository.getLeagueByName(data.rows[i].League);

            if (!leagueExists) {
                await this.leagueRepository.createLeague(data.rows[i].League);
                const lastCreatedLeague: any = await this.leagueRepository.getLeagueByName(data.rows[i].League);
                data.rows[i].League = lastCreatedLeague.Id;

                continue;
            }

            data.rows[i].League = leagueExists.Id;
        }

        await this.taxIndexRepository.clearTaxIndexes();
        await this.taxIndexRepository.createTaxIndex(data.rows);

        return res.status(200).json({'msg': 'Tax Data has been imported successfully.'});
    }

    public async CompareIndexes(res: Response, leagueId: number, team1ID: number, team2ID: number, contractAmount: number, contractLength: number, escrow: number, discountRate: number) {
        const league = await this.leagueRepository.getLeagueById(leagueId);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }
       
        const team1Index = await this.taxIndexRepository.getTaxIndex(league, team1ID);
        const team2Index = await this.taxIndexRepository.getTaxIndex(league, team2ID);
    
        if(!team1Index || !team2Index)
            return res.status(422).json({'errors': [{'msg': 'Missing one of the team indexes.'}]})
        
        var team1tax = this.CalculateTax(team1Index, contractAmount, contractLength, escrow, discountRate)
        var team2tax = this.CalculateTax(team2Index, contractAmount, contractLength, escrow, discountRate)

        var comparision = {
            'comparision': {
                'team1': {
                    'index': team1Index,
                    'tax': team1tax
                },
                'team2': {
                    'index': team2Index,
                    'tax': team2tax
                }
            }
        }
        
        return res.status(200).json(comparision);
    }

    public CalculateTax(teamIndex: any, contractAmount: number, contractLength: number, escrow: number, discountRate: number) {
        var tax = new Tax();

        if (!escrow) {
          escrow = 0;
        }
    
        tax.escrow = contractAmount * escrow

        var adjContractAmount = contractAmount * (1 - escrow)
        var socialSecurity = 7347
        var deductions = adjContractAmount * teamIndex.Deductions

        if(teamIndex.Country == "CA") {
            socialSecurity = 0
        } else if (teamIndex.Country == "US") {
            deductions = 12000
        }

        var federalTax = adjContractAmount * teamIndex.FederalTax - socialSecurity
        var taxableincome = adjContractAmount - deductions
        var stateTax = adjContractAmount * teamIndex.StateTax
        var cityTax = adjContractAmount * teamIndex.CityTax
        var medicare = adjContractAmount * teamIndex.FicaTax
        var totalTax = federalTax + stateTax + cityTax + medicare + socialSecurity
        var netIncome = adjContractAmount * teamIndex.NetIncome
        var netaav = netIncome  / contractLength
        var aav = adjContractAmount/ contractLength
        var taxRate = 1 - netIncome/adjContractAmount
    
        tax.team = teamIndex.Team
        tax.income = adjContractAmount
        tax.taxableincome = taxableincome
        tax.deductions = deductions
        tax.federalTax = federalTax
        tax.stateTax = stateTax
        tax.cityTax = cityTax
        tax.totalTax = totalTax
        tax.netIncome = netIncome
        tax.aav = aav
        tax.netaav = netaav
        tax.socialSecurity = socialSecurity
        tax.medicare = medicare
        tax.taxRate = taxRate
        tax.years = contractLength

        return tax
    }

    public async downloadExampleIndex(res: Response) {
        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('ExampleIndex');
        const tempFilePath = Tempfile('.xlsx');
        const exampleIndex = {
            Team: 'Boston Celtics',
            League: 'NBA',
            Country: 'US',
            IncomeFrom: 0,
            IncomeTo: 0,
            NetIncome: 0,
            Deductions: 0,
            FederalTax: 0,
            MedicareTax: 0,
            StateTax: 0,
            CityTax: 0,
            Credits: 0,
            ForeignTax: 0,
            ForeignTaxCredit: 0
        };

        sheet.addRow(Object.keys(exampleIndex));
        sheet.addRow(Object.keys(exampleIndex).map(key => exampleIndex[key]));

        try {
            await workbook.xlsx.writeFile(tempFilePath)
            res.download(tempFilePath)
        } catch (err) {
            console.log('error downloading file: ', err);
            return res.status(422).json({errors: err})
        }
    }
}
