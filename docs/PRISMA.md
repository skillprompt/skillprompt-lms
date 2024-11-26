
# Prisma
Prisma is a next-generation ORM for Node.js and TypeScript that enables developers to work with databases in a type-safe and intuitive way. It supports SQL databases like PostgreSQL, MySQL, SQLite, and SQL Server, as well as NoSQL databases like MongoDB.

## Features:

1.Type-Safe Database Queries: Generate fully-typed queries for your database.

2.Database Agnostic: Works with various databases (SQL and NoSQL)

3.Query Optimization: Reduces the boilerplate needed for complex queries.

## Supported Database:

1.PostgreSQL (Highly recommended for modern applications)
2.MySQL
3.SQLite (Great for small projects and prototyping)
4.Microsoft SQL Server
5.CockroachDB (Experimental support)
6.Components

### 1.Prisma Client
->Auto-generated and type-safe query builder for Node.js & TypeScript
->The auto-generated, type-safe query builder used to interact with your database.

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

### 2.Prisma Migrate
->Migration system
->A tool for managing your database schema migrations.

```TYPESCRIPT
model Profile {
id Int @id @default(autoincrement())
bio String?
user User @relation(fields: [userId], references: [id])
userId Int @unique
}

model User {
id Int @id @default(autoincrement())
email String @unique
name String?
posts Post[]
profile Profile?
}
```

### 3.Prisma Studio

->A graphical interface for visualizing and managing your database data.

```npx prisma studio```


# Getting Started with Prisma

## 1.Create project setup

As a first step, create a project directory :

```mkdir hello-prisma``
```cd hello-prisma```

**Initialize TS project and add the Prisma Client as a development dependency:**

For NPM:

```npm init -y```
```npm install prisma typescript tsx @types/node --save-dev```

For Yarn:
```yarn init -y```
```yarn add prisma typescript tsx @types/node --dev```

 **initialize TypeScript:**

```npx tsc --init```

**Install Prisma ClI**

For NPM:
```npx prisma```

For Yarn:
```yarn prisma```

**setup Prisma Schema File**

For NPM:
```npx prisma init```

For Yarn:
```yarn prisma init```

This command does two things:

creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models
creates the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection)

## 2.Connect Your Database

To connect your database, you need to set the url field of the datasource block in your Prisma schema to your database Connection URL

```TYPESCRIPT
datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}
```


**It can also be defined in .env file:**

```DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE```

## 3.Using Prisma Migrate

Prisma Migrate is used to create the tables in your database. This data model is added on schema.Prisma file:

```TYPESCRIPT
model Profile {
id Int @id @default(autoincrement())
bio String?
user User @relation(fields: [userId], references: [id])
userId Int @unique
}
```

**This command is used to map data model to database schema.**

It creates a new SQL migration file for this migration
It runs the SQL migration file against the database
npx prisma migrate dev --name init

```npx prisma migrate dev```

Purpose: This command generates and applies a new migration based on your Prisma schema changes. It creates migration files that keep a history of changes.
Use Case: 

Purpose: This command is used to push your current Prisma schema to the database directly. It applies any changes you've made to your schema without creating migration files.

Use Case: It’s particularly useful during the development phase when you want to quickly sync your database schema with your Prisma schema without worrying about migration history.

Caution: It can overwrite data if your schema changes affect existing tables or columns, so it’s best for early-stage development or prototyping.

## 4.Install Prisma Client

For NPM:
``npm install @prisma/client``

For Yarn:
``yarn add @prisma/client``

This command invokes prisma generate command which reads Your Prisma Schema and Generate version of Prisma Client that is tailored to Your Models.

**Quering the Database**

```TYPESCRIPT
``import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
// ... you will write your Prisma Client queries here
}

main()
.then(async () => {
await prisma.$disconnect()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})
```



