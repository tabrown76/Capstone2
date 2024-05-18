import React from "react";
import {BrowserRouter} from "react-router-dom";
import { ContextProvider } from "./contexts/Context";
import { APIContextProvider } from "./contexts/APIContext";
import { MealContextProvider } from "./contexts/MealContext";
import RecipeNav from "./Nav";
import RecipeRoutes from "./Routes";
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <APIContextProvider>
          <MealContextProvider>
            <RecipeNav />      
            <RecipeRoutes />
          </MealContextProvider>
        </APIContextProvider>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App;
