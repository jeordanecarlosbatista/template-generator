import path from "path";
import fs from 'fs';
import { CopyFile } from "./copy-files";

const cleanArchFileName = 'clean-architecture-ts-api';
const hexagonalArchFileName = 'hexagonal-ts-api';

export enum typeTemplate {
    CLEAN_ARCH,
    HEXA_ARCH
}

export enum createTemplateError {
    PROJECT_ALREADY_EXIST,
    UNKNOWN_ERROR
}

export const createTemplate = async (data: { name?: string, template?: typeTemplate }, copyFile: CopyFile): Promise<string | createTemplateError> => {
    const { name, template } = data;
    const { PROJECT_ALREADY_EXIST, UNKNOWN_ERROR } = createTemplateError;
    const templateName = template === typeTemplate.CLEAN_ARCH ? cleanArchFileName : hexagonalArchFileName;

    const { dest, source } = findPath(name, templateName);

    if (alreadyProjectCreated(dest)) {
        return PROJECT_ALREADY_EXIST;
    }

    const created = await copyFile.copy(source, dest);
    if (!created) {
        return UNKNOWN_ERROR;
    }

    return dest;
}

function alreadyProjectCreated(dest: string) {
    return fs.existsSync(dest);
}

function findPath(name: string | undefined, template: string) {
    const source = path.resolve('src', 'templates', template);

    const dest = name !== undefined ? name : template;
    return { dest, source };
}
