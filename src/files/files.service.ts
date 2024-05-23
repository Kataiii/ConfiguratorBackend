import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from "uuid";


@Injectable()
export class FilesService {
    constructor() { }

    async createFile(file, expansionFile: string, nameFolder: string, pathForFolder?: string[]): Promise<string> {
        try {
            const fileName = uuid.v4() + expansionFile;
            let filePath = "";
            if (pathForFolder == undefined) {
                filePath = path.resolve(__dirname, '..', '..', 'static', nameFolder);
            }
            else {
                filePath = path.resolve(__dirname, '..', '..', 'static', ...pathForFolder, nameFolder);
            }

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            console.log(e);
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCloneFile(file, expansionFile: string, nameFolder: string): Promise<string> {
        try {
            const fileName = uuid.v4() + expansionFile;
            const filePath = path.resolve(__dirname, '..', '..', 'static', nameFolder);
            console.log('file ', path.join(filePath, fileName))
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), file);
            return fileName;
        } catch (e) {
            console.log(e);
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createImageFile(file: any, nameFolder: string, pathForFolder?: string[]): Promise<string> {
        return await this.createFile(
            file,
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length),
            nameFolder,
            pathForFolder
        );
    }

    async createProjectFile(file: any, nameFolder: string, pathForFolder?: string[]): Promise<string> {
        return await this.createFile(
            file,
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length),
            nameFolder,
            pathForFolder
        );
    }

    async createCompanyFiles(filesObj, company_name: string): Promise<string[]> {
        let links = [];
        let files = [filesObj.letter[0], filesObj.inn[0]];
        for (let i = 0; i < files.length; i++) {
            let link = await this.createFile(files[i],
                files[i].originalname.slice(files[i].originalname.lastIndexOf('.'), files[i].originalname.length),
                company_name);
            links.push(link);
        }
        return links;
    }

    async cloneFile(fileName: string, nameFolder: string, newFolderName?: string) {
        const filePath = path.resolve(
            __dirname,
            "..",
            "..",
            "static",
            `${nameFolder}/${fileName}`);
        const project = fs.readFileSync(filePath);
        return await this.createCloneFile(project,
            fileName.slice(fileName.lastIndexOf('.'), fileName.length),
            newFolderName ?? nameFolder
        );
    }

    public async createProjectFiles(idUser: number | string, idProject: number | string, typeRole: string, preview: File, saveFile: File) {
        const namePreview: string = await this.createImageFile(preview, String(idProject), [typeRole, String(idUser), "projects"]);
        const nameSave: string = await this.createProjectFile(saveFile, String(idProject), [typeRole, String(idUser), "projects"]);
        return [namePreview, nameSave];
    }

    public deleteFile(fileName: string, pathForFolder: string[]) {
        fs.unlinkSync(path.resolve(__dirname, "..", "..", "static", ...pathForFolder, fileName));
    }
}
