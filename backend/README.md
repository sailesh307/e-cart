# E-Cart Backend

This is the backend server for the E-Cart e-commerce application. It provides the API endpoints and handles database operations for the application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these steps to set up the backend server locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm (Node Package Manager) or yarn
- MongoDB (Make sure it's running locally or adjust the `MONGODB_URI` in the `.env` file accordingly)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sailesh307/e-cart.git
    ```
2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Install the dependencies:**

   ```bash
   yarn install
   ```

4. **Create a `.env` file in the root directory and add the following environment variables:**

   ```bash
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
   example: 
   ```bash
    MONGODB_URI=mongodb://localhost:27017/e-cart
    JWT_SECRET=secret
    ```
    **Note:** The `JWT_SECRET` can be any string of your choice.

5. **Start the server:**

   ```bash
    yarn start
    ```
    The server should now be running on `http://localhost:5000`.

## API Endpoints
- `api/users` : User-related endpoints 
    - `POST /api/users/register`: Register a new user
    - `POST /api/users/login`: Login an existing user
    - `GET /api/users/profile`: Get the profile of the currently logged in user


# Contributing
Contributions are welcome! Feel free to open issues or pull requests for any improvements or features you'd like to add.

# License

