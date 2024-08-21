# Backend
run `npm install` to install all the necessary packages.

The backend is a PostgreSQL database hosted via Docker.
Docker Desktop: https://www.docker.com/products/docker-desktop/

## Housekeeping
Before doing anything, make sure nothing is running on port 5432 which the database runs on. This may be due to you running other SQL databases or containers. If this is the case, you may get server errors even if the application is working on other people's computers. Run the following command to kill all processes on port 5432.
`lsof -i :"5432" | awk 'NR!=1 {print $2}' | xargs kill`

## Initalization
run `docker compose up -d` to start the docker container that houses the database
- if you encounter issues with the database, or you want to reset it, do `docker compose down`, then start the database again
- run `docker compose up` to see the docker stuff going on. This is good for situations for troubleshooting the container not starting; likely due to incorrect SQL schemas from my experience.
run `npm run dev` to run a dev version of the backend

Backend API Testing UI: http://localhost:3010/api/v0/docs/

## Endpoints

Each Schema will have the following endpoints
* GET: Get one or more of a given item
* POST: Make a new item
* PUT: Modify an existing item
* DELETE: Delete an item