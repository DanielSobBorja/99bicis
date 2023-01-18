# 99bicis

A Node.js server built with Express that serves as a bike aggregator.

## Setup

1. Clone the repo: `git clone https://github.com/DanielSobrino/99bicis.git`
2. Install the dependencies: `npm install`
3. Change the URIs in mongo-cfg to use your cluster and database
4. Run the app in development mode: `npm run devstart`

## Scripts

-   `npm start`: Starts the app in production mode

-   `npm run devstart`: Starts the app in development mode with nodemon

-   `npm run serverstart`: Sets the environment to development and runs devstart

-   `npm run migrate`: Runs the migration script to create the initial database schema

-   `npm run pretest`: Sets the environment to test and runs migrate before running the tests

-   `npm run test`: Runs all tests in the project

-   `npm run pulltest`: Runs the tests in the branch and all others that were not in the last commit

## Features

CRUD operations for bike entities
CRUD operations for store entities
More to come...

## ER Model

![ER Model. Could not load image](ERdiagram.png?raw=true 'ER Model')

## Endpoints

coming soon...

## TODO list (priority ^)

-   Use cool JS
-   Repository/Service layers => decoupling
-   Update README
-   Middleware
-   Auth
-   Logging

## Libraries

-   Express: Web framework for Node.js
-   Mongoose: MongoDB object modeling tool
-   Morgan: Middleware for logging HTTP requests
-   Jest: JavaScript Testing Framework

## License

This project is licensed under the MIT License. See LICENSE for details.
