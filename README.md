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
Run server
```
npm run start or npm run dev
```
If all works fine,
```
listening on 3000...
Database is connnedted
```
Please enjoy