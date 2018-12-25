# to-do list single page app

 Single page app built with ReactJS and Redux state management
 configured Webpack with Babel, PostCSS, SASS loaders
 css modules has been used for local class names, mixins are used for using breakpoints for mobile-first development.
 For managing state across all application I prefer using Redux. Container folder has been excluded but for apps with higher complexity and larger structure could be placed in different folder separately. For API calls I prefer using XHR because of flexibility and more clear status of calls. I have tried to limit the number of api calls and using store sharing by props and managing component state for better performance. For JWT authentication I have used cookies to store the key.

 to-do list simple task management system meets requirements:
  //display a list of tasks
  //create a new task
  //view single task by id
  //add a comment to the task

NOTES: to enable cross-origin requests used cors-anywhere.herokuapp.com/,

## Installation

Install dependencies

```bash
$ npm install
```

## Deployment

```bash
$ $ npm run build
```

## Development

Run the local webpack-dev-server on http://localhost:8080/

```bash
$ npm run start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
