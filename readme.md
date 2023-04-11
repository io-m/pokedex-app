# Project Name

This is the backend code for [Project Name]. It is a RESTful API that utilizes the Fastify Node.js framework, Docker for spinning up a Postgres DB, and the Pokemon API to fetch Pokemon data.

## Prerequisites

- Node.js installed on your machine
- Docker installed on your machine

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `docker-compose up -d` to spin up the Postgres DB in a Docker container.
4. Run `npm install` to install the project's dependencies.
5. Run `npm start` to start the server.

The server should now be up and running on `http://localhost:3000`. 

## API Endpoints

This project has the following API endpoints:

- `/api/pokemons` - Http method GET - Returns a list of all Pokemon.
- `/api/pokemons/:id` - Http method GET - Returns the Pokemon with the specified ID. (Not implemented from the front-end - try on Postman)
- `/api/users` - Http method POST - Creates a user. (Not implemented from the front-end - try on Postman)
- `/api/users/login` - Http method POST - Login route for user. (Not implemented from the front-end - try on Postman)
- `/api/users` - Http method GET - Get data for user. (Not implemented from the front-end - try on Postman)
- `/api/users/like/:pokemon_id` - Http method POST - User can like certain pokemon. (Not implemented from the front-end - try on Postman)


