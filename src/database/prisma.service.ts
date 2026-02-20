import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, type ConfigType } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { databaseConfig } from 'src/config/database.config';
import { EnvConfig } from 'src/config/env.validation';
import { PrismaClient } from 'src/database/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {
    const adapter = new PrismaPg({
      connectionString: configService.get('DATABASE_URL', { infer: true })
    });
    super({ adapter });
  }
}

// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor(configService: ConfigService<EnvConfig, true>) {
//     // const a = configService.get('DATABASE_URL', { infer: true });
//     // console.log(process.env.DATABASE_URL);
//     const adapter = new PrismaPg({
//       connectionString: configService.get('DATABASE_URL', { infer: true })
//       // 'postgresql://postgres:123456@localhost:5432/dnc01_nestjs_learning'
//     });
//     // new PrismaClient({ adapter })
//     super({ adapter });
//   }

//   // constructor(configService: ConfigService) {
//   //   console.log(configService.get('database.url'));
//   //   const adapter = new PrismaPg({
//   //     connectionString: configService.get('database.url')
//   //   });
//   //   super({ adapter });
//   // }

//   // constructor(
//   //   @Inject(databaseConfig.KEY) dbConfig: ConfigType<typeof databaseConfig>
//   // ) {
//   //   const adapter = new PrismaPg({
//   //     connectionString: dbConfig.url
//   //   });
//   //   super({ adapter });
//   // }
// }

// // class A {
// //   private readonly configService: ConfigService;

// //   constructor(configService: ConfigService) {
// //     this.configService = configService;
// //   }
// // }

// // class A {
// //   constructor(private readonly configService: ConfigService) {}

// //   hash() {
// //     this.configService
// //   }
// // }
