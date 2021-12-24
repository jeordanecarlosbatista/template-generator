import path from "path";
import fs from "fs";
import copy from "recursive-copy";
import rimraf from "rimraf";
import { RecursiveCopyAdapter } from "../src/recursive-copy-adapter";
import { createTemplate, createTemplateError, typeTemplate } from "../src/create-template";

const sut = (): { copyAdapter: RecursiveCopyAdapter } => ({
    copyAdapter: new RecursiveCopyAdapter()
})

describe('RecursiveCopyAdapter', () => {
    const dest = 'clean-arch';

    afterEach(() => {
        rimraf.sync(path.resolve() + '/' + dest)
    });

    test('should return folder copy on dest', async () => {
        const { copyAdapter } = sut();
        const source = path.resolve('src', 'templates', 'clean-architecture-ts-api');
        await copyAdapter.copy(source, dest);
        const exist = fs.existsSync(dest);

        expect(exist).toBe(true)
    });

    test('should return throw if folder already exist', async () => {
        const { copyAdapter } = sut();
        const source = path.resolve('src', 'templates', 'clean-architecture-ts-api');
        await copyAdapter.copy(source, dest);

        await expect(copy(source, dest)).rejects.toThrow();
    });
})

describe('createTemplate', () => {
    const dest = 'clean-arch';

    afterEach(() => {
        rimraf.sync(path.resolve() + '/' + dest)
    });

    test('should create template clean arch on successfully', async () => {
        const { copyAdapter } = sut();
        const created = await createTemplate({ name: dest, template: typeTemplate.CLEAN_ARCH }, copyAdapter)

        expect(created).toBe(true)
    });

    test('should return PROJECT_ALREADY_EXIST if the project already created', async () => {
        const { copyAdapter } = sut();
        await createTemplate({ name: dest, template: typeTemplate.CLEAN_ARCH }, copyAdapter)
        const createdTwo = await createTemplate({ name: dest, template: typeTemplate.CLEAN_ARCH }, copyAdapter)

        expect(createdTwo).toBe(createTemplateError.PROJECT_ALREADY_EXIST)
    });
});