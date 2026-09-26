Movie DB 

A backend application built with Node.js, Express.js, and MongoDB for managing users, movies, favorites, and reviews.

Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JavaScript
Features
User Management
User registration and login
Update user information
Delete user
Manage favorite movies
Retrieve favorite movies
Movie Management
Add movies
Retrieve all movies
Retrieve a movie by ID
Retrieve movies created by a user
Update movies
Delete movies
Movie Search
Search movies by title
Search movies by director
Search movies by genre
Search movies by rating
Search movies by release year
Search using multiple filters together
Case-insensitive text search
Pagination support
Review Management
Add movie reviews
Retrieve reviews by ID
Retrieve reviews by user
Retrieve reviews by movie
Update reviews
Delete reviews
Validation & Error Handling
Request validation
Rating validation
Release year validation
User, movie, and review existence checks
Appropriate HTTP status codes
Error handling for invalid requests and missing resources
Search & Filtering

The project supports both individual and combined movie filtering.

Multiple filters can be used together, allowing movies to be searched using combinations of:

Title • Director • Genre • Rating • Release Year

Text-based searches support case-insensitive matching, while pagination helps control the number of results returned.

Testing

The application has been tested using Postman, including:

CRUD operations
Search and filtering
Combined filters
Pagination
Input validation
Invalid and boundary cases
Project Purpose

This project was built to practice and understand backend development concepts including:

RESTful backend development
Express.js routing
MongoDB and Mongoose
CRUD operations
Data validation
Middleware
Search and filtering
Pagination
Error handling
