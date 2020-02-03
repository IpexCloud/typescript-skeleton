# typescript-skeleton

TODO:

- [x] typescript compiler
- [x] Swagger, class-validator
- [x] authorization
- [x] typeORM
- [x] REST interface
- [ ] GraphQL interface
- [ ] logger
- [ ] mocha 

## [TypeORM](https://typeorm.io/#/connection)

### Migrations

## [Create new migration](https://typeorm.io/#/migrations/creating-a-new-migration)

1. create ormconfig.json file with credentials to database
2. 
```sh
npx typeorm migration:create -n {name-for-migration}
```
3. add your SQL commands to up and down functions (e.g. https://typeorm.io/#/migrations/creating-a-new-migration)

## [Run and revert migrations](https://typeorm.io/#/migrations/running-and-reverting-migrations)
1. 
```sh
npm i typeorm ts-node
```
2. add this script to package.json
```javascript
"scripts": {
    "typeorm": "ts-node -r ./tsconfig.release.json ./node_modules/typeorm/cli.js"  
  }
```
3. Run migrations
```sh
npm run typeorm migration:run
```


or revert
```sh
npm run typeorm migration:revert
```


