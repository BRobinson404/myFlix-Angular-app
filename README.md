# myFlix Angular Client

Welcome to the myFlix Angular Client project. This client-side application is part of the myFlix movie database project and allows users to interact with movie data, including user registration, login, movie listings, and user profiles.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [Dependencies](#dependencies)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction
This Angular application serves as the user interface for the myFlix movie database. It provides a user-friendly interface for users to register, log in, browse movies, view movie details, and manage their profiles.

## Features
- User Registration: Users can sign up for a new account with a username, password, email, and birthday.
- User Login: Registered users can log in to their accounts.
- Movie Listings: Users can browse a list of available movies.
- Movie Details: Users can view detailed information about a selected movie, including genre, director, and synopsis.
- Favorites: Users can add and remove movies from their list of favorite movies.
- User Profile: Users can view and update their profile information.

## Getting Started
To get started with the myFlix Angular Client, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Start the development server with `ng serve`.
4. Open your browser and navigate to `http://localhost:4200/` to access the application.

## Usage
### Welcome Page
The application starts with a welcome page where users can choose to sign up or log in.

### User Registration
Users can register for an account by providing a username, password, email, and birthday.

### User Login
Registered users can log in with their username and password.

### Movie Listings
Users can browse a list of available movies. Each movie card displays the movie title, director, and options to view genre, director, and synopsis details.

### Favorites
Users can add and remove movies from their list of favorite movies.

### User Profile
Users can view their profile information, including their username and email. They can also update their username, password, and email.

## Folder Structure
- `src/app/components`: Contains Angular components for different sections of the application.
- `src/app/services`: Includes Angular services for making API requests and managing user data.
- `src/assets`: Stores static assets such as images.

## Dependencies
- Angular
- Angular Material
- RxJS
- TypeScript
- Other dependencies as specified in the `package.json` file.

## Contributing
Contributions to this project are welcome. Please follow the standard GitHub flow:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push your branch to your fork.
5. Create a pull request against the main repository.

## License
This project is licensed under the [MIT License](LICENSE).
