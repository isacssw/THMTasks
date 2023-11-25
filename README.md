# THMTasks

steps to run application locally

# BACKEND

API Documentation (swagger) available at http://localhost:<PORT>/docs if you are running locally

- create a mongo instance locally or using https://www.mongodb.com/ (cloud)
- create .env file and add mongodb url as following
- add a PORT to your .env file

### ENV SERVER SAMPLE 

`MONGODB_URL=http://localhost:5555`

`PORT=3333`

- run command `npm install` to start server
- run command `npm run dev` to start server

### BACKEND E2E TESTS

- run command `npm run test` to start server


-----------


# FRONTEND

- take the server url that you are running your server.  e.g. : http://localhost:3333
- create .env file and add VITE_API url as following

### ENV CLIENT SAMPLE 

`VITE_API=http://localhost:3333`

- run command `npm install` to start server
- run command `npm run dev` to start server