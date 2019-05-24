import { Response } from 'express';
import { LeagueRepository } from "../repositories/league.repository";

export class LeagueService {

    private leagueRepository: LeagueRepository;

    constructor() {
        this.leagueRepository = new LeagueRepository();
    }

    public async createLeague(res: Response, name: string, active: boolean) {
        let leagueExists = await this.leagueRepository.getLeagueByName(name);

        if (leagueExists) {
            return  res.status(422).json({'errors': [{'msg': 'The league name already exists.'}]})
        }

        await this.leagueRepository.createLeague(name, active);

        return res.status(200).json({'msg': 'League has been added successfully.'})
    }

    public async getLeagues(res: Response) {
        const leagues = await this.leagueRepository.getLeagues();

        return res.status(200).json(leagues);
    }

    public async getLeague(res: Response, id: number) {
        const league = await this.leagueRepository.getLeagueById(id);

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        return res.status(200).json(league);
    }

    public async updateLeague(res: Response, id: number, name: string, active: boolean) {
        const leagueExists = await this.leagueRepository.getLeagueById(id)
        const league = await this.leagueRepository.getLeagueByName(name);

        if (!leagueExists) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]})
        }

        if(league && league.Id != leagueExists.Id) {
            return  res.status(422).json({'errors': [{'msg': 'The league name already exists.'}]})
        }

        leagueExists.Name = name;
        leagueExists.Active = active;
        await this.leagueRepository.updateLeague(id, leagueExists);

        return res.status(200).json({'msg': 'Updated successfully.'})
    }

    public async deleteLeague(res: Response, id: number) {
        const leagueExists = await this.leagueRepository.getLeagueById(id);

        if (!leagueExists) {
            return res.status(422).json({'errors': [{'msg': 'League does not exist.'}]});
        }

        await this.leagueRepository.deleteLeague(id);

        return res.status(200).json({'msg': 'Removed successfully'});
    }
}
