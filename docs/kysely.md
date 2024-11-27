# Kysely: Type-safe SQL Query Builder for TypeScript

## Introduction

Kysely is a type-safe and autocompletion-friendly TypeScript SQL query builder. It's designed to make writing SQL queries in TypeScript more efficient and less error-prone. Kysely allows developers to interact with SQL databases (like PostgreSQL, MySQL, SQLite, etc.) by writing queries using JavaScript/TypeScript syntax, while ensuring type safety. This means that errors are caught at compile-time rather than runtime.

Kysely is primarily designed for Node.js but can also run on Deno and Bun. It ensures that you only refer to tables and columns visible to the part of the query you're writing. The result type will only include the selected columns with the correct types and aliases, offering additional benefits like autocompletion for enhanced developer productivity.

## Features

### Type-safety without compromises

Kysely leverages TypeScript's powerful type system to ensure that your queries are validated at compile time. This reduces common errors by making sure that you're using the correct data types when building queries.

### Auto-completion

Kysely provides intelligent code suggestions and autocompletion for table and column names, improving developer productivity and reducing the chances of mistakes.

### Query any SQL database

Kysely supports multiple SQL dialects, including PostgreSQL, MySQL, and SQLite. This flexibility allows developers to work with different databases using a unified API, making it easy to switch databases without having to rewrite queries.

## What is Kysely used for?

- **Building SQL Queries:** Kysely is primarily used for building and executing SQL queries in TypeScript applications.
- **Reduced Errors:** Its type safety helps prevent common mistakes and runtime errors.

## Relations

Kysely **is not an ORM**. It **does not** have the concept of relations. It is a **query builder** that builds the SQL queries you define. You can manage relations manually by creating SQL joins or using subqueries. However, Kysely doesn't include out-of-the-box ORM functionality like automatic relation handling, leaving you with full control over your database interactions.

While this means you will need to write more SQL, you also get the flexibility and type-safety benefits that come with Kysely.

## Installation

### Using NPM

```bash
npm install kysely
```

### Using Yarn

```bash
yarn add kysely
```

### Driver Installation (MySQL Example)

#### NPM

```bash
npm install mysql2
```

#### Yarn

```bash
yarn add mysql2
```

## Example Code

### src/types.ts

```typescript
import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  todos: TodoTable;
}

export interface TodoTable {
  id: Generated<string>;
  name: string;
  status: Status;
}

export type Status = 'todo' | 'In_progress' | 'done';

export type todo = Selectable<TodoTable>;
export type newTodo = Insertable<TodoTable>;
export type updateTodo = Updateable<TodoTable>;
```

### src/database.ts

```typescript
import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Database } from './kysely';

const dialect = new MysqlDialect({
  pool: createPool({
    host: 'localhost',
    user: 'root',
    database: 'todo_db',
    password: 'password',
    port: 3306,
    connectionLimit: 10,
    connectTimeout: 300,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
```

### src/query.ts

```typescript
import { newTodo, updateTodo } from './kysely';
import { db } from './Kysely-database';

export async function getTodoByIdKysely(id: string) {
  try {
    const result = await db.selectFrom('todos').where('id', '=', id).selectAll().execute();
    return result;
  } catch (e) {
    console.log('error', e);
  }
}

export async function updateTodoKysely(id: string, updateWith: updateTodo) {
  try {
    if (Array.isArray(updateWith) || typeof updateWith !== 'object') {
      throw new Error('updateWith must be an object.');
    }

    const { id: _, ...updateData } = updateWith;

    console.log('Update with:', updateData);

    return await db.updateTable('todos').set(updateData).where('id', '=', id).execute();
  } catch (e) {
    console.log('Error:', e);
    throw e;
  }
}

export async function createTodoKysely(todo: newTodo) {
  const { insertId } = await db.insertInto('todos').values(todo).executeTakeFirstOrThrow();

  return await getTodoByIdKysely(String(insertId!));
}

export async function deleteTodoKysely(id: string) {
  const result = await getTodoByIdKysely(id);

  if (result) {
    await db.deleteFrom('todos').where('id', '=', id).execute();
  }
  return result;
}
```

## Conclusion

Kysely offers an efficient, type-safe, and flexible way to build SQL queries in TypeScript. With autocompletion and strong compile-time validation, it helps prevent common errors and improve development productivity. While it doesn't include ORM-like features for managing relations, it gives developers complete control over their SQL queries while maintaining type safety.
