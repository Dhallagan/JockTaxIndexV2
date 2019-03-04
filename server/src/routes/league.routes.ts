import { BaseRoute } from './base-route';
import { LeagueController } from '../controllers/league.controller';
import { Validation } from '../util/validation';
import { Authentication } from '../core/middleware/authentication';

export class LeagueRoutes extends BaseRoute {
    leagueController: LeagueController;

    constructor() {
        super();
        this.leagueController = new LeagueController();

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/leagues', Authentication.isAuthenticated, (req, res, next) => this.leagueController.getLeagues(req, res).catch(next));
        this.router.post('/leagues/new', Authentication.isAuthenticated, (req, res, next) => this.leagueController.createLeague(req, res).catch(next));
        this.router.get('/leagues/:leagueId', Authentication.isAuthenticated, (req, res, next) => this.leagueController.getLeague(req, res).catch(next));
        this.router.post('/leagues/:leagueId', Authentication.isAuthenticated, (req, res, next) => this.leagueController.updateLeague(req, res).catch(next));
    }
}
