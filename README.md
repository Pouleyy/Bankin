# Bankin API

## Setup
- ES6 w/ Babel
- Gulp Tasks
- ESLint

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [VSCode](https://code.visualstudio.com) (Recommended)

## Test back online on [Heroku](https://bankin-ingesup.herokuapp.com)

## Test front online on [Heroku](https://angular4front.herokuapp.com)

### Front is on [Github](https://github.com/yann9602/frontAngular4) too

## Self hosted version
### Build
```bash
$ yarn install
$ yarn build #or run Build Task in VSCode
```

### Start
You need to put some environment variable.
JWT\_SECRET, LOG\_LEVEL, MONGO\_URL, NODE\_ENV, ROOT\_PASSWD.
The app create a root user at launch.
```bash
$ yarn start
```

## Endpoint

#### Authentication 
* Create a user, you need to put his username, password and mail in the body. Username and mail must be unique.
```
POST : /auth/signup
```

* Log a user, username and password in the body. A JWT is return.
```
PUT : /auth/login
```

* Logout a user.
```
PUT : /auth/logout
```

#### User
* Get info of the user. The JWT must be in the *Authorization* header
```
GET : /users/:username
```

* Update a user. Only mail and password can be modified. The JWT must be in the *Authorization* header
```
PUT : /users/:username
```

* Delete a user. His transferts are not delete in case he come back. The JWT must be in the *Authorization* header
```
DELETE : /users/:username
```

#### Transfer
* Get all the transfer of the user. The JWT must be in the *Authorization* header
```
GET : /transfer/:username
```

* Create a transfer. The *amount* of the transfer must be in the body. The JWT must be in the *Authorization* header
```
PUT : /users/:username
```

