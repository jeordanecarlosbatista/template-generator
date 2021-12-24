import copy from "recursive-copy";
import { CopyFile } from "./copy-files";

export class RecursiveCopyAdapter implements CopyFile {
    async copy(source: string, dest: string): Promise<boolean> {
        const result = await copy(source, dest);
        if (result === null || result === undefined) {
            return false;
        }
        return true
    }

}