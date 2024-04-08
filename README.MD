```

  ______          _       ______            _____   _   _  _____  _   _   _____      _____   _              _______  ______  ______  ____   _____   __  __ 
 |  ____|        | |     |  ____|    /\    |  __ \ | \ | ||_   _|| \ | | / ____|    |  __ \ | |         /\ |__   __||  ____||  ____|/ __ \ |  __ \ |  \/  |
 | |__  ______   | |     | |__      /  \   | |__) ||  \| |  | |  |  \| || |  __     | |__) || |        /  \   | |   | |__   | |__  | |  | || |__) || \  / |
 |  __||______|  | |     |  __|    / /\ \  |  _  / | . ` |  | |  | . ` || | |_ |    |  ___/ | |       / /\ \  | |   |  __|  |  __| | |  | ||  _  / | |\/| |
 | |____         | |____ | |____  / ____ \ | | \ \ | |\  | _| |_ | |\  || |__| |    | |     | |____  / ____ \ | |   | |____ | |    | |__| || | \ \ | |  | |
 |______|        |______||______|/_/    \_\|_|  \_\|_| \_||_____||_| \_| \_____|    |_|     |______|/_/    \_\|_|   |______||_|     \____/ |_|  \_\|_|  |_|
                                                                                                                                                       

```
# `E-Learning Platform`

<div align="center">
<img src="./logo.png" height="100" width="100" style="border-radius:50%"/>
</div>
<div align="center">
A robust e-learning platform built with Node.js, Express.js, and PostgreSQL, offering a wide range of features for course management, user authentication, enrollment, and more.
</div>

<div align="center">
  <h1>Dhanraj Choudhary</h1>
  <p><a href="mailto:choudharydhanraj239@gmail.com">choudharydhanraj239@gmail.com</a></p>
</div>


[![Downloads](https://img.shields.io/github/downloads/DHANRAJCHOUDHARY244/e-learning-platform/total)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/releases)
[![Contributors](https://img.shields.io/github/contributors/DHANRAJCHOUDHARY244/e-learning-platform?color=dark-green)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/DHANRAJCHOUDHARY244/e-learning-platform?style=social)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/network/members)
[![Stargazers](https://img.shields.io/github/stars/DHANRAJCHOUDHARY244/e-learning-platform?style=social)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/stargazers)
[![Issues](https://img.shields.io/github/issues/DHANRAJCHOUDHARY244/e-learning-platform)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/issues)
[![License](https://img.shields.io/github/license/DHANRAJCHOUDHARY244/e-learning-platform)](https://github.com/DHANRAJCHOUDHARY244/e-learning-platform/blob/master/LICENSE)



## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Authentication](#authentication)
  - [Course Management](#course-management)
  - [Enrollment](#enrollment)
  - [Super Admin Features](#super-admin-features)
  - [Folder and file Stucture](#folder-and-file-stucture)
  - [Clustering with PM2](#clustering-with-pm2)
  - [Pagination](#pagination)
  - [Express Rate Limiting](#express-rate-limiting)
  - [Logging with Pino and Morgan](#logging-with-pino-and-morgan)
  - [File Upload and Cloudinary](#file-upload-and-cloudinary)
  - [Email Integration](#email-integration)
  - [Grouping Routes](#grouping-routes )
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DHANRAJCHOUDHARY244/e-learning-platform.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:

#### All are dummy env keys please use your own

```ini

PGHOST=lmk
PGDATABASE=lnjnau
PGUSER=nnkkln
PGPASSWORD=lkkl
ENDPOINT_ID=jhbdhvewfj
PORT=3005
JWT_SECRET=lnefanwrn478yc9mup409809978^%^&$%^$%^#
RESEND_EMAIL_API_KEY=khbkwiu8768789
RESEND_EMAIL_FROM='choudharydhanraj239@gmail.com'
NODEMAILER_EMAIL_API_KEY='kjnfekwjankjaefwniu4h87y'
NODEMAILER_EMAIL_FROM='choudharydhanraj239@gmail.com'
CLOUDINARY_NAME='cloudinary name'
CLOUDINARY_API_KEY='clodinaryapikey'
CLOUDINARY_API_SECRET='clodinarysecret' 
ADMIN_EMAIL='choudharydhanraj239@gmail.com'
ADMIN_PASSWORD='Admin$123%4654'
```

4. Start the development server:
   ```sh
   npm start
   ```

## Technologies Used

- **bcrypt** - For encrypting passwords.
- **cors** - For enabling Cross-Origin Resource Sharing.
- **cloudinary** - For image upload and management.
- **express** - For building the web server.
- **express-fileupload** - For handling file uploads.
- **express-rate-limit** - For rate limiting API endpoints.
- **joi** - For request validation.
- **jsonwebtoken** - For authentication.
- **morgan** - For HTTP request logging.
- **nodemailer** - For sending emails.
- **pg** - PostgreSQL client for Node.js.
- **pino** - For logging.
- **prettier** - For code formatting.
- **nodemon** - For automatic server restarts in development.
- **pm2** - For clustering and multi-threading in production.

## Features

### Authentication

- **Register**: Users can create a new account.
- **Login**: Existing users can log in to their accounts.
- **Forget Password**: Users can reset their password through email verification.
- **Verify Email**: Otp Email verification for forgot and reset password.

### Course Management

- **Create Course**: Super admin can create new courses.
- **Update Course**: Super admin can update existing courses.
- **Delete Course**: Super admin can delete courses.
- **View Courses**: Users can view all available courses.

### Enrollment

- **Enroll/Unenroll**: Users can enroll or unenroll from courses.
- **View Enrolled Courses**: Users can see the courses they are enrolled in.

### Super Admin Features

- **Create User**: Super admin can create new user accounts.
- **Update User**: Super admin can update user information.
- **Delete User**: Super admin can delete user accounts.
- **Manage Courses**: Super admin can create, update, and delete courses.

### Clustering with PM2

- **Start Cluster**: Start the application in cluster mode with the number of instances equal to the number of CPU cores available on the machine.
- **Start Cluster (Foreground)**: Start the application in cluster mode and keep it running in the foreground.
- **Stop Cluster**: Stop all instances of the application running in cluster mode.
- **Delete Cluster**: Delete all instances of the application running in cluster mode from PM2's process list.
- **List Clusters**: List all instances of the application running in cluster mode, along with their status.
- **Monitor Cluster**: Monitor the resource usage of all instances of the application running in cluster mode.

### Folder and file Stucture

```
.
├── config         
│   ├── cloudinary.js             # cloudinary config
│   ├── constants.js              # error codes
│   └── database.js               # Logic of database connection
│ 
├── controllers         
│   ├── auth.controller.js              # Logic of auth controllers
│   ├── course.controller.js            # Logic of course controllers
│   ├── user.controller.js              # Logic of user controllers
│   └── enrollment.controller.js        # Logic of enrollments controllers
│ 
├── routes         
│   ├── auth.routes.js             # Logic of auth routes
│   ├── user.routes.js             # Logic of user routes
│   ├── enrollments.routes.js      # Logic of enrollment routes
│   ├── course.routes.js           # Logic of course routes
│   └── index.js                   # Logic of grouping routes
│ 
├── models                             # contains all models logic
│   ├── courses.model.js             
│   ├── user.model.js             
│   ├── enrollments.model.js      
│   ├── otp.model.js           
│   └── creatable_tables.js                  
│  
│  
│  
├── services                            # contains all common services logic
│   ├── cloudinary.service.js             
│   ├── email.service.js             
│   ├── generalhelper.service.js.js      
│   ├── ipratelimit.service.js           
│   └── passwordhashing.service.js                  
│  
│  
│  
├── utils
│   ├── email.js            # Nodemailer and Resend logic to send OTP via email
│   ├── pino.js             # pino logic to save and logger and maintains the records of all logs
│   └── startingfunc.js     # ascii char style print when server is start
│
├── middleware                 
│   ├── validations         # it contains all joi validations middleware
│   ├── checkadminrole.js   # it check user admin functionality middleware
│   ├── ratelimit.js        # it contains logic of limit request middleware
│   └── validaterequest.js  #  contains json web token logic
│    
├── templates                 
│   └── contenttemplates.js   # Custom contents for different email send with func
│   └── mailTemplate.js       # Custom HTML and CSS mail template for Nodemailer and resend
│    
├── validation               # joi validation schema logics
│
│
├── .server.js              # logics of express server and assemble all module to cuppling with each other
|
├── .env                    # Contains confidential keys 
├── .gitignore              # Git logic to ignore files 
├── package.json            # Contains all the packages information
└── README.md               # Documentation of code

```

### Pagination

To handle large datasets efficiently, the platform includes pagination for various endpoints. Pagination allows users to navigate through different pages of data.

### Express Rate Limiting

To improve the efficiency and security of the application, rate limiting is implemented using Express Rate Limit. This helps prevent abuse and ensures fair usage of the API endpoints.

### Logging with Pino and Morgan

The platform uses Pino for logging to the console and saving logs to a logs folder. Morgan is also used for HTTP request logging, providing detailed information about each request.

## Logging with Pino

The project uses Pino for logging to the console and saving logs to a file. Pino is configured with the following options:

- **Process Title and ID**: Included in log messages.
- **Log Output**: Saved to `./logs/output.log`.
- **Formatting**: Log messages are formatted with `pino-pretty`.
- **Colorization**: Console logs are colorized.
- **Timestamps**: Included in log messages.

```javascript
const pino = require('pino');
const logger = pino({
    base: { processTitle: `PTitle:- ${process.title}`, processId: `P_ID:- ${process.pid}` },
    transport: {
        targets: [
            { target: 'pino-pretty', options: { destination: './logs/output.log', mkdir: true, colorize: false, include: "processTitle,processId,hostname,time,level", translateTime: "SYS: 'Date' dd/mm/yy HH:MM:ss" } },
            { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:dd/mm/yy HH:MM:ss', include: 'pid,hostname,time,level' } },
        ],
    }
});
module.exports = logger;
```



### File Upload and Cloudinary

For file upload and management, the platform uses Cloudinary. Cloudinary provides a robust API for uploading, storing, and retrieving files, making it easy to manage multimedia content.

### Email Integration

- **Email Sending**: The platform uses either resend or nodemailer for sending emails, such as user registration confirmation, password reset requests, and course enrollment notifications.

### Grouping Routes 
## `express.application.prefix`

In this project, we use the `express.application.prefix` configuration to group routes in our Express application. This allows us to define a common prefix for a group of related routes, making our code more organized and easier to maintain.


```javascript
express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(process.env.EXPRESS_APPLICATION_PREFIX + path, router);
    configure(router);
    return router;
};

```
### How it works

We have defined a custom function that takes two arguments: `path` and `configure`. Inside this function, we create a new Express router and use the `express.application.prefix` environment variable to set the prefix for this router.

Here's an example of how we use the custom function to group routes:

```javascript
const express = require('express')

const app = express();



app.prefix('/api/auth', (router) => {
    const authRoute = require('./auth.routes');
    router.use('/', authRoute)
})

app.prefix('/api/user', (router) => {
    const userRoute = require('./user.routes');
    router.use('/', userRoute)
})

app.prefix('/api/course', (router) => {
    const courseRoute = require('./course.routes');
    router.use('/', courseRoute)
})

app.prefix('/api/enrollment', (router) => {
    const enrollmentRoute = require('./enrollment.routes');
    router.use('/', enrollmentRoute)
})
```

In this example, all routes related to user management are grouped under the `/users` prefix, and all routes related to course management are grouped under the `/courses` prefix.

### Benefits of Route Grouping

- **Organized Code**: Grouping routes with a common prefix helps us organize our code and makes it easier to understand the structure of our application.
- **Modular Design**: Route grouping allows us to modularize our application by separating different parts of the API into distinct groups.
- **Simplifies Route Definitions**: By defining a prefix once for a group of routes, we can avoid repeating the prefix for each individual route.

### Changing the Prefix

To change the route prefix, simply update the `EXPRESS_APPLICATION_PREFIX` environment variable in your `.env` file and restart the server. The new prefix will be applied to all routes defined using the custom function.



## Usage

1. Register a new account or login.
2. Browse and enroll in courses.
3. View and manage your enrolled courses.
4. Super admin can manage courses and user accounts.

## Contributing

We welcome contributions to the project. To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


