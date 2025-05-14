
# Restaurant Management System

A comprehensive backend application designed to streamline restaurant operations, including menu management, order processing, reservations, and staff administration. Built with Node.js, Express.js, and Sequelize, this system emphasizes modularity, scalability, and maintainability.

## Features

* **User Authentication:** Secure login and registration using JWT.
* **Menu Management:** Create, update, and delete menu items.
* **Order Processing:** Handle customer orders with real-time status updates.
* **Reservation System:** Manage table bookings efficiently.
* **Employee Management:** Add, edit, and remove employee records.
* **Role-Based Access Control:** Differentiate access levels between admins and staff.
* **API-First Architecture:** RESTful API design for seamless integration with front-end applications.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MySQL (via Sequelize ORM)
* **Authentication:** JSON Web Tokens (JWT)
* **Validation:** Joi
* **Environment Management:** dotenv
* **Logging:** Morgan
* **Security:** Helmet, CORS

## Project Structure

```
restaurant-management-system/
├── config/             # Database configuration
├── controllers/        # Route handlers
├── middlewares/        # Custom middleware functions
├── migrations/         # Sequelize migrations
├── models/             # Sequelize models
├── routes/             # API endpoints
├── seeders/            # Sequelize seeders
├── utils/              # Utility functions
├── .env                # Environment variables
├── index.js            # Entry point
└── package.json        # Project metadata and dependencies
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/houssamWaked/Restaurant-Management-System-.git
   cd Restaurant-Management-System-
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Configure the database:**

   Update the `config/config.json` file with your database credentials.

5. **Run migrations and seeders:**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

6. **Run the application:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login and receive a JWT

### Menu

* `GET /api/menu` - Retrieve all menu items
* `POST /api/menu` - Add a new menu item
* `PUT /api/menu/:id` - Update a menu item
* `DELETE /api/menu/:id` - Delete a menu item

### Orders

* `GET /api/orders` - Retrieve all orders
* `POST /api/orders` - Create a new order
* `PUT /api/orders/:id` - Update an order
* `DELETE /api/orders/:id` - Delete an order

### Reservations

* `GET /api/reservations` - Retrieve all reservations
* `POST /api/reservations` - Create a new reservation
* `PUT /api/reservations/:id` - Update a reservation
* `DELETE /api/reservations/:id` - Cancel a reservation

### Employees

* `GET /api/employees` - Retrieve all employees
* `POST /api/employees` - Add a new employee
* `PUT /api/employees/:id` - Update employee details
* `DELETE /api/employees/:id` - Remove an employee

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


