```

  ______          _       ______            _____   _   _  _____  _   _   _____      _____   _              _______  ______  ______  ____   _____   __  __ 
 |  ____|        | |     |  ____|    /\    |  __ \ | \ | ||_   _|| \ | | / ____|    |  __ \ | |         /\ |__   __||  ____||  ____|/ __ \ |  __ \ |  \/  |
 | |__  ______   | |     | |__      /  \   | |__) ||  \| |  | |  |  \| || |  __     | |__) || |        /  \   | |   | |__   | |__  | |  | || |__) || \  / |
 |  __||______|  | |     |  __|    / /\ \  |  _  / | . ` |  | |  | . ` || | |_ |    |  ___/ | |       / /\ \  | |   |  __|  |  __| | |  | ||  _  / | |\/| |
 | |____         | |____ | |____  / ____ \ | | \ \ | |\  | _| |_ | |\  || |__| |    | |     | |____  / ____ \ | |   | |____ | |    | |__| || | \ \ | |  | |
 |______|        |______||______|/_/    \_\|_|  \_\|_| \_||_____||_| \_| \_____|    |_|     |______|/_/    \_\|_|   |______||_|     \____/ |_|  \_\|_|  |_|
                                                                                                                                                       

```
# E-Learning Platform

<div style="display:flex;justify-content:center;padding:10px;">
<img src="./logo.png" height="100" width="100" style="border-radius:50%"/>
</div>
A robust e-learning platform built with Node.js, Express.js, and PostgreSQL, offering a wide range of features for course management, user authentication, enrollment, and more.

## Table of Contents

- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Authentication](#authentication)
  - [Course Management](#course-management)
  - [Enrollment](#enrollment)
  - [Super Admin Features](#super-admin-features)
  - [Clustering with PM2](#clustering-with-pm2)
  - [Pagination](#pagination)
  - [Express Rate Limiting](#express-rate-limiting)
  - [Logging with Pino and Morgan](#logging-with-pino-and-morgan)
  - [File Upload and Cloudinary](#file-upload-and-cloudinary)
  - [Email Integration](#email-integration)
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
   ```env

#### ` Do not expose  Neon Database credentials to the browser `
PGHOST=
</br>
PGDATABASE=
</br>
PGUSER=
</br>
PGPASSWORD=
</br>
ENDPOINT_ID=
</br>
####
PORT=3005
</br>
JWT_SECRET=
###  `resend email configration `
RESEND_EMAIL_API_KEY= </br>
RESEND_EMAIL_FROM=
#### `nodemailer email configration`
NODEMAILER_EMAIL_API_KEY=</br>
NODEMAILER_EMAIL_FROM=
#### `Cloudinary`
CLOUDINARY_NAME=
</br>
CLOUDINARY_API_KEY=
</br>
CLOUDINARY_API_SECRET=
####  `-Super Admin data -`
ADMIN_EMAIL=
</br>
ADMIN_PASSWORD=
#### `------end-----`
   ```

4. Start the development server:
   ```sh
   npm run dev
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
- **Verify Email**: Email verification for newly registered users.

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

### Pagination

To handle large datasets efficiently, the platform includes pagination for various endpoints. Pagination allows users to navigate through different pages of data.

### Express Rate Limiting

To improve the efficiency and security of the application, rate limiting is implemented using Express Rate Limit. This helps prevent abuse and ensures fair usage of the API endpoints.

### Logging with Pino and Morgan

The platform uses Pino for logging to the console and saving logs to a logs folder. Morgan is also used for HTTP request logging, providing detailed information about each request.

### File Upload and Cloudinary

For file upload and management, the platform uses Cloudinary. Cloudinary provides a robust API for uploading, storing, and retrieving files, making it easy to manage multimedia content.

### Email Integration

- **Email Sending**: The platform uses either resend or nodemailer for sending emails, such as user registration confirmation, password reset requests, and course enrollment notifications.

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

---

Feel free to customize this description to better fit your project and its specific features and requirements.