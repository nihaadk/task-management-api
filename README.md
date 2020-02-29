<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

Task Management API create with [NestJS](https://github.com/nestjs/nest).

### Themes:

Develop production-ready REST API's
CRUD operations 
Erro handling
Data transfer Objects (DTO)
System modularity
Backend development best practices
Configuration management
Logging
Security best practices


### API Endpoints - Tasks

 /tasks GET => Get tasks (include filter)
 
 /tasks/:id GET => Get a task
 
 /tasks POST => Create a task
 
 /tasks/:id DELETE => Delete a task
 
 /tasks/:id/status PATCH => Update task status
 
 
### Auth Endpoints
 
 /auth/signup POST => Sing up
 
 /auth/signin POST => Sing in

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).
