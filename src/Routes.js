import React, { useContext } from "react";
import {Routes, Route} from "react-router-dom";
import { Spinner } from "reactstrap";
import { Context } from "./contexts/Context";
import Home from "./routes/Home";
import MealPlan from "./routes/MealPlan";
import LoginForm from "./routes/LoginForm";
import SignupForm from "./routes/SignupForm";
import NotFound from "./routes/NotFound";
import NotAuthorized from "./routes/NotAuthorized";
import "./styles/Routes.css";

const RecipeRoutes = () => {
    const {isLoading} = useContext(Context);

    if(isLoading){
      return ( 
        <div className="Spinner" > 
          <Spinner className="Spinner-inner" /> 
        </div> 
      ); 
    }

    return (
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId/mealplan" element={<MealPlan />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/NotAuthorized" element={<NotAuthorized />} />
            <Route path="/*" element={<NotFound />} /> 
          </Routes>
      </main>
    )
}

export default RecipeRoutes;