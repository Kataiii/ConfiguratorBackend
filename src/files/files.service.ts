import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from "uuid";


@Injectable()
export class FilesService {
    async createFile(file, expansionFile: string, nameFolder: string): Promise<string>{
        try{
            const fileName = uuid.v4() + expansionFile;
            const filePath = path.resolve(__dirname, '..', 'static', nameFolder);
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch(e){
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createImageFile(file: any): Promise<string>{
        return await this.createFile(file, 
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length), 
            'picture');
    }

    async createProjectFile(file: any): Promise<string>{
        console.log("file", file.originalname);
        return await this.createFile(file, 
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length), 
            'projects');
    }
}
