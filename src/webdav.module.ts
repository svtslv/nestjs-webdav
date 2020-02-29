import { Module, DynamicModule, Provider } from "@nestjs/common";
import { WebDAVModuleOptions, WebDAVModuleAsyncOptions } from './webdav.interfaces';
import { createWebDAVConnection, getWebDAVConnectionToken, getWebDAVOptionsToken } from './webdav.utils'

@Module({})
export class WebDAVModule {
  static forRoot(options: WebDAVModuleOptions, connection?: string): DynamicModule {

    const webDAVModuleOptions: Provider = {
      provide: getWebDAVOptionsToken(connection),
      useValue: options,
    };

    const webDAVConnectionProvider: Provider = {
      provide: getWebDAVConnectionToken(connection),
      useFactory: async () => await createWebDAVConnection(options)
    };

    return {
      module: WebDAVModule,
      providers: [
        webDAVModuleOptions,
        webDAVConnectionProvider,
      ],
      exports: [
        webDAVModuleOptions,
        webDAVConnectionProvider,
      ],
    };
  }

  static forRootAsync(options: WebDAVModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: WebDAVModule,
      imports: [WebDAVModule.forRootAsync(options, connection)],
    };
  }
}
