# Hotel Application

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running Tests](#running-tests)
- [Usage](#usage)
- [Contributing](#contributing)

## Project Overview
This hotel application allows users to search for hotels, view details, and make reservations. It provides a modern, user-friendly interface and robust backend services. Built with React and TypeScript, the application is designed to be scalable and maintainable.

## Technologies Used
- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, enabling static type checking.
  - **reactQuery**: A powerful data querying tool that enhances performance and flexibility in handling data requests.
  
- **Backend**:
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express**: A web application framework for Node.js to build APIs.
  - **MongoDB**: A NoSQL database for storing application data.

- **Testing**:
  - **Playwright**: An end-to-end testing framework that enables automated testing across different browsers.

## Features
- **User Authentication**: Secure login and registration for users.
- **Hotel Search**: Users can search for hotels based on location, date, and price range.
- **Booking Management**: Users can view, create, and cancel bookings.
- **Admin Panel**: An interface for hotel administrators to manage listings and reservations.
- **Responsive Design**: Mobile-friendly UI that adjusts to different screen sizes.

## Architecture
The architecture follows a client-server model:
- The frontend communicates with the backend through RESTful API endpoints.
- The backend interacts with the MongoDB database to perform CRUD operations.
- Playwright is integrated to run automated tests, ensuring the application behaves as expected.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/CoolSubash/Hotel-APP
   cd Hotel-App
