# THMTasks

#### README SUMMARY

    - setting up backend environment variables and mongo
    - setting up frontend environment variables
    - running server and client with 1 command
    - API docs (swagger)

### steps to run application locally

# SETTING UP BACKEND

- run command `npm install`

###  MONGODB

- create a mongo instance locally or using https://www.mongodb.com/ (cloud)
- add mongo instance URL on the .env file
- create .env file and add mongodb url as following
- add a PORT to your .env file

### ENV SERVER SAMPLE 

`MONGODB_URL=http://localhost:5555`

`PORT=3333`

### BACKEND E2E TESTS

- run command `npm run test` to run the E2E tests


-----------


# SETTING UP FRONTEND

- take the server url based on the port that you set in the backend .env,  e.g. : http://localhost:3333
- create .env file and add VITE_API url as following

- run command `npm install`

### ENV CLIENT SAMPLE 

`VITE_API=http://localhost:3333`

### FRONTEND UNIT TESTS

- run command `npm run test` to run the unit tests

-----------

# RUN BOTH CONCURRENTLY

- on the `THMTasks/` folder run:

- run command `npm install`
- run command `npm run dev` to start both (server and client) - monorepo

-----------

# TASKS API DOCUMENTATION

swagger available at http://localhost:<PORT>/docs if you are running locally

