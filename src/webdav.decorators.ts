import { Inject } from '@nestjs/common';
import { getWebDAVConnectionToken } from './webdav.utils'

export const InjectWebDAV = (connection?) => {
  return Inject(getWebDAVConnectionToken(connection));
};
