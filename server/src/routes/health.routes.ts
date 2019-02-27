import { BaseRoute } from './base-route';
import multer from 'multer'
import { HealthController } from '../controllers/health.controller';

const upload =  multer({ dest: './src/uploads/' })

export class HealthRoutes extends BaseRoute {
    healthController: HealthController;


    constructor() {
        super();
        this.healthController = new HealthController();

        this.initRoutes();
    }


    initRoutes() {
        this.router.get('/health', (req, res, next) => this.healthController.healthCheck(req, res).catch(next));
    }
}
