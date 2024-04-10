import React from "react";
import {BrowserRouter} from "react-router-dom";
import RecipeNav from "./Nav";
import { ContextProvider } from "./Context";
import RecipeRoutes from "./Routes";
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <RecipeNav />      
        <RecipeRoutes />
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App;
