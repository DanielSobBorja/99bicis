# 99bicis

A Node.js server built with Express that serves as a bike aggregator.

## Project features

CRUD operations for bike, store and inventory entities
Renting of bikes from stores

### DIW features

| **Feature**     | **Files:lines**                                                       | **Preview Image**                                                                          |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Arrow functions | /tests: everywhere</br> /controllers: everywhere /db/mongo-cfg: 13,27 | ![Arrow function. Could not load image](/img/arrow-function.png?raw=true 'Arrow function') |
| Async functions | - /tests: everywhere - /controllers: everywhere - /db: everywhere     | ![Async function. Could not load image](/img/async-function.png?raw=true 'Async function') |
| Module pattern  | /controllers: everywhere                                              | ![Module pattern. Could not load image](/img/module-pattern.png?raw=true 'Module Pattern') |
| Env. variables  | - /db/mongo-cfg:everywhere                                            | ![Env. Variables. Could not load image](/img/env-variables.png?raw=true 'Env. Variables')  |
| Environments    | - /db/mongo-cfg:3-9 - /package.json:7-13                              | ![Environments. Could not load image](/img/environments.png?raw=true 'Environments')       |
| Destructuring   | /tests/bike-crud:3</br> /controllers/bike:16,36...                    | ![Destructuring. Could not load image](/img/destructuring.png?raw=true 'Destructuring')    |
| Spreading       | /controllers/inventory:90, 114                                        | ![Spreading. Could not load image](/img/spreading.png?raw=true 'Spreading')                |

#### Testing

Added tests for all success situations. Notable code coverage.
![Testing. Could not load image](/img/code-coverage.PNG?raw=true 'Code coverage')

## Setup

1. Clone the repo: `git clone https://github.com/DanielSobrino/99bicis.git`
2. Install the dependencies: `npm install`
3. Setup your mongoDB user and password environment variables
4. Change the URIs in mongo-cfg to use your cluster and database
5. Run the app in development mode: `npm run devstart`

## Scripts

-   `npm start`: Starts the app in production mode

-   `npm run devstart`: Starts the app in development mode with nodemon

-   `npm run serverstart`: Sets the environment to development and runs devstart

-   `npm run migrate`: Runs the migration script to create the initial database schema

-   `npm run pretest`: Sets the environment to test and runs migrate before running the tests

-   `npm run test`: Runs all tests in the project

-   `npm run pulltest`: Runs the tests in the branch and all others that were not in the last commit

## ER Model

![ER Model. Could not load image](ERdiagram.png?raw=true 'ER Model')

## Endpoints

I have setup three different routers: bike, inventory and store, each with their own endpoints.

### GET

#### Get by id

`/bike/:id`
`/store/:id`

#### List all

`/bike/`
`/store/`

#### List all bikes in a store

`/inventory/store/:id`

#### List all stores containing a bike

`/inventory/bike/:id`

### POST

#### Create

`/bike/create`
`/store/create`
`/inventory/create`

### PUT

#### Update by id

`/bike/:id`
`/store/:id`
`/inventory/:id`

#### Rent and return a bike

`/inventory/:id/rent`
`/inventory/:id/return`

### DELETE

#### Delete by id

`/bike/:id`
`/store/:id`
`/inventory/:id`

## Libraries

-   Express: Web framework for Node.js
-   Mongoose: MongoDB object modeling tool
-   Morgan: Middleware for logging HTTP requests
-   Jest: JavaScript Testing Framework

## License

This project is licensed under the MIT License. See LICENSE for details.

## Might do list

-   Repository/Service layers => decoupling
-   Middleware
-   Logging (morgan)
