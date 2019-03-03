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
        console.log(leagues);

        return res.status(200).json({leagues: leagues});
    }

    public async getLeague(res: Response, id: number) {
        const league = await this.leagueRepository.getLeagueById(id);
        console.log(league);

        return res.status(200).json({league: league});
    }

    public async updateLeague(res: Response, id: number, name: string, active: boolean) {
        const league = await this.leagueRepository.getLeagueById(id);
        console.log(league)

        if (!league) {
            return res.status(422).json({'errors': [{'msg': 'League Id is invalid.'}]})
        }

        if(league.Name == name) {
            return  res.status(422).json({'errors': [{'msg': 'The league name already exists.'}]})
        }

        league.Name = name;
        league.Active = active;
        await this.leagueRepository.updateLeague(id, league);

        return res.status(200).json({'msg': 'Updated successfully.'})
    }
}
