import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccountsService } from 'src/accounts/accounts.service';
import { UpdateAccountNotifications } from 'src/accounts/dto/update-account.dto';
import { FilesService } from 'src/files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAvatarInfo, UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private filesService: FilesService,
        private accountsService: AccountsService
    ){}

    async createUser(dto : CreateUserDto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAll(){
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserById(id: number){
        const user = await this.userRepository.findOne({where: {id: id}});
        return user;
    }

    async uploadAvatar(file: any, userInfo: UpdateAvatarInfo){
        const fileName = await this.filesService.createFile(file, 
                                                            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length), 
                                                            String(userInfo.user_id), 
                                                            ["users"]
        );

        let user = await this.userRepository.findOne({where: {id: userInfo.user_id}});
        user.profile_picture = fileName;
        return await this.userRepository.update(user, {where: {id: userInfo.user_id}});
    }

    async updateUser(dto: UpdateUserDto){
        let user = await this.userRepository.findOne({where: {id: dto.id}});
        if(user === null) throw new HttpException("Пользователь не найден",HttpStatus.NOT_FOUND);

        user.surname = dto.surname ?? user.surname;
        user.name = dto.name ?? user.name;
        user.patronymic = dto.patronomyc ?? user.patronymic;
        user.city_id = dto.city_id ?? user.city_id;
        user.about = dto.about ?? user.about;
        user.login = dto.login ?? user.login;

        if(dto.phone_number != undefined){
            user.phone_number = dto.phone_number;
            user.is_checked_phone = false;
            //TODO вызов метода подтверждения phone
        }

        const updateAccount: UpdateAccountNotifications = {
            id: dto.id,
            is_spam: dto.is_spam,
            on_notifications: dto.on_notifications
        };

        const account = await this.accountsService.updateNotifications(updateAccount);

        return await this.userRepository.update(user, {where: {id: user.id}});
    }
}
