# CityHub Server
This is a server for CityHub Social Screen app. It uses Typescript, Koa, routing-controllers and TypeORM. The backend exposes a REST API but also sends messages over websockets using SocketIO.

# Running
* You need a working Postgres database that is preferrably empty (drop all the tables) and running 
* Install the dependencies using `yarn install`
* Compile the app (Typescript > Javascript) using `yarn compile` (during development you can use `yarn watch`)
* `yarn start`
