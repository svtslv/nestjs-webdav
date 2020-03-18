# NestJS WebDAV

<a href="https://www.npmjs.com/package/nestjs-webdav"><img src="https://img.shields.io/npm/v/nestjs-webdav.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nestjs-webdav"><img src="https://img.shields.io/npm/l/nestjs-webdav.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
Integrates WebDAV with Nest

## Installation

```bash
npm install nestjs-webdav webdav
```

You can also use the interactive CLI

```sh
npx nestjs-modules
```

## Examples

### WebDAV-CLI
```bash
npx webdav-cli --username=username --password=password
```

### NextCloud

```bash
docker run \
-e SQLITE_DATABASE=nextcloud \
-e NEXTCLOUD_ADMIN_USER=admin \
-e NEXTCLOUD_ADMIN_PASSWORD=password \
-p 8080:80 \
nextcloud
```

### WebDAVModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { WebDAVModule } from 'nestjs-webdav';
import { AppController } from './app.controller';

@Module({
  imports: [
    WebDAVModule.forRoot({
      config: {
        endpoint: 'http://127.0.0.1:1900',
        username: 'username',
        password: 'password',
      },
    }),
    WebDAVModule.forRoot({
      config: {
        endpoint: 'http://localhost:8080/remote.php/dav/files/admin/',
        username: 'admin',
        password: 'password',
      },
    }, 'nextCloud'),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### WebDAVModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { WebDAVModule } from 'nestjs-webdav';
import { AppController } from './app.controller';

@Module({
  imports: [
    WebDAVModule.forRootAsync({
      useFactory: () => ({
        config: {
          endpoint: 'http://127.0.0.1:1900',
          username: 'username',
          password: 'password',
        },
      }),
    }),
    WebDAVModule.forRootAsync({
      useFactory: () => ({
        config: {
          endpoint: 'http://localhost:8080/remote.php/dav/files/admin/',
          username: 'admin',
          password: 'password',
        },
      }),
    }, 'nextCloud'),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectWebDAV(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectWebDAV, WebDAV } from 'nestjs-webdav';

@Controller()
export class AppController {
  constructor(
    @InjectWebDAV() private readonly webDAV: WebDAV,
    @InjectWebDAV('nextCloud') private readonly nextCloud: WebDAV,
  ) {}

  @Get()
  async getHello() {
    return {
      webdavCli: await this.webDAV.getDirectoryContents('/'),
      nextCloud: await this.nextCloud.getDirectoryContents('/'),
    }
  }
}
```

## License

MIT
