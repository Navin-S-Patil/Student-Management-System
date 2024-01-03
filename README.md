# Student Management System

## Overview

Welcome to the documentation for the **Student Management System** API. This guide provides essential information to get started with the API.

## API URL

The base URL for the API is: `http://localhost:5000/api/`

## API Documentation

Explore the API using Postman. The detailed documentation is available at: [API Documentation](https://documenter.getpostman.com/view/28773422/2s9YsFEEeU)

## Getting Started

### Prerequisites

Before you start, make sure you have the following:

- Node.js installed
- Postman account for detailed API exploration

### Environment Variables

The application uses the following environment variables:

- `PORT`: The port on which the server will run. (e.g., 5000)
- `MONGO_URL_local`: The MongoDB connection URL for the local database. (e.g., mongodb://0.0.0.0:27017/students_Management)
- `JWT_SECRET`: Secret key used for JWT (JSON Web Token) generation and validation. (e.g., navin)
- `NODE_ENV`: Environment mode indicator (e.g., 'development', 'production'). Determines the application's behavior.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Navin-S-Patil/Student-Management-System.git
   ```

2. Install dependencies
   ```bash
   cd Student-Management-System
   npm install
   ```

3. Set up your environment variables
   - Create a `.env` file in the root directory
   - Add your environment variables with their corresponding values
     ```env
     PORT=your_value_1
     MONGO_URL_local=your_value_2
     JWT_SECRET=your_value_3
     NODE_ENV=your_value_4
     ```

4. Start the application
   ```bash
   npm start
   ```

## Usage

1. Replace placeholders in the `.env` file with your actual values.
2. Explore the API using the provided [documentation](https://documenter.getpostman.com/view/28773422/2s9YsFEEeU).

## Issues

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/Navin-S-Patil/Student-Management-System.git/issues).

## Contributions

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this template based on your specific project details. Let me know if you need further adjustments!