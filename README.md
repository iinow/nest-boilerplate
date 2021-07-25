# Nest BoilerPlate

![Node.js CI](https://github.com/iinow/nest-boilerplate/workflows/Node.js%20CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/iinow/nest-boilerplate/branch/master/graph/badge.svg?token=HD10C7A8OO)](https://codecov.io/gh/iinow/nest-boilerplate)

* vscode 

## Stack

1. Swagger
2. Encrypt Properties
3. Handlebar
4. TypeORM(postgre)
5. Exception Filter(Global Exception Handler)
6. codecov
7. influx, Chronograph
8. Redis

## Getting Started

```shell
#start
npm run build

npx pm2 start ecosystem.config.js --env [local|dev|prod]

#Scale up (increase to 2 instance)
npx pm2 scale nestjs-boilerplate 2

#stop
npx pm2 stop nestjs-boilerplate

#delete
npx pm2 delete nestjs-boilerplate
```