import { Request, Response } from 'express';
import { BaseController } from './base-controller';

export class HealthController extends BaseController {

    constructor() {
        super();
    }

    public async healthCheck(req: Request, res: Response) {
        return { status: 'healthy' }
    }
}
