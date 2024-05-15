import React from "react";
import {BrowserRouter} from "react-router-dom";
import RecipeNav from "./Nav";
import { ContextProvider } from "./Context";
import { APIContextProvider } from "./APIContext";
import RecipeRoutes from "./Routes";
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <APIContextProvider>
          <RecipeNav />      
          <RecipeRoutes />
        </APIContextProvider>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App;
