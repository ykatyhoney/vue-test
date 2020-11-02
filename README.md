# vue-test
## Install
### Install mongodb
[https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
Please confirm if mongodb runs on 27017

### Install client

Go to client folder 
```
cd ./client 
npm install
```
Build Client
```
npm run build
```
If all works fine,
```
  Build complete. The ../server/public directory is ready to be deployed.
```

### Install Server
Go to server folder 
```
cd ./server 
npm install
```
Copy .env.example file to .env
```
cp .env.example .env
```
On `.env` file, set `MONGODB_URL`, `MIGRATE_dbConnectionUri`, `JWT_STRATEGY_SECRET`.
Run server
```
npm run start or npm run dev
```
If all works fine,
```
listening on 3000...
Database is connnedted
```

### Migrate test users data to database (MongoDB)
Go to server folder

To Migrate to database, run
```
npm run migrate add_users
```
To remove test user data, run
```
npm run migrate-down add_users
```
Here, `add_users` is migration schema.

Test user data:
`server/migrations/users.json`
  - Memeber
    email: user3@test.com, password: password
  - Auditor
    email: user4@test.com, password: password

Please enjoy