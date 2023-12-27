# Business Card App Node Server

This Node server is designed for the "Business Card App," a web application that provides website management capabilities to business users. With this server, users can post content, edit existing content, and delete it. The server utilizes various Node.js libraries to enhance functionality and security.

## Features

- **Morgan**: The server use Morgan, is used to create a logger that prints all incoming requests to the console. It also saves all errors in a log file, providing detailed insights into server activity.

- **Chalk**: The server use Chalk, is employed to add color to console outputs, making it easier to distinguish between different types of log messages.

- **Cors**: The server uses CORS (Cross-Origin Resource Sharing) to allow HTTP requests only from authorized addresses, ensuring secure communication with the web application.

- **Joi**: The server use Joi, is utilized for data validation, ensuring that objects received from clients meet specified criteria. This helps maintain data integrity and security.

- **Bcryptjs**: The server use Bcryptjs, is used to encrypt a new user's password before storing it in the MongoDB database. It also enables password verification during login, enhancing user account security.

- **Blocking users**:
  In case of wrong login attempt more than 3 times, the user will be blocked for 24 hours.

- **Json Web Token (JWT)**: JWT is employed to create encrypted tokens for user authentication. The payload object contains the following keys: `_id` (user ID), `isBusiness` (flag indicating if the user is a business user), and `isAdmin` (flag indicating if the user has administrative privileges).

- **Passport**: Passport is integrated to verify users connecting through Google. It provides a secure and convenient way for users to authenticate using their Google accounts.

- **MongoDB & Atlas**: The server uses two databases, one on-premises and one in the cloud, for data storage and retrieval.

- **Mongoose**: Mongoose is used to create models of Cards and Users, facilitating interaction with the MongoDB databases.

- **JSON Support**: The server allows receiving JSON in the body of HTTP requests, enhancing data exchange capabilities.

- **Configuration Files**: Configuration files for development and production environments are stored in the "config" folder, with "development.json" and "production.json" files.

## Authorization Endpoints

Here's a table of endpoints with their respective authorization requirements:

### Users

| Action                   | Authorization Method | URL          | Authorization                | Return                           |
| ------------------------ | -------------------- | ------------ | ---------------------------- | -------------------------------- |
| Register User            | POST                 | /users       | all                          | {"\_id","name","email"}          |
| Google Register          | POST                 | /google/auth | all                          | link for register and then token |
| Login                    | POST                 | /users/login | all                          | token                            |
| Get All Users            | GET                  | /users       | admin                        | Array of users                   |
| Get User                 | GET                  | /users/:id   | The registered user or admin | User                             |
| Edit User                | PUT                  | /users/:id   | The registered user          | User                             |
| Change isBusiness Status | PATCH                | /users/:id   | The registered user          | User                             |
| Delete User              | DELETE               | /users/:id   | The registered user or admin | Deleted user                     |

### Cards

| Action          | Authorization Method | URL             | Authorization                          | Return         |
| --------------- | -------------------- | --------------- | -------------------------------------- | -------------- |
| Get All Cards   | GET                  | /cards          | all                                    | Array of cards |
| Get User Cards  | GET                  | /cards/my-cards | The registered user                    | card           |
| Get Card by ID  | GET                  | /cards/:id      | all                                    | card           |
| Create New Card | POST                 | /cards          | Business user                          | card           |
| Edit Card       | PUT                  | /cards/:id      | The user who created the card          | card           |
| Like Card       | PATCH                | /cards/:id      | A registered user                      | card           |
| Delete Card     | DELETE               | /cards/:id      | The user who created the card or admin | Deleted card   |
| change bizNumbe | PATCH                | /:bizNumber/:id | Admin user                             | card           |

You can see examples of json that the server should receive in all kinds of requests in the section [testing](#testing)

## Request Object Property Definitions

### Create/update Card

- **title**: A string with a minimum length of 2 and a maximum length of 256. (Required)
- **subtitle**: A string with a minimum length of 2 and a maximum length of 256. (Required)
- **description**: A string with a minimum length of 2 and a maximum length of 1024. (Required)
- **phone**: A string representing a valid israeli phone number. The phone number must match the pattern: `+?(972|0)(-)?(\d{2}(-)?\d{7}|\d{2}(-)?\d{3}(-)?\d{4})`. (Required)
- **web**: A string representing a valid URL. (Optional)
- **email**: A string representing a valid email address. (Required)
- **image**:
  - **url**: A string representing a valid URL for the card's image. (Optional)
  - **alt**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
- **address**:
  - **state**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
  - **country**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **city**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **street**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **houseNumber**: A number. (Optional)
  - **zip**: A number. (Optional)
- **bizNumber**: A number, allowing an empty string. (Optional)
- **user_id**: A string, allowing an empty string. (Optional)

### Login

- **email**: A string representing a valid email address. (Required)
- **password**: A string representing a password that must meet the criteria: at least seven characters, including an uppercase letter, a lowercase letter, a number, and one of the following symbols: !@#$%^&\*- (Required)

### Register

- **name**:
  - **first**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **middle**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
  - **last**: A string with a minimum length of 2 and a maximum length of 256. (Required)
- **isBusiness**: A boolean. (Required)
- **phone**: A string representing a valid israeli phone number. The phone number must match the pattern: `+?(972|0)(-)?(\d{2}(-)?\d{7}|\d{2}(-)?\d{3}(-)?\d{4})`. (Required)
- **email**: A string representing a valid email address. (Required)
- **password**: A string representing a password that must meet the criteria: at least nine characters, including an uppercase letter, a lowercase letter, a number, and one of the following symbols: !@#$%^&\*- (Required)
- **image**:
  - **url**: A string representing a valid URL for the user's image. (Optional)
  - **alt**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
- **address**:
  - **state**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
  - **country**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **city**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **street**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **houseNumber**: A number. (Optional)
  - **zip**: A number. (Optional)

### Update User

- **name**:
  - **first**: A string with a minimum length of 2 and a maximum length of 256. (Required)
  - **middle**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
  - **last**: A string with a minimum length of 2 and a maximum length of 256. (Required)
- **isBusiness**: A boolean. (Required)
- **phone**: A string representing a valid israeli phone number. The phone number must match the pattern: `+?(972|0)(-)?(\d{2}(-)?\d{7}|\d{2}(-)?\d{3}(-)?\d{4})`. (Required)
- **email**: A string representing a valid email address. (Required)
- **image**:
  - **url**: A string representing a valid URL for the user's image. (Optional)
  - **alt**: A string with a minimum length of 2 and a maximum length of 256, allowing an empty string. (Optional)
- **address**:
  - **state**: A string with a minimum length of 2 and a maximum length of 256

## Configuration

The server's configuration is managed through environment variables, which can be set using the appropriate JSON configuration file.

### Configuration Files

Create a folder named "config" and inside it, place the following JSON files:

#### development.json:

```json
{
  "NODE_ENV": "production",
  "PORT": 9191,
  "TOKEN_GENERATOR": "jwt",
  "JWT_KEY": "your JWT secret",
  "DB_USER_NAME": "your atlas user",
  "DB_PASSWORD": "your atlas password",
  "GOOGLE_CLIENT_ID": "your google client id",
  "GOOGLE_CLIENT_SECRET": "your google client secret",
  "LOGGER": "morgan",
  "DB": "MONGODB",
  "DB_HOST": "your db host",
  "DB_NAME": "business-cards-app"
}
```

#### production.json:

```json
{
  "NODE_ENV": "development",
  "PORT": 8181,
  "TOKEN_GENERATOR": "jwt",
  "DB_USER_NAME": null,
  "DB_PASSWORD": null,
  "JWT_KEY": "your JWT secret",
  "GOOGLE_CLIENT_ID": "your google client id",
  "GOOGLE_CLIENT_SECRET": "your google client secret",
  "LOGGER": "morgan",
  "DB": "MONGODB",
  "DB_HOST": "your db host",
  "DB_NAME": "business-cards"
}
```

Make sure to provide the necessary values in these configuration files.

## Getting Started

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/eliyahugez/node
   ```

2. Install the required dependencies using npm:

   ```shell
   npm install
   ```

3. Configure your environment variables for the server based on the "config/development.json" or "config/production.json" file as needed.

4. To start the server, you have two options:

   - For **development**, run the following command:

     ```shell
     npm run dev
     ```

   - For **production**, run the following command:

     ```shell
     npm start
     ```

## Testing

<a name="testing"></a>

Here are examples of json that the server should receive in all kinds of operations

### Register User

```json
{
  "name": {
    "first": "eliyahu",
    "last": "gez"
  },
  "phone": "050-0000000",
  "email": "eliyahugez@gmail.com",
  "password": "Dr123456!",
  "image": {
    "url": "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    "alt": "Business Card"
  },
  "address": {
    "country": "israel",
    "city": "tel-aviv",
    "street": "magnive",
    "houseNumber": 5
  },
  "isBusiness": true
}
```

### Login

```json
{
  "email": "eliyahugez1111@gmail.com",
  "password": "Dr123456!"
}
```

### Create Card/Edit Card

```json
{
  "title": "my card",
  "subtitle": "this is  my card",
  "description": "this is my card in the database",
  "phone": "050-0000000",
  "email": "eliyahugez@gmail.com",
  "web": "https://www.test.co.il",
  "address": {
    "country": "test",
    "city": "test",
    "street": "test",
    "houseNumber": 3,
    "zip": 0
  },
  "image": {
    "url": "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    "alt": "Business Card"
  }
}
```

### postman

In addition, you can simply click on the button here and see or fork the collection in your postman.

The collection is already ready with all possible requests,
Just pay attention to change the port of the environment if you need to a different environment (for production change it to 9191).

and define the variables of the collection in the necessary requests (x-auth-token, user_id, card-id)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/25953832-56a1dfb9-502b-41b1-a5b6-46ffab5d00a0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25953832-56a1dfb9-502b-41b1-a5b6-46ffab5d00a0%26entityType%3Dcollection%26workspaceId%3D9a4b0f24-2bdd-4a3f-8821-7a5412892097#?env%5Bdev%5D=W3sia2V5IjoicG9ydCIsInZhbHVlIjoiODE4MSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0In1d)

## Usage

This server serves as the backend for the Business Card App web application. It provides RESTful API endpoints for managing content, user authentication, and more. Refer to the API documentation or the client-side application for detailed usage instructions.

## API Documentation

For detailed information on the available API endpoints and how to use them, please refer to the API documentation provided separately.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

---

Enjoy using the Business Card App Node Server! If you encounter any issues or have questions, please don't hesitate to contact us.

**Contact Information**:

- Email: eliyahugez@gmail.com

Thank you for choosing our server for your web application needs!

```

This README includes all the requested changes and provides a complete guide for using the Business Card App Node Server.
```
