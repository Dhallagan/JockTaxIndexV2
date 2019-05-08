import { Request, Response } from 'express';
import { BaseController } from './base-controller';
import { UserService } from '../services/user.service'
import { check, validationResult } from 'express-validator/check';
import multer from 'multer';
import { Uploader } from '../core/uploader';

//app.post('/upload', uploader.startUpload);

export class UserController extends BaseController {

    private userService: UserService;

    constructor() {
        super();
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response) {
        const viewModel = req.body;
        console.log('hit')
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.createUser(res, viewModel.firstName, viewModel.lastName, viewModel.email, viewModel.password)
    }

    public async verifyRegistration(req: Request, res: Response) {
        const viewModel = req.body;

        res.status(201).json(
            await this.userService.verifyEmail(res, viewModel.token)
        );
    }

    public async updatePassword(req: Request, res: Response) {
        const viewModel = req.body;
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        await this.userService.updatePassword(res, viewModel.id, viewModel.password, viewModel.confirmPassword)
    }

   public async login(req: Request, res: Response) {
        const viewModel = req.body;

        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.login(res, viewModel.email, viewModel.password)

   }

   public async recoverPassword(req: Request, res: Response) {
        const viewModel = req.body;

        return await this.userService.recoverPassword(res, viewModel.email)
        
    }

    public async resetPassword(req: Request, res: Response) {
        const viewModel = req.body;
        console.log(viewModel)

        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.resetPassword(res, req.params.token, viewModel.password)
        
    }

    public async getUsers(req: Request, res: Response) {
        const viewModel = req.body;
        console.log(viewModel)

        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.getUsers(res)
        
    }

    public async getUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.getUser(res, req.params.id)
    }

    public async getUserByToken(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.getUser(res, req['user'])
    }

    public async updateUser(req: Request, res: Response) {
        const viewModel = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.updateUser(res, req.params.id, viewModel.firstName, viewModel.lastName, viewModel.phoneNumber, viewModel.role, viewModel.active)
    }

    public async deleteUser(req: Request, res: Response) {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.deleteUser(res, req.params.id);
    }

    public async updateAvatar(req: Request, res: Response) {
        const viewModel = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.updateAvatar(res, req.params.id, viewModel.avatar)
    }

    public async invite(req: Request, res: Response) {
        const viewModel = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        return await this.userService.createInviteUser(res, viewModel.firstName, viewModel.lastName, viewModel.email, viewModel.role, req['user']);
    }
}
