import { Response } from 'express';
import { TaxIndexRepository } from "../repositories/taxIndex.repository";
import { LeagueRepository } from './../repositories/league.repository';

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
        console.log()

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
}
