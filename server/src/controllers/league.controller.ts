import { Request, Response } from 'express';
import { BaseController } from './base-controller';
import { LeagueService } from '../services/league.service';
import { validationResult } from 'express-validator/check';

export class LeagueController extends BaseController {

    private leagueService: LeagueService;

    constructor() {
        super();
        this.leagueService = new LeagueService();
    }

    public async createLeague(req: Request, res: Response) {
        const errors = validationResult(req);
        const viewModel = req.body;

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.leagueService.createLeague(res, viewModel.Name, viewModel.Active);
    }

    public async getLeagues(req: Request, res: Response){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.leagueService.getLeagues(res);
    }

    public async getLeague(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.leagueService.getLeague(res, req.params.id);
    }

    public async updateLeague(req: Request, res: Response) {
        const errors = validationResult(req);
        const viewModel = req.body;

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.leagueService.updateLeague(res, req.params.id, viewModel.Name, viewModel.Active);
    }
}
