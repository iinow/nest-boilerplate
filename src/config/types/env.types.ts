import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator'

export enum Environment {
  MOCK = 'mock',
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
}

class ServerHttp {
  @IsNumber()
  @IsNotEmpty()
  port: number
}

class ServerSsl {
  @IsNotEmpty()
  @IsString()
  privkeyPath: string

  @IsNotEmpty()
  @IsString()
  pubPath: string
}

export class Server {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  http: ServerHttp

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  https: ServerHttp

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  ssl: ServerSsl
}

class Jwt {
  @IsNotEmpty()
  @IsString()
  secret: string
  expiredSecond: number
}

export class Redis {
  @IsString()
  @IsNotEmpty()
  host: string

  @IsNumber()
  @IsNotEmpty()
  port: number
}

export class RelationDB {
  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  host: string

  @IsNumber()
  @IsNotEmpty()
  port: number

  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  database?: string

  @IsBoolean()
  autoLoadEntities = false

  @IsBoolean()
  synchronize = false

  @IsString()
  schema?: string

  @IsBoolean()
  logging?: boolean

  @IsBoolean()
  dropSchema?: boolean
}

class DiscordWebhook {
  @IsString()
  id: string

  @IsString()
  token: string
}

export class Discord {
  @IsNotEmpty()
  @IsString()
  token: string

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  webhook: DiscordWebhook
}

export class Influx {
  @IsString()
  host: string

  @IsNumber()
  port: number

  @IsString()
  database: string

  @IsBoolean()
  enable: boolean
}

export class EnvironmentVariables {
  // @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  server: Server

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  jwt: Jwt

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  redis: Redis

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  rdb: RelationDB

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  discord: Discord

  @IsObject()
  @ValidateNested()
  influx: Influx
}
