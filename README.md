# typescript-skeleton

## Packages
- [routing-controllers](https://github.com/typestack/routing-controllers)
- [type-graphql](https://typegraphql.com/)
- [class-validator](https://github.com/typestack/class-validator#validation-decorators)
- [typeorm - connection](https://typeorm.io/#/connection)
- [typeorm - entities](https://typeorm.io/#/entities)
- [typeorm - data-mapper vs active-record](https://typeorm.io/#/active-record-data-mapper)
- [winston](https://www.npmjs.com/package/winston)
- [jest](https://jestjs.io/)

TODO:

- [x] TypeScript compiler + ESLint
- [x] routing-controllers
- [x] Swagger route documentation, class-validator
- [x] authorization
- [x] TypeORM
- [x] REST interface
- [x] logger
- [x] request/response and error stdout logging
- [x] /alive and /health routes predefined
- [x] Jest framework for testing
- [x] GraphQL interface
- [x] GraphQL subscription
- [x] GraphQL error logs

## [TypeORM](https://typeorm.io/#/connection)

### Migrations

## [Create new migration](https://typeorm.io/#/migrations/creating-a-new-migration)

1. update ormconfig.json file with credentials to database
2. run command
```sh
npx typeorm migration:create -n {name-for-migration} --config "src/model/{databse-name}/ormconfig.js"
```
3. add your SQL commands to up and down functions (e.g. https://typeorm.io/#/migrations/creating-a-new-migration)

## [Run and revert migrations](https://typeorm.io/#/migrations/running-and-reverting-migrations)
1. add this script to package.json
```javascript
"scripts": {
    "typeorm": "ts-node -r ./tsconfig.release.json ./node_modules/typeorm/cli.js"  
  }
```
2. Run migrations or revert
```sh
npm run typeorm migration:run -- --config "src/model/{databse-name}/ormconfig.js"
```



```sh
npm run typeorm migration:revert
```

## [Test](https://jestjs.io/)
We are using [Jest](https://jestjs.io/) framework. Test files must contain "test" word e.g. "users.test.ts"

Run test with command:
```sh
npm run test
```

or automatically run test after file change
```sh
npm run test:watch
```

or use VSCODE debug configuration "Debug test"

