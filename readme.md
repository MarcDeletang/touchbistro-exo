# Intro

Do you have node JS production experience ?
Yes, for about 7-8 years

Do you have react production experience ?
Yes, for about 5 years

Full name: Marc Deletang
Email: marc.deletang@gmail.com

# Prerequisite

You will need node (tested with v16) and/or nvm

# Installation

To install all the dependencies run

```
npm run setup (if you have nvm)
npm run install:deps
```

# Run it

For both frontend & backend:

```
npm start
```

# How it works

This web application has 2 components:

- a REST API using nest
- a react SPA

On development mode:
The API will run on the port 3001 while the web app will run on the port 3000

# Choices of stack

## Backend

I've decided to use nest, as it has several advantages:

- it's typescript first
- has a CLI to have a boostraped application in minutes
- good practives / testing suite integrated in the framework
- support for DTOs that makes the validation trivial and set the stage for the swagger documentation later

## Frontend

I've decided to use react (generated via create-react-app with typescript setup) with material UI. I've also decided not to use redux, as in this case I think it would be a bit overkill (lot of boilerplate code for a single http request) but can be put in place later
