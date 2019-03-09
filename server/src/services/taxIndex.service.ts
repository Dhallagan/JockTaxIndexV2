import { Response } from 'express';
import { TaxIndexRepository } from "../repositories/taxIndex.repository";
import { LeagueRepository } from './../repositories/league.repository';
import readXlsxFile from 'read-excel-file/node'

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
        console.log(taxIndex);

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
        const leagueExists = await this.leagueRepository.getLeagueById(leagueId);
        const leagues = await this.leagueRepository.getLeagues();

        if (!leagueExists) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]});
        }

        const schema = {
            'Team': {
                prop: 'Team',
                type: String
            },
            'League': {
                prop: 'League',
                parse(value) {
                    const league = leagues.find(leg => leg.Name === value);

                    if (!league) {
                        return -1;
                    }

                    return league.Id;
                }
            },
            'Country': {
                prop: 'Country',
                type: String
            },
            'From': {
                prop: 'IncomeFrom',
                type: Number
            },
            'To': {
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
            if (data.rows[i].League === -1) {
                data.rows.splice(i, 1);
                i--;
            }
        }

        await this.taxIndexRepository.clearTaxIndexes();
        await this.taxIndexRepository.createTaxIndex(data.rows);

        return res.status(200).json({'msg': 'Tax Data has been imported successfully.'});
    }
}
