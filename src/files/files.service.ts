import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from "uuid";


@Injectable()
export class FilesService {
    async createFile(file, expansionFile: string, nameFolder: string): Promise<string>{
        try{
            const fileName = uuid.v4() + expansionFile;
            const filePath = path.resolve(__dirname, '..', '..', 'static', nameFolder);
            console.log('file ', path.join(filePath, fileName))
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            console.log('file buffer', file.buffer)
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch(e){
            console.log(e);
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCloneFile(file, expansionFile: string, nameFolder: string): Promise<string>{
        try{
            const fileName = uuid.v4() + expansionFile;
            const filePath = path.resolve(__dirname,'..', '..', 'static', nameFolder);
            console.log('file ', path.join(filePath, fileName))
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file);
            return fileName;
        } catch(e){
            console.log(e);
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createImageFile(file: any): Promise<string>{
        return await this.createFile(file, 
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length), 
            'picture');
    }

    async createProjectFile(file: any): Promise<string>{
        return await this.createFile(file, 
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length), 
            'projects');
    }

    async createCompanyFiles(filesObj, company_name: string): Promise<string[]>{
        let links = [];
        let files = [filesObj.letter[0], filesObj.inn[0]];
        for(let i = 0; i < files.length; i++){
            console.log('file i ', files[i]);
            let link = await this.createFile(files[i],
                files[i].originalname.slice(files[i].originalname.lastIndexOf('.'), files[i].originalname.length), 
                company_name);
                links.push(link);
        }
        return links;
    }

    async cloneFile(fileName: string, nameFolder: string){
        const filePath = path.resolve(__dirname, '..', '..', 'static', nameFolder);
        const project = fs.readFileSync(path.join(filePath, fileName));
        return await this.createCloneFile(project,
            fileName.slice(fileName.lastIndexOf('.'), fileName.length), 
            nameFolder);
    }
}
