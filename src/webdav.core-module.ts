import { Global, Module, DynamicModule, Provider } from '@nestjs/common';
import { WebDAVModuleAsyncOptions, WebDAVModuleOptions, WebDAVModuleOptionsFactory } from './webdav.interfaces';
import { createWebDAVConnection, getWebDAVOptionsToken, getWebDAVConnectionToken } from './webdav.utils'

@Global()
@Module({})
export class WebDAVCoreModule {

  /* forRoot */
  static forRoot(options: WebDAVModuleOptions, connection?: string): DynamicModule {

    const webDAVOptionsProvider: Provider = {
      provide: getWebDAVOptionsToken(connection),
      useValue: options,
    };

    const webDAVConnectionProvider: Provider = {
      provide: getWebDAVConnectionToken(connection),
      useValue: createWebDAVConnection(options),
    };

    return {
      module: WebDAVCoreModule,
      providers: [
        webDAVOptionsProvider,
        webDAVConnectionProvider,
      ],
      exports: [
        webDAVOptionsProvider,
        webDAVConnectionProvider,
      ],
    };
  }

  /* forRootAsync */
  public static forRootAsync(options: WebDAVModuleAsyncOptions, connection: string): DynamicModule {

    const webDAVConnectionProvider: Provider = {
      provide: getWebDAVConnectionToken(connection),
      useFactory(options: WebDAVModuleOptions) {
        return createWebDAVConnection(options)
      },
      inject: [getWebDAVOptionsToken(connection)],
    };

    return {
      module: WebDAVCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), webDAVConnectionProvider],
      exports: [webDAVConnectionProvider],
    };
  }

  /* createAsyncProviders */
  public static createAsyncProviders(options: WebDAVModuleAsyncOptions, connection?: string): Provider[] {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [
        this.createAsyncOptionsProvider(options, connection)
      ];
    }

    return [ 
      this.createAsyncOptionsProvider(options, connection), 
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  /* createAsyncOptionsProvider */
  public static createAsyncOptionsProvider(options: WebDAVModuleAsyncOptions, connection?: string): Provider {

    if(!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getWebDAVOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getWebDAVOptionsToken(connection),
      async useFactory(optionsFactory: WebDAVModuleOptionsFactory): Promise<WebDAVModuleOptions> {
        return await optionsFactory.createWebDAVModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}