# PsycCheck
#### Instructions to start app
##### API
`1- npm i`<br>
`2- npm run dev`<br>
##### UI
`1- npm i`<br>
`2- npm start`<br>
tested on node `v14.19.1` <br>

## Project Structure / Details (the main focus is the project structure, so it can be extended to a complete application)

### UI
* structure
    * seperate folders for components, containers, routes, constants, herlpers, utils, and services  
    * seperate route components
    * using `React.lazy` to render a dynamic import as a regular component
* `axios` is used for services
    * extended its usability by using `interceptors`
    * using custom hooks for api calls
* using `material ui` v4 components
* proper error handling, processing/loaders for each request
* using `react-router-dom`
* a few test cases with jest and enzyme

### API
* structure
    * seperate folders for controllers, middlewares, services, database, configs,and constants  
    * seperate setup for migrations, models,and seeders
    * seperate error handling, and logger middlewares
* `bunyan` is used for logging
* using `Sequelize`
* using `Joi` for request validations
* seperate validation schemas 
