export interface CopyFile {
    copy(source: string, dest: string): Promise<boolean>;
}