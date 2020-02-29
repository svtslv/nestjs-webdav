import { createClient } from 'webdav'
import { WebDAVModuleOptions, WebDAV } from "./webdav.interfaces";
import {
  WEBDAV_MODULE_CONNECTION,
  WEBDAV_MODULE_OPTIONS_TOKEN,
  WEBDAV_MODULE_CONNECTION_TOKEN
} from './webdav.constants';

export function getWebDAVOptionsToken(connection: string): string {
  return `${ connection || WEBDAV_MODULE_CONNECTION }_${ WEBDAV_MODULE_OPTIONS_TOKEN }`;
}

export function getWebDAVConnectionToken(connection: string): string {
  return `${ connection || WEBDAV_MODULE_CONNECTION }_${ WEBDAV_MODULE_CONNECTION_TOKEN }`;
}

export function createWebDAVConnection(options: WebDAVModuleOptions): WebDAV {
  const { config } = options;
  return createClient(config.endpoint, {
    username: config.username,
    password: config.password,
  })
}
