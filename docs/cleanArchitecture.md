# Clean Code Architecture

Clean Code Architecture, also known as Clean Architecture, is a software design approach proposed by Robert C. Martin (Uncle Bob). This philosophy emphasizes the separation of concerns and independence of different layers in a system, making it easier to modify and extend software over time. Its main goal is to produce maintainable, scalable, and testable software systems.

![1_gNMlCdPkghf_2F8v3MGtqA](https://github.com/user-attachments/assets/ad0ad8ad-7781-4ff2-843c-d08c4010d652)

---

## Key Principles of Clean Code Architecture:

1. **Separation of Concerns**  
   The system is divided into layers or rings, each with a specific responsibility. This reduces coupling between different parts of the system.

2. **Dependency Rule**  
   Dependencies should always point inward, meaning inner layers should not depend on outer layers. This ensures that core business logic is insulated from external concerns like databases, UI, or frameworks.

3. **Independence**

   - **Framework Independence:** The architecture does not depend on any specific framework, making it easier to swap frameworks without significant changes.
   - **UI Independence:** The core logic is separate from the user interface, allowing for multiple interfaces to be used without affecting the core.
   - **Database Independence:** The business logic is not tied to a specific database, enabling changes to data storage solutions without altering the core.

4. **Testability**  
   By isolating business rules, Clean Architecture makes it easier to write unit tests, as the core logic is decoupled from external dependencies.

5. **Flexibility and Maintainability**  
   Organizing the code into layers enables easier adaptation to changes and reduces maintenance overhead.

---

## Layers in Clean Code Architecture

1. **Entities (Core Business Rules):**

   - Represent the core data and behavior of the system.
   - Independent of any external framework, database, or UI.
   - Should change only if business logic changes.

2. **Use Cases (Application Business Rules):**

   - Contain the specific rules for how the application interacts with entities.
   - Coordinate user actions and ensure proper execution of business logic.
   - Independent of the interface and infrastructure.

3. **Interface Adapters:**

   - Bridge the use cases and the external world (UI, databases, APIs, etc.).
   - Convert data to and from formats usable by the core application.

4. **Frameworks and Drivers:**
   - Represent external tools and frameworks used by the application (e.g., web frameworks, databases, external APIs).
   - This layer is the most susceptible to change, so it is kept at the outermost level to minimize its impact on the core logic.

---

## Alternative Layer Organization

### Data Layer

Handles data from external sources, such as databases or web services.

- **Data Sources:** Classes responsible for fetching data from various sources (e.g., REST APIs, local storage).
- **Models:** Defines the data models used throughout the application.
- **Repository:** Acts as an abstraction layer over data sources, providing a clean API for accessing and managing data.

### Domain Layer

Contains the core business logic and rules of the application.

- **Entities:** Core business objects with properties and behaviors.
- **Use Cases:** Application-specific business rules, orchestrating interactions between entities and data sources.
- **Repository Interfaces:** Interfaces for repositories, decoupling the domain layer from specific data sources.

### Presentation Layer

Handles user interface logic and interactions.

- **BLoC (Business Logic Component):** Manages the application’s state and business logic.
- **Pages:** Represents individual screens or views.
- **Widgets:** Reusable UI components across screens.
- **UI Controllers:** Handle user inputs and events, coordinating with BLoCs to update the UI.

---

## Advantages of Clean Code Architecture

- **Maintainability:** Changes to one part of the system have minimal impact on others.
- **Scalability:** Well-defined layers make it easier to extend functionality.
- **Testability:** Decoupling simplifies writing and running automated tests.
- **Framework Independence:** Flexibility in choosing or switching frameworks and technologies.

---

## Example: Task Management System in Express.js

### Project Structure

```
src/
├── entities/
│   └── Task.js
├── usecases/
│   ├── CreateTask.js
│   ├── GetTasks.js
│   └── ToggleTaskStatus.js
├── controllers/
│   └── TaskController.js
├── repositories/
│   └── TaskRepository.js
├── frameworks/
│   └── db.js
├── routes/
│   └── taskRoutes.js
├── app.js
└── server.js
```

### Code Snippets

1. **Entities**

   ```javascript
   // src/entities/Task.js
   class Task {
     constructor(id, title, isCompleted = false) {
       this.id = id;
       this.title = title;
       this.isCompleted = isCompleted;
     }

     markAsCompleted() {
       this.isCompleted = true;
     }

     markAsPending() {
       this.isCompleted = false;
     }
   }

   module.exports = Task;
   ```

2. **Use Cases**  
   **Create Task:**

   ```javascript
   // src/usecases/CreateTask.js
   module.exports = class CreateTask {
     constructor(taskRepository) {
       this.taskRepository = taskRepository;
     }

     async execute(taskData) {
       const newTask = await this.taskRepository.create(taskData);
       return newTask;
     }
   };
   ```

   **Get Tasks:**

   ```javascript
   // src/usecases/GetTasks.js
   module.exports = class GetTasks {
     constructor(taskRepository) {
       this.taskRepository = taskRepository;
     }

     async execute(filter = {}) {
       return await this.taskRepository.getAll(filter);
     }
   };
   ```

   **Toggle Task Status:**

   ```javascript
   // src/usecases/ToggleTaskStatus.js
   module.exports = class ToggleTaskStatus {
     constructor(taskRepository) {
       this.taskRepository = taskRepository;
     }

     async execute(taskId) {
       const task = await this.taskRepository.getById(taskId);
       if (!task) throw new Error('Task not found');

       if (task.isCompleted) {
         task.markAsPending();
       } else {
         task.markAsCompleted();
       }

       return await this.taskRepository.update(taskId, task);
     }
   };
   ```

3. **Repository**

   ```javascript
   // src/repositories/TaskRepository.js
   class TaskRepository {
     constructor(database) {
       this.database = database;
       this.tasks = database.tasks || [];
     }

     async create(taskData) {
       const id = this.tasks.length + 1;
       const task = { id, ...taskData, isCompleted: false };
       this.tasks.push(task);
       return task;
     }

     async getAll(filter) {
       return this.tasks.filter((task) => {
         if (filter.isCompleted !== undefined) {
           return task.isCompleted === filter.isCompleted;
         }
         return true;
       });
     }

     async getById(id) {
       return this.tasks.find((task) => task.id === id);
     }

     async update(id, updatedTask) {
       const index = this.tasks.findIndex((task) => task.id === id);
       if (index === -1) return null;
       this.tasks[index] = updatedTask;
       return updatedTask;
     }
   }

   module.exports = TaskRepository;
   ```

4. **Controllers**

   ```javascript
   // src/controllers/TaskController.js
   module.exports = class TaskController {
     constructor({ createTask, getTasks, toggleTaskStatus }) {
       this.createTask = createTask;
       this.getTasks = getTasks;
       this.toggleTaskStatus = toggleTaskStatus;
     }

     async create(req, res) {
       try {
         const task = await this.createTask.execute(req.body);
         res.status(201).json(task);
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }

     async getAll(req, res) {
       try {
         const tasks = await this.getTasks.execute(req.query);
         res.json(tasks);
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
     }

     async toggleStatus(req, res) {
       try {
         const task = await this.toggleTaskStatus.execute(parseInt(req.params.id, 10));
         res.json(task);
       } catch (error) {
         res.status(404).json({ error: error.message });
       }
     }
   };
   ```

5. **Routes**

   ```javascript
   // src/routes/taskRoutes.js
   const express = require('express');
   const TaskController = require('../controllers/TaskController');
   const TaskRepository = require('../repositories/TaskRepository');
   const CreateTask = require('../usecases/CreateTask');
   const GetTasks = require('../usecases/GetTasks');
   const ToggleTaskStatus = require('../usecases/ToggleTaskStatus');
   const db = require('../frameworks/db');

   const router = express.Router();

   const taskRepository = new TaskRepository(db);
   const taskController = new TaskController({
     createTask: new CreateTask(taskRepository),
     getTasks: new GetTasks(taskRepository),
     toggleTaskStatus: new ToggleTaskStatus(taskRepository),
   });

   router.post('/tasks', (req, res) => taskController.create(req, res));
   router.get('/tasks', (req, res) => taskController.getAll(req, res));
   router.patch('/tasks/:id/toggle', (req, res) => taskController.toggleStatus(req, res));

   module.exports = router;
   ```

6. **Frameworks (DataBase)**

```javascript
// src/frameworks/db.js
module.exports = {
  tasks: [], // In-memory data storage for simplicity
};
```

7. **Application Initialization**

This section sets up the **Express.js** application and integrates the routes for the API.

#### Code Implementation: `src/app.js`

```javascript
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Route configuration
app.use('/api', taskRoutes);

module.exports = app;
```

---

8. **Server Setup**

This section starts the server and listens on the specified port.

#### Code Implementation: `src/server.js`

```javascript
const app = require('./app');

// Default port or environment variable
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

## Project Structure

```
src/
├── entities/
│   └── Book.js
├── usecases/
│   ├── AddBook.js
│   ├── BorrowBook.js
│   └── ListBooks.js
├── controllers/
│   └── BookController.js
├── repositories/
│   └── BookRepository.js
├── frameworks/
│   └── db.js
├── routes/
│   └── bookRoutes.js
├── app.js
└── server.js
```

---

## Code Implementation

### 1. **Entities (Core Business Rules)**

**Entity: Book**  
Encapsulates business rules for books.

```javascript
// src/entities/Book.js
class Book {
  constructor(id, title, author, isBorrowed = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isBorrowed = isBorrowed;
  }

  borrow() {
    if (this.isBorrowed) {
      throw new Error('Book is already borrowed');
    }
    this.isBorrowed = true;
  }

  returnBook() {
    if (!this.isBorrowed) {
      throw new Error('Book is not borrowed');
    }
    this.isBorrowed = false;
  }
}

module.exports = Book;
```

---

### 2. **Use Cases (Application Business Rules)**

These handle specific business operations.

#### Add Book Use Case

```javascript
// src/usecases/AddBook.js
module.exports = class AddBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookData) {
    const book = await this.bookRepository.add(bookData);
    return book;
  }
};
```

#### Borrow Book Use Case

```javascript
// src/usecases/BorrowBook.js
module.exports = class BorrowBook {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookId) {
    const book = await this.bookRepository.getById(bookId);
    if (!book) throw new Error('Book not found');

    book.borrow();
    await this.bookRepository.update(bookId, book);
    return book;
  }
};
```

#### List Books Use Case

```javascript
// src/usecases/ListBooks.js
module.exports = class ListBooks {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute() {
    return await this.bookRepository.getAll();
  }
};
```

---

### 3. **Repository (Abstraction for Data Access)**

Handles database interactions.

```javascript
// src/repositories/BookRepository.js
const Book = require('../entities/Book');

class BookRepository {
  constructor(database) {
    this.database = database;
    this.books = database.books || [];
  }

  async add(bookData) {
    const id = this.books.length + 1;
    const book = new Book(id, bookData.title, bookData.author);
    this.books.push(book);
    return book;
  }

  async getAll() {
    return this.books;
  }

  async getById(id) {
    return this.books.find((book) => book.id === id);
  }

  async update(id, updatedBook) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) return null;
    this.books[index] = updatedBook;
    return updatedBook;
  }
}

module.exports = BookRepository;
```

---

### 4. **Controllers (Interface Adapters)**

Manages HTTP requests and responses.

```javascript
// src/controllers/BookController.js
module.exports = class BookController {
  constructor({ addBook, borrowBook, listBooks }) {
    this.addBook = addBook;
    this.borrowBook = borrowBook;
    this.listBooks = listBooks;
  }

  async add(req, res) {
    try {
      const book = await this.addBook.execute(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async borrow(req, res) {
    try {
      const book = await this.borrowBook.execute(parseInt(req.params.id, 10));
      res.json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const books = await this.listBooks.execute();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
```

---

### 5. **Routes**

Defines API endpoints and their handlers.

```javascript
// src/routes/bookRoutes.js
const express = require('express');
const BookController = require('../controllers/BookController');
const BookRepository = require('../repositories/BookRepository');
const AddBook = require('../usecases/AddBook');
const BorrowBook = require('../usecases/BorrowBook');
const ListBooks = require('../usecases/ListBooks');
const db = require('../frameworks/db');

const router = express.Router();

// Dependency Injection
const bookRepository = new BookRepository(db);
const bookController = new BookController({
  addBook: new AddBook(bookRepository),
  borrowBook: new BorrowBook(bookRepository),
  listBooks: new ListBooks(bookRepository),
});

// Routes
router.post('/books', (req, res) => bookController.add(req, res));
router.patch('/books/:id/borrow', (req, res) => bookController.borrow(req, res));
router.get('/books', (req, res) => bookController.list(req, res));

module.exports = router;
```

---

### 6. **Frameworks (Database)**

Implements an in-memory database.

```javascript
// src/frameworks/db.js
module.exports = {
  books: [],
};
```

---

### 7. **Application Initialization**

Initializes Express.js and sets up middleware.

```javascript
// src/app.js
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());
app.use('/api', bookRoutes);

module.exports = app;
```

---

### 8. **Server Setup**

Starts the server.

```javascript
// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---
