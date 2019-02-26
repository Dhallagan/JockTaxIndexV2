import { Response } from 'express';
import { Emailer } from '../email/emailer';
import { UserRepository } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { v4 as UUId } from 'uuid';
import { User } from "../entity/User";
import { Uploader } from '../core/uploader';
import { String } from 'aws-sdk/clients/cloudhsmv2';

export class UserService {

    private userRepository: UserRepository;

    constructor() {
        //super();
        this.userRepository = new UserRepository();
    }

    public generateToken(user) {
        var payload = {
            iss: "localhost",
            sub: user.Id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.sign(payload, 'secretsecretsecret');
    }

    public generateUserViewModel(user) {
        return {
            Id: user.Id,
            Avatar: user.Avatar,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            PhoneNumber: user.PhoneNumber,
            Role: user.Role,
            Active: user.Active,
            DateCreated: user.DateCreated,
            EmailVerified: user.EmailVerified
        };
    }

    public async createUser(res: Response, firstname: string, lastname: string, email: string, password: string) {
        firstname = firstname.toLowerCase();
        lastname = lastname.toLowerCase();
        email = email.toLowerCase();
      
        const userExists = await this.userRepository.getUserByEmail(email)
        
        if(userExists){
            return  res.status(422).json({'errors': [{'msg': 'Account with that email address already exists.'}]})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await this.userRepository.createUser(res, firstname, lastname, email, passwordHash, UUId());
        console.log(user)
        // Send email
        Emailer.welcomeEmail(user.Email, user.FirstName + " " + user.LastName, user.EmailVerifyToken);
    
        return res.status(200).json({'msg': 'Registration success! An email has been sent to '+ email + '.  Check your email to complete the registration process.'});
    }

    public async createUserNoVerification(res: Response, firstname: string, lastname: string, email: string, password: string) {

        email = email.toLowerCase();

        const userExists = await this.userRepository.getUserByEmail(email)

        if(userExists){
            return  res.status(422).json({'errors': [{'msg': 'Account with that email address already exists.'}]})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await this.userRepository.createUser(res, firstname, lastname, email, passwordHash, UUId());

        // Send email
        //Emailer.welcomeEmail(user.Email, user.FirstName + " " + user.LastName, user.EmailVerifyToken);
        console.log(user)
        return  res.status(200).json({'msg': 'Registration success! An email has been sent to '+ email + '.  Check your email to complete the registration process.', 'token': this.generateToken(user), 'user': user})
    }

    public async verifyEmail(res: Response, verifyEmailToken: string) {
      
        var verifiedUser = await this.userRepository.getUserByToken(verifyEmailToken)
        
        if(!verifiedUser){
            return res.status(422).json({'errors': [{'msg': 'Email verification token is invalid or expired.'}]})
        }

        verifiedUser.EmailVerified = true
        verifiedUser.EmailVerifyToken = ""

        await this.userRepository.saveUser(verifiedUser);

        // Send Registration complete email?
    
        return res.status(200).json({'msg': 'Your email has been successfully verified.'});
    }

    public async login(res: Response, email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email)
        
        if(!user){
            return  res.status(422).json({'errors': [{'msg': 'The email you’ve entered doesn’t match any account.'}]})
        }
        console.log('User logged in:', user)
        if(user.Active === false) {
            return  res.status(422).json({'errors': [{'msg': 'The account is not active. Contact your administrator.'}]})
        }

        var passwordMatch = await bcrypt.compare(password, user.PasswordHash)

        if(!passwordMatch){
            return  res.status(422).json({'errors': [{'msg': 'The password you’ve entered is incorrect.'}]})
        } else {
            return  res.status(200).json({token: this.generateToken(user), user: user})
        }
    }

    public async recoverPassword(res: Response, email: string) {
        email = email.toLowerCase();

        var userExists = await this.userRepository.getUserByEmail(email)

        if(!userExists){
            return  res.status(422).json({'errors': [{'msg': 'Account with the email address '+ email + ' email address does not exist.'}]})
        }

        userExists.PasswordResetToken = UUId()
        userExists.PasswordResetExpires = moment().add(1, 'days').toDate()

        const user = await this.userRepository.forgotPassword(userExists)

        Emailer.forgotPasswordRequestEmail(user.Email, user.PasswordResetToken)

        return res.status(200).json({'msg': 'An email has been sent to '+ email + ' with further instruction.'});
    }

    public async resetPassword(res: Response, token: string, password: string) {
        console.log(token, password)
        var user = await this.userRepository.getUserByTokenAndExpiration(token)
        if(!user) {
            return  res.status(422).json({'errors': [{'msg': 'Password reset token is invalid or expired.'}]})
        }

        // NEED TO CLEAR PasswordRestExpirs date as well 
        user.PasswordHash = await bcrypt.hash(password, 10);
        user.PasswordResetToken = "";

        await this.userRepository.saveUser(user);

        Emailer.passwordResetSuccessEmail(user.Email)

        return res.status(200).json({'msg': 'Your password has been saved successfully.'})
    }

    public async updatePassword(res: Response, userId: number, password: string, confirmPassword: string) {
        var user = await this.userRepository.getUserById(userId)
        if(!user) {
            return  res.status(422).json({'errors': [{'msg': 'User Id is invalid.'}]})
        }

        // NEED TO CLEAR PasswordRestExpirs date as well 
        user.PasswordHash = await bcrypt.hash(password, 10);

        await this.userRepository.saveUser(user);

        // Emailer.passwordResetSuccessEmail(user.Email)

        return res.status(200).json({'msg': 'Your password has been saved successfully.'})
    }

    public async getUsers(res: Response) {
        const users = await this.userRepository.getUsers()
        const usersViewModel = users.map(user => this.generateUserViewModel(user));
        return res.status(200).json(usersViewModel);
    }

    public async getUser(res: Response, userId: number) {
        var user = await this.userRepository.getUserById(userId);
        return res.status(200).json(this.generateUserViewModel(user));
    }

    public async updateUser(res: Response, id: number, firstName: string, lastName: string, phoneNumber: string, role: string, active: boolean) {
        
        var user = await this.userRepository.getUserById(id)
        if(!user) {
            return  res.status(422).json({'errors': [{'msg': 'User Id is invalid.'}]})
        }
        user.FirstName = firstName
        user.LastName = lastName
        user.PhoneNumber = phoneNumber
        user.Role = role
        user.Active = active
        
        await this.userRepository.updateUser(id, user);
        var updatedUser = await this.userRepository.getUserById(id)
        return res.status(200).json(this.generateUserViewModel(updatedUser));
    }

    public async updateAvatar(res: Response, id: number, avatar: string) {
        var user = await this.userRepository.getUserById(id)
        if(!user) {
            return  res.status(422).json({'errors': [{'msg': 'User Id is invalid.'}]})
        }
        user.Avatar = avatar

        var updatedUser = await this.userRepository.updateUser(id, user)
        return res.status(200).json(this.generateUserViewModel(updatedUser))
    }

    public async createInviteUser(res: Response, firstname: string, lastname: string, email: string, role: String, invitedBy: number) {
        firstname = firstname.toLowerCase();
        lastname = lastname.toLowerCase();
        email = email.toLowerCase();

        const userExists = await this.userRepository.getUserByEmail(email)

        if(userExists){
            return  res.status(422).json({'errors': [{'msg': 'Account with that email address already exists.'}]})
        }

        const userInviteSent = await this.userRepository.getUserById(invitedBy);
        if (userInviteSent) {
            const password = this.generateToken({length: 10, numbers: true});
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await this.userRepository.createUser(res, firstname, lastname, email, passwordHash, UUId(), role);
            console.log(user)

            Emailer.inviteEmail(email, user.FirstName + " " + user.LastName, userInviteSent.FirstName + " " + userInviteSent.LastName, user.EmailVerifyToken, password);

            return res.status(200).json({'msg': 'Invite sent!'});
        }

    } 
}