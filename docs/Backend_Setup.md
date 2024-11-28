# **Backend Project**

This repository serves as the backend for your application, built using **Node.js**, **Express**, and **TypeScript**. It features robust authentication, secure password hashing, and reliable data validation.

---

## **Table of Contents**

- [**Features**](#features)
- [**Prerequisites**](#prerequisites)
- [**Installation**](#installation)
  - [Quick Setup](#quick-setup)
  - [Package Installation Guide](#package-installation-guide)
- [API Setup](#api-setup)
- [VS-Code Extension](#vs-code-extension)
- [Database Setup](#database-setup)
- [Environment Setup](#environment-setup)
- [**Technologies Used**](#technologies-used)

---

## **Features**

✅ **Authentication**: Implements secure user authentication with **JWT (JSON Web Tokens)**.  
✅ **Password Hashing**: Uses **bcryptjs** to hash passwords, preventing plain text storage.  
✅ **Input Validation**: Validates incoming data using **zod** for integrity and consistency.  
✅ **CORS**: Configured to handle Cross-Origin Resource Sharing securely.  
✅ **Environment Management**: Manages sensitive data via `.env` files using **dotenv**.

### **Bonus Features**

🌟 **Send OTP**: Leverage **nodemailer** to send One-Time Passwords (OTPs) for authentication.  
🌟 **Optional Security Enhancements**: Add extra security layers with **helmet** and **AWS SDK** for cloud integration.

---

## **Prerequisites**

Before setting up, ensure the following are installed on your machine:

- [**Node.js**](https://nodejs.org/) (v16+ recommended)
- [**yarn**](https://yarnpkg.com/)

---

## **Installation**

### **Quick Setup**

1. **Clone the repository**:

```bash
   git clone <repository-url>
```

2. **Install all dependencies**:

```bash
yarn install
```

---

### **Package Installation Guide**

Below is the list of required packages and their installation commands. Install everything at once or individually.

#### **Core Dependencies**

```bash
yarn add express typescript bcryptjs jsonwebtoken zod cookie-parser cors dotenv helmet express-rate-limit compression

```

#### **TypeScript Type Definitions**

```bash
yarn add --dev @types/express @types/node @types/bcryptjs @types/jsonwebtoken @types/cookie-parser @types/cors @types/dotenv  @types/compression

```

<h1>OR</h1>
<h1>You can just type Yarn Install in your terminal after you clone or just pull all dependencies will automatically addded to your package.json file</h1>

```bash
yarn install
```

### **Optional Security Packages**

yarn add nodemailer [Nodemailer Docs](https://classic.yarnpkg.com/en/package/nodemailer)

---

### <h1>Database Setup</h1>

<p>Choose/Install packages Which DataBase You needed</p>

#### **MongoDB Setup**

For MongoDB, install **mongoose** (a popular ODM for MongoDB):

```bash
yarn add mongoose
```

[Learn More About Mongoose](https://classic.yarnpkg.com/en/package/mongoose)

#### **MySQL Setup**

For MySQL, install **mysql2** (recommended for modern features and better performance):

```bash
yarn add mysql2
```

[Learn More About MySQL2](https://classic.yarnpkg.com/en/package/mysql2)

Or, install **mysql** (older, but widely used):

```bash
yarn add mysql
```

[Learn More About MySQL](https://classic.yarnpkg.com/en/package/mysql)

---

---

### **API Setup**

<p>Api is setup by sing ts-rest with swaggerui. To use it first download some dependencies</p>

```bash
yarn add @ts-rest/open-api swagger-ui-express @ts-rest/core

```

---

### **VS Code Extension**

---

Prettier - Code formatter # (optional) <br/>
ES7+ React/Redux/React-Native snippets <br/>
Better Comments # (optional) <br/>
JavaScript and TypeScript Nightly #(optional) <br/>
Docker<br/>
Nx Console<br/>
Jest Runner<br/>

---

### **Environment Setup**

Create a `.env` file in the root directory and add the following:

```env
NODE_ENV=development
PORT=4000
# Database_URI = Database_URI
FRONTEND_URL = Frontend_URI
JWT_SECRET=random_secret_value

```

---

### **Start the Development Server**

<p>By clicking to nx console and inside the nx console in bottom-left-corner you can see run hit that button then click to the serve and select file which you want to run</p>

### **Build and Start the Production Server**

```bash
yarn start
```

---

## **Neccessary Technologies Docs Used in Backend**

| Technology             | Description                                                                                                                                                                                                | Documentation                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Express**            | It is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications, including routing, middleware, and handling HTTP requests. | [Express Docs](https://classic.yarnpkg.com/en/package/express)                       |
| **helmet**             | It is a middleware for Express.js that helps secure web applications by setting various HTTP headers to protect against common security vulnerabilities.                                                   | [Helmet Docs](https://classic.yarnpkg.com/en/package/helmet)                         |
| **TypeScript**         | It is a superset of JavaScript that adds static typing and advanced features, enabling better tooling, error detection, and maintainability in large-scale applications.                                   | [TypeScript Docs](https://classic.yarnpkg.com/en/package/typescript)                 |
| **bcryptjs**           | It is a JavaScript library for hashing passwords and comparing hashed values securely, using the bcrypt algorithm to enhance data security.                                                                | [bcryptjs Docs](https://classic.yarnpkg.com/en/package/bcryptjs)                     |
| **jsonwebtoken**       | It is an open standard for securely transmitting information between parties as a compact, URL-safe token, often used for authentication and authorization.                                                | [JWT Docs](https://classic.yarnpkg.com/en/package/jsonwebtoken)                      |
| **dotenv**             | It is a Node.js module that loads environment variables from a .env file into process.env to manage configuration settings securely in development.                                                        | [dotenv Docs](https://classic.yarnpkg.com/en/package/dotenv)                         |
| **zod**                | It is a TypeScript-first schema validation library that provides a simple and expressive way to define and validate data structures.                                                                       | [zod Docs](https://classic.yarnpkg.com/en/package/zod)                               |
| **cookie-parser**      | It is a middleware for Express.js that parses cookies attached to the incoming requests, making them accessible through req.cookies                                                                        | [cookie-parser Docs](https://classic.yarnpkg.com/en/package/cookie-parser)           |
| **CORS**               | It is a security feature that allows or restricts web applications from making requests to domains outside the origin domain.                                                                              | [CORS Docs](https://classic.yarnpkg.com/en/package/cors)                             |
| **express-rate-limit** | It is a middleware for Express.js that limits repeated requests to an API by IP address to prevent abuse and ensure fair usage                                                                             | [Express-Rate-Limit Docs](https://classic.yarnpkg.com/en/package/express-rate-limit) |
| **compression**        | It reduces the size of data by encoding it in a more efficient format, saving storage space and improving data transfer speeds.                                                                            | [Compression Docs](https://classic.yarnpkg.com/en/package/compression)               |

---
