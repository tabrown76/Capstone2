import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import SearchBar from "../home-components/SearchBar";
import RecipeModal from "../home-components/RecipeModal";
import { Context } from "../contexts/Context";
import { APIContext } from "../contexts/APIContext";
import HealthOptions from "../home-components/HealthOptions";
import "../styles/Home.css";
import CarouselBackground from "../home-components/Carousel";

/**
 * Home component that serves as the main landing page of the application.
 * It provides functionality for searching recipes and includes conditional rendering based on user authentication status.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => {
  const { user, apiTest } = useContext(Context); 
  const { isModalVisible } = useContext(APIContext); 

  return (
    <div className="home-container">
      <CarouselBackground />
      <section className="col-md-8 content-section">
        <Card className="Home-card">
          <CardBody className="text-center">
            <CardTitle className="CardTitle">
              Find new recipes! Maybe even make them...
            </CardTitle>
            {user && user.firstName ? 
              (<div>
                <CardSubtitle className="CardSubtitle">
                  Search for specific ingredients to find your next meal idea!
                </CardSubtitle>
                <h6>Choose Health Options:</h6>
                <HealthOptions />
              </div>)
              :
              (<CardSubtitle className="CardSubtitle">
                Sign up to filter results, create meal plans, and more!
              </CardSubtitle>)
            }
            <>
              <SearchBar />
            </>
          </CardBody>
        </Card>
        {isModalVisible && <RecipeModal />}
      </section>
    </div>
  )
}

export default Home;