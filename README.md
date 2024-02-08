# NestJS Prisma Postgres React Authentication

This project is a full-stack application that demonstrates an authentication system using NestJS, Prisma, PostgreSQL for the backend, and React for the frontend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional, if you're running PostgreSQL in a Docker container)

### Backend Setup

To set up the backend, follow these steps:

1. **Navigate to the Backend Directory**

    ```bash
    cd back/authenticate
    ```

2. **Create .env File**

    Create a `.env` file in the `authenticate` directory and copy the following content into it:

    ```plaintext
    # .env file content
    DATABASE_URL="postgresql://roni:123@localhost:5436/project_db"
    ```

    Make sure to adjust the `DATABASE_URL` according to your PostgreSQL setup.

3. **Install Dependencies and Start the Backend**

    Run the following commands to install dependencies, generate Prisma client, and start the backend server:

    ```bash
    npx prisma generate
    npm install
    npm run start
    ```

### Frontend Setup

To set up the frontend, follow these steps:

1. **Navigate to the Frontend Directory**

    ```bash
    cd front/my-app
    ```

2. **Install Dependencies and Start the Frontend**

    Run the following commands to install dependencies and start the frontend application:

    ```bash
    npm install
    npm run start
    ```

## Usage

Once both the backend and frontend are running, you can access the frontend application in your browser at `http://localhost:3000` (or whichever port your frontend server is using).

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
