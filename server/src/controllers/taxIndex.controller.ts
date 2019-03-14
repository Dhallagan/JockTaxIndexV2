import { Request, Response } from 'express';
import { BaseController } from './base-controller';
import { TaxIndexService } from '../services/taxIndex.service';
import { validationResult } from 'express-validator/check';
import { IncomingForm } from 'formidable';

export class TaxIndexController extends BaseController {

    private taxIndexService: TaxIndexService;

    constructor() {
        super();
        this.taxIndexService = new TaxIndexService();
    }

    public async createTaxIndex(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;
        const viewModel = req.body;

        return await this.taxIndexService.createTaxIndex(res, leagueId, viewModel);
    }

    public async getTaxIndexes(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;

        return await this.taxIndexService.getTaxIndexes(res, leagueId);
    }

    public async getTaxIndex(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;
        const taxIndexId = req.params.taxIndexId;

        return await this.taxIndexService.getTaxIndex(res, leagueId, taxIndexId);
    }

    public async updateTaxIndex(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;
        const taxIndexId = req.params.taxIndexId;
        const viewModel = req.body;

        return await this.taxIndexService.updateTaxIndex(res, leagueId, taxIndexId, viewModel);
    }

    public async deleteTaxIndex(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;
        const taxIndexId = req.params.taxIndexId;
        
        return await this.taxIndexService.deleteTaxIndex(res, leagueId, taxIndexId);
    }

    public async importTaxIndexes(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const leagueId = req.params.leagueId;
        const form = new IncomingForm();

        form.on('file', (field, file) => {
            return this.taxIndexService.importTaxIndexes(res, leagueId, file.path);
        });

        form.parse(req);
    }

    public async getCompareIndexes(req: Request, res: Response) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        console.log(req.query)

        const leagueId = req.params.leagueId;
        var team1 = req.query.team1
        var team2 = req.query.team2
        var contractAmount = req.query.contractAmount
        var contractLength = req.query.contractLength
        var escrow = req.query.escrow
        var discountRate = req.query.discountRate

        return await this.taxIndexService.CompareIndexes(res, leagueId, team1, team2, contractAmount, contractLength, escrow, discountRate)
    }

    public async downloadExampleIndex(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.taxIndexService.downloadExampleIndex(res);
    }
}
