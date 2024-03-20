# Masai Library Service Backend Documentation
## Problem Statement:

The task is to create backend for a  Masai Library is a comprehensive collection of resources designed to support your learning journey in the field of computer science and software engineering.
deployed backend : [Live Link](https://masai-library-18ky.onrender.com/)
<br>

 ## Tech Stack
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**

## Register User
**POST /api/register**
This endpoint is used to register a new user.

## Login User
**POST /api/login**
This endpoint is used to log in users.

## GET Books
**GET /api/books**
This endpoint should return a list of all available books. 

## Retrieve Books by ID 

**GET /api/books/:id**
This endpoint should return the details of a specific book identified by its ID.

## Retrieve Books by category

**GET /api/books?category=fiction**

This endpoint should give only those books whose category is fiction. (Should work with all the categories, not just fiction)

## Retrieve Books Author and Category
**GET /api/books?author=corey&category=fiction

This endpoint should give only those books whose author is corey and the category is fiction. (Should work for all combinations)

### Query Params
- id: `books_id`
- id: `orders_id`

## Add Menu Item to Books
**POST /api/books**
This endpoint should allow admin to add new books to the system. (Protected Route)

## Add Menu Item to Books
**PATCH /api/books/:id**
This endpoint should allow admin to update the details of a specific book identified by its ID. (Protected Route)

## Delete Menu Item from books
**DELETE /api/books/:id**
This endpoint should allow admin to delete a specific book identified by its ID. (Protected Route)

### Request Params
- id: `books_id`
- itemId: `orders_id`

## Add Order
**POST /api/orders**
This endpoint should allow the customer to place an order for a list of books. (Protected Route)

## Update Order Status
**GET /api/orders**
This endpoint should allow admin to view all the orders placed so far with the user and book details. Populate both user and book data, and not just id’s. (Protected Route)

