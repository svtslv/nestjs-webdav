import { DynamicModule, Module } from '@nestjs/common';
import { WebDAVCoreModule } from './webdav.core-module';
import { WebDAVModuleAsyncOptions, WebDAVModuleOptions } from './webdav.interfaces';

@Module({})
export class WebDAVModule {
  public static forRoot(options: WebDAVModuleOptions, connection?: string): DynamicModule {
    return {
      module: WebDAVModule,
      imports: [WebDAVCoreModule.forRoot(options, connection)],
      exports: [WebDAVCoreModule],
    };
  }

  public static forRootAsync(options: WebDAVModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: WebDAVModule,
      imports: [WebDAVCoreModule.forRootAsync(options, connection)],
      exports: [WebDAVCoreModule],
    };
  }
}
