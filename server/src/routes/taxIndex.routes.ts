import { BaseRoute } from './base-route';
import { TaxIndexController } from '../controllers/taxIndex.controller';
import { Validation } from '../util/validation';
import { Authentication } from '../core/middleware/authentication';

export class TaxIndexRoutes extends BaseRoute {
    taxIndexController: TaxIndexController;

    constructor() {
        super();
        this.taxIndexController = new TaxIndexController();

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/leagues/:leagueId/taxIndexes', Authentication.isAuthenticated, (req, res, next) => this.taxIndexController.getTaxIndexes(req, res).catch(next));
        this.router.post('/leagues/:leagueId/taxIndex', Authentication.isAuthenticated, (req, res, next) => this.taxIndexController.createTaxIndex(req, res).catch(next));
        this.router.get('/leagues/:leagueId/taxIndex/:taxIndexId', Authentication.isAuthenticated, (req, res, next) => this.taxIndexController.getTaxIndex(req, res).catch(next));
        this.router.put('/leagues/:leagueId/taxIndex/:taxIndexId', Authentication.isAuthenticated, (req, res, next) => this.taxIndexController.updateTaxIndex(req, res).catch(next));
        this.router.delete('/leagues/:leagueId/taxIndex/:taxIndexId', Authentication.isAuthenticated, (req, res, next) => this.taxIndexController.deleteTaxIndex(req, res).catch(next));
        this.router.post('/leagues/:leagueId/taxIndexes/import', (req, res, next) => this.taxIndexController.importTaxIndexes(req, res).catch(next));
    }
}
