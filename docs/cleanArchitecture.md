
# Clean Code Architecture for E-Commerce Backend

## Overview of Clean Code Architecture

Clean Code Architecture, also known as Clean Architecture, is a software design approach proposed by Robert C. Martin (Uncle Bob). It emphasizes the separation of concerns and the independence of different layers in a system, making it easier to modify and extend the software over time. The main goal is to produce maintainable, scalable, and testable software systems.

![Clean Code Architecture](https://github.com/user-attachments/assets/ae18b2a2-7923-498d-a80f-1e0035f17ce6)



### Layers of Clean Architecture:

1. **Domain Layer**
    - The innermost layer of the architecture, containing core business logic and entities of the application. This layer represents the heart of the application and is where business rules are defined.
   
2. **Application Layer**
    - Acts as an intermediary between the Domain Layer and Presentation Layer. It contains application-specific use cases and orchestrates the flow of data between the Domain Layer and external interfaces.
   
3. **Presentation Layer**
    - Responsible for handling user interactions and displaying information to the user. It interacts with the Application Layer to fetch necessary data and present it to the user.
   
4. **Data Layer**
    - Handles data access and storage. It includes database interactions or any mechanism used to retrieve and persist data. This layer communicates with the Application Layer to fetch or store data based on the application’s requirements.

### Key Benefits:
- **Modularity**: Components can be developed, tested, and replaced independently.
- **Testability**: Layers can be tested independently using unit tests or integration tests.
- **Maintainability**: Changes to one layer (e.g., replacing a database) do not affect other layers.
  


Here is the file structure you requested in a `.md` format:

```markdown
# E-commerce Backend Clean Code Architecture

## File Structure

``` bash
ecommerce-backend/
├── src/
│   ├── config/                   # Configuration files
│   │   ├── database.js           # Database connection setup
│   │   └── env.js                # Environment variables handler
│   ├── data/                     # Data Layer
│   │   ├── models/               # Database models
│   │   │   ├── ProductModel.js   # Product schema/model
│   │   │   ├── UserModel.js      # User schema/model
│   │   │   └── CartModel.js      # Cart schema/model
│   │   └── repositories/         # Repositories (data access logic)
│   │       ├── ProductRepository.js
│   │       ├── UserRepository.js
│   │       └── CartRepository.js
│   ├── domain/                   # Domain Layer
│   │   ├── entities/             # Core business entities
│   │   │   ├── Product.js        # Product entity
│   │   │   ├── User.js           # User entity
│   │   │   └── Cart.js           # Cart entity
│   │   └── services/             # Business logic services
│   │       ├── InventoryService.js # Handles inventory-related logic
│   │       └── PaymentService.js   # Handles payment-related logic
│   ├── application/              # Application Layer
│   │   └── usecases/             # Application-specific workflows
│   │       ├── AddToCart.js      # Adds an item to the cart
│   │       ├── PlaceOrder.js     # Places an order
│   │       └── RegisterUser.js   # Registers a new user
│   ├── presentation/             # Presentation Layer
│   │   ├── controllers/          # Handles HTTP requests
│   │   │   ├── CartController.js # Manages cart operations
│   │   │   ├── ProductController.js # Manages product operations
│   │   │   └── UserController.js # Manages user operations
│   │   ├── middleware/           # Middleware for validation, auth, etc.
│   │   │   ├── authMiddleware.js # Auth-related middleware
│   │   │   ├── validateRequest.js # Request validation middleware
│   │   └── routes/               # API route definitions
│   │       ├── CartRoutes.js     # Routes for cart operations
│   │       ├── ProductRoutes.js  # Routes for product operations
│   │       └── UserRoutes.js     # Routes for user operations
│   ├── utils/                    # Utility functions
│   │   ├── errorHandler.js       # Error handling utilities
│   │   └── logger.js             # Logging utilities
│   └── index.js                  # Application entry point
├── tests/                        # Automated tests
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
├── .env                          # Environment variables
├── package.json                  # Project metadata and dependencies
└── README.md                     # Documentation
```

---

## Detailed Explanation of File Structure

### 1. `src/config/` - Configuration Files

This folder contains all the configuration files required for the application to work, such as connecting to the database or loading environment variables.

**Files in `src/config/`:**
- `database.js`: Handles database connection setup, like connecting to MongoDB using Mongoose.

```js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

- `env.js`: Centralizes access to environment variables for easier maintainability.

```js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
};
```

---

### 2. `src/data/` - Data Layer

The Data Layer handles communication with the database and external services.

#### `models/` - Database Models
Defines database schemas using Mongoose, Sequelize, or any ORM. Each model represents a table/collection in the database.

**Example: `ProductModel.js`**
```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
```

#### `repositories/` - Repositories
Repositories abstract database interactions, making the code more testable and clean. They encapsulate CRUD operations.

**Example: `ProductRepository.js`**
```js
const Product = require('../models/ProductModel');

const getProductById = async (id) => Product.findById(id);
const updateStock = async (id, quantity) =>
    Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } });

module.exports = { getProductById, updateStock };
```

---

### 3. `src/domain/` - Domain Layer

The Domain Layer is where the core business logic and rules of the application live. It contains the entities and services needed for the system to function.

#### `entities/` - Core Business Entities
Defines core objects and their behaviors. These are plain JavaScript classes, not tied to any framework.

**Example: `Cart.js`**
```js
class Cart {
    constructor(userId) {
        this.userId = userId;
        this.items = [];
    }

    addItem(product, quantity) {
        if (quantity > product.stock) {
            throw new Error('Not enough stock available');
        }
        const itemIndex = this.items.findIndex(item => item.productId === product.id);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity += quantity;
        } else {
            this.items.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
            });
        }
    }
}

module.exports = Cart;
```

#### `services/` - Business Logic Services
Implements business logic that doesn’t fit into entities.

**Example: `InventoryService.js`**
```js
const { getProductById } = require('../data/repositories/ProductRepository');

const checkStock = async (productId, quantity) => {
    const product = await getProductById(productId);
    if (!product || product.stock < quantity) {
        throw new Error('Insufficient stock');
    }
    return true;
};

module.exports = { checkStock };
```

---

### 4. `src/application/` - Application Layer

The Application Layer orchestrates workflows (use cases). It coordinates between the domain layer and data layer to fulfill specific operations.

#### `usecases/` - Application-Specific Workflows
Implements high-level application workflows like "Add an item to the cart" or "Place an order."

**Example: `AddToCart.js`**
```js
const { getProductById } = require('../../data/repositories/ProductRepository');
const { updateCart } = require('../../data/repositories/CartRepository');
const Cart = require('../../domain/entities/Cart');

const addToCart = async (userId, productId, quantity) => {
    const product = await getProductById(productId);
    if (!product) throw new Error('Product not found');
    
    const cart = new Cart(userId); // Create or retrieve user's cart
    cart.addItem(product, quantity); // Add the product to the cart
    
    await updateCart(userId, cart); // Save cart in the repository
    return cart; // Return updated cart
};

module.exports = { addToCart };
```

---

### 5. `src/presentation/` - Presentation Layer

The Presentation Layer handles communication with the client, such as HTTP requests and responses. It includes routes, controllers, and middleware.

#### `routes/` - API Route Definitions
Defines the API endpoints and maps them to controllers.

**Example: `CartRoutes.js`**
```js
const express = require('express');
const { addItemToCart } = require('../controllers/CartController');
const router = express.Router();

router.post('/cart/add', addItemToCart); // Map route to controller action

module.exports = router;
```

#### `controllers/` - Handle HTTP Requests
Receives HTTP requests, validates input, and calls the appropriate use case.

**Example: `CartController.js`**
```js
const { addToCart } = require('../../application/usecases/AddToCart');

const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const updatedCart = await addToCart(userId, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { addItemToCart };
```

#### `

middleware/` - Middleware for Validation, Authentication, etc.

---

### 6. `tests/` - Automated Tests

Organized into:
- **Unit Tests**: For individual components like Cart or ProductRepository.
- **Integration Tests**: Tests workflows across layers.

---

## Code Flow Example: Add to Cart

1. The route receives the request and sends it to the controller.
2. The controller calls the `AddToCart` use case.
3. The use case retrieves product data using `ProductRepository`.
4. The domain entity (`Cart`) processes business logic.
5. `CartRepository` saves changes to the database.
6. The response is returned to the client.

---

## Benefits of this Structure:
- **Separation of Concerns**: Each layer handles its responsibility.
- **Scalability**: Easy to add features or layers.
- **Testability**: Layers can be independently tested.
```

This file structure is designed to keep each part of the system isolated, which increases maintainability and testability.

