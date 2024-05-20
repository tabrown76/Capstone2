Meal Planner App
Overview

The Meal Planner App is a web application that helps users plan their meals for the week. Users can search for recipes, add them to their meal plan, and customize their weekly meal schedule. The app uses React for the frontend, DnD Kit for drag-and-drop functionality, and communicates with the Edamam API for recipe data.
Features

    User Authentication: Users can sign up and log in using Google OAuth or through a traditional email and password method.
    Recipe Search: Search for recipes using various filters like cuisine type and health options.
    Meal Planning: Drag and drop recipes to customize the weekly meal plan.
    Responsive Design: Optimized for both desktop and mobile views.

Technologies Used

    Frontend: React, React Router, Reactstrap, DnD Kit
    Backend API: Edamam API
    Authentication: Google OAuth
    Styling: CSS, Bootstrap

Getting Started
Prerequisites

    Node.js
    npm (or yarn)
    Edamam API credentials

Installation

    Clone the repository:


git clone https://github.com/your-username/meal-planner-app.git
cd meal-planner-app

Install dependencies:

npm install

Create a .env file in the root directory and add your Edamam API credentials:

makefile

REACT_APP_APP_ID=your-edamam-app-id
REACT_APP_APP_KEY=your-edamam-app-key
REACT_APP_GOOGLE_APP_ID=your-google-client-id

Start the development server:

    npm start

    Open your browser and navigate to http://localhost:3000.

Project Structure

css

meal-planner-app/
├── public/
├── src/
│   ├── components/
│   │   ├── CalendarCard.js
│   │   ├── CalendarView.js
│   │   ├── HealthOptionCheckbox.js
│   │   ├── HealthOptions.js
│   │   ├── RecipeCard.js
│   │   ├── RecipeList.js
│   │   ├── RecipeModal.js
│   │   ├── RecipeReceiver.js
│   │   ├── SearchBar.js
│   ├── contexts/
│   │   ├── APIContext.js
│   │   ├── Context.js
│   │   ├── MealContext.js
│   ├── helpers/
│   │   ├── constants.js
│   │   ├── CustomPointerSensor.js
│   ├── routes/
│   │   ├── Home.js
│   │   ├── LoginForm.js
│   │   ├── MealPlan.js
│   │   ├── NotAuthorized.js
│   │   ├── NotFound.js
│   │   ├── SignupForm.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── CalendarCard.css
│   │   ├── Carousel.css
│   │   ├── Forms.css
│   │   ├── HealthOptions.css
│   │   ├── MealPlanner.css
│   │   ├── Nav.css
│   │   ├── RecipeCard.css
│   │   ├── RecipeModal.css
│   │   ├── SearchBar.css
│   ├── App.js
│   ├── Nav.js
│   ├── Routes.js
│   ├── index.js
│   ├── Api.js
└── .env

Usage

    Sign Up: Create a new account using the signup form or Google OAuth.
    Log In: Log in to your account.
    Search Recipes: Use the search bar to find recipes.
    Add to Meal Plan: Drag recipes to the calendar to plan your meals.
    Customize Meal Plan: Adjust your meal plan by dragging and dropping recipes within the calendar.

Contributing

    Fork the repository.
    Create a new branch (git checkout -b feature-branch).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-branch).
    Create a new Pull Request.

License

This project is licensed under the MIT License.
Acknowledgements

    Edamam API
    DnD Kit
    React
    Reactstrap
    Google OAuth

Contact

For any inquiries or issues, please open a GitHub issue or contact the project maintainer at tabrown76@gmail.com.