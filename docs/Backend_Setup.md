# **Backend Project**

This repository serves as the backend for your application, built using **Node.js**, **Express**, and **TypeScript**. It features robust authentication, secure password hashing, and reliable data validation.

---

## **Table of Contents**

- [**Features**](#features)
- [**Prerequisites**](#prerequisites)
- [**Installation**](#installation)
  - [Quick Setup](#quick-setup)
  - [Package Installation Guide](#package-installation-guide)
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

### **Optional Security Packages**

yarn add nodemailer [Nodemailer Docs](https://classic.yarnpkg.com/en/package/nodemailer)

---

### <h1>Database Setup</h1>

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

### **VS-Code Extension**

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
DATABASE_URL=your_database_url_here
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

## **Technologies Used**

| Technology             | Description                                                | Documentation                                                                        |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Express**            | Lightweight web framework for building APIs.               | [Express Docs](https://classic.yarnpkg.com/en/package/express)                       |
| **TypeScript**         | Superset of JavaScript with static typing.                 | [TypeScript Docs](https://classic.yarnpkg.com/en/package/typescript)                 |
| **helmet**             | Help secure Express apps by setting HTTP response headers. | [Helmet Docs](https://classic.yarnpkg.com/en/package/helmet)                         |
| **bcryptjs**           | Secure password hashing library.                           | [bcryptjs Docs](https://classic.yarnpkg.com/en/package/bcryptjs)                     |
| **jsonwebtoken**       | Generate and verify JSON Web Tokens (JWTs).                | [JWT Docs](https://classic.yarnpkg.com/en/package/jsonwebtoken)                      |
| **dotenv**             | Loads environment variables from `.env` files.             | [dotenv Docs](https://classic.yarnpkg.com/en/package/dotenv)                         |
| **zod**                | Schema validation library for runtime data validation.     | [zod Docs](https://classic.yarnpkg.com/en/package/zod)                               |
| **cookie-parser**      | Middleware for parsing cookies.                            | [cookie-parser Docs](https://classic.yarnpkg.com/en/package/cookie-parser)           |
| **CORS**               | Middleware to enable secure Cross-Origin Resource Sharing. | [CORS Docs](https://classic.yarnpkg.com/en/package/cors)                             |
| **express-rate-limit** | Middleware to enable secure Cross-Origin Resource Sharing. | [Express-Rate-Limit Docs](https://classic.yarnpkg.com/en/package/express-rate-limit) |

---
