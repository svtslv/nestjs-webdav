import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export interface WebDAVModuleOptions {
  config: {
    endpoint: string,
    username: string,
    password: string,
  };
}

export interface WebDAVModuleOptionsFactory {
  createWebDAVModuleOptions(): Promise<WebDAVModuleOptions> | WebDAVModuleOptions;
}

export interface WebDAVModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<WebDAVModuleOptionsFactory>;
  useExisting?: Type<WebDAVModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<WebDAVModuleOptions> | WebDAVModuleOptions;
}

export type WebDAV = {
  copyFile(from: string, to: string): Promise<any>;
  createDirectory(path: string): Promise<any>;
  deleteFile(path: string): Promise<any>;
  exists(path: string): Promise<any>;
  getDirectoryContents(path: string, options?: { deep?: boolean, glob?: string }): Promise<any>;
  getFileContents(path: string, options?: { format?: string }): Promise<any>;
  getFileDownloadLink(path: string): Promise<any>;
  getFileUploadLink(path: string): Promise<any>;
  getQuota(): Promise<any>;
  moveFile(from: string, to: string): Promise<any>;
  putFileContents(path: string, content: any, options?: {
    overwrite?: boolean,
    onUploadProgress?: (progress) => any
  }): Promise<any>;
  stat(path: string): Promise<any>;
  createReadStream(path: string): any;
  createWriteStream(path: string): any;
};
