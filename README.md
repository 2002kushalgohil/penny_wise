# Penny Wise Documentation

## Introduction

Penny Wise is a personal finance management application designed to help individuals track their financial goals, manage bill reminders, and monitor debts.

## Features

- **User Registration:** Create an account to access Penny Wise's features.
- **User Authentication:** Log in securely using email and password.
- **Financial Goals:** Set and track financial goals with ease.
- **Bill Reminders:** Never miss a payment by setting up reminders.
- **Debts Management:** Keep track of debts and payments.

## Getting Started

For detailed API documentation, refer to the following [Postman Collection](https://documenter.getpostman.com/view/16991699/2sA2xnx9xL).

### Installation

```bash
git clone <repository-url>
cd penny_wise
npm install
```

### Configuration

Create a `.env` file with the following variables:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

Replace `your-mongodb-uri` with your MongoDB connection URI and `your-jwt-secret` with a secret key for JWT.

## Usage

### User Registration

```javascript
// Example registration code
const registerUser = async (email, password) => {
  // Call API to register user
};
```

### User Authentication

```javascript
// Example login code
const loginUser = async (email, password) => {
  // Call API to authenticate user
};
```

### Financial Goals

```javascript
// Example code to create a financial goal
const createFinancialGoal = async (name, targetAmount, targetDate) => {
  // Call API to create financial goal
};
```

### Bill Reminders

```javascript
// Example code to create a bill reminder
const createBillReminder = async (name, dueDate, amount, frequency) => {
  // Call API to create bill reminder
};
```

### Debts Management

```javascript
// Example code to add a debt
const addDebt = async (name, balance, interestRate, minimumPayment) => {
  // Call API to add debt
};
```

## API Reference

For detailed API documentation, refer to the API documentation file.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

Penny Wise is licensed under the GNU GENERAL PUBLIC LICENSE. See the LICENSE file for details.
