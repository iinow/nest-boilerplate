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
pm2 start ecosystem.config.js --env [local|dev|prod]

#Scale up (instance 2)
pm2 scale nestjs-boilerplate 2

#stop
pm2 stop nestjs-boilerplate

#delete
pm2 delete nestjs-boilerplate
```