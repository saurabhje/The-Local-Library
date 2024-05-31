# The Local Library

## Overview

The Local Library is a simple Node.js Express application designed to manage books in a library. It follows the MVC (Model-View-Controller) architecture and utilizes the Pug templating engine to serve views.

## Project Structure

```
|-- TheLocalLibrary
    |-- controllers
    |
    |-- models
    |   |-- book.js
    |   |-- bookinstance.js
    |   |-- genre.js
    |   |-- user.js
    |   |-- author.js
    |-- public
    |   |-- stylesheets
    |       |-- style.css
    |-- routes
    |   |-- index.js
    |   |-- catalog.js
    |   |-- user.js
    |-- views
    |
    |-- app.js
```

### Explanation

- **controllers**: Contains the controllers for handling book, genre and author-related logic.
- **models**: Defines the Mongoose models for books, authors, genres, users.
- **public**: Holds static files such as stylesheets.
- **routes**: Defines the routes for different parts of the application (index, catalog, author).
- **views**: Contains Pug templates for rendering different pages.
- **app.js**: The main entry point for the application.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/The-Local-Library.git
   ```

2. Navigate to the project directory:

   ```bash
   cd The-Local-Library
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Dependencies

- Express.js
- Mongoose
- Pug

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Please follow the established coding conventions and practices.
