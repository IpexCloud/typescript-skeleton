# Started for TypeScript backend project

## Packages

- [routing-controllers](https://github.com/typestack/routing-controllers)
- [type-graphql](https://typegraphql.com/)
- [class-validator](https://github.com/typestack/class-validator#validation-decorators)
- [typeorm](https://typeorm.io)
- [winston](https://www.npmjs.com/package/winston)
- [jest](https://jestjs.io/)

## [TypeORM](https://typeorm.io/#/connection)

### Migrations

#### [Create new migration](https://typeorm.io/#/migrations/creating-a-new-migration)

- update ormconfig.json file with credentials to database
- run command

```sh
npx typeorm migration:create -n {name-for-migration} --config "src/datasources/{database-name}/ormconfig.js"
```

- add your SQL commands to [up and down functions](https://typeorm.io/#/migrations/creating-a-new-migration)

#### [Run and revert migrations](https://typeorm.io/#/migrations/running-and-reverting-migrations)

- add this script to package.json

```javascript
"scripts": {
    "typeorm": "ts-node -r ./tsconfig.release.json ./node_modules/typeorm/cli.js"  
  }
```

- run migrations or revert

```sh
npm run typeorm migration:run -- --config "src/datasources/{databse-name}/ormconfig.js"
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
