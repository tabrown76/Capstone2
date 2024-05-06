import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import SearchBar from "../SearchBar";
import RecipeModal from "../RecipeModal";
import { Context } from "../Context";
import HealthOptions from "../HealthOptions";
import "../styles/Home.css";
import CarouselBackground from "../Carousel";

const Home = () => {
  const { isModalVisible, user, apiTest } = useContext(Context); 

  return (
    <div className="home-container">
      <CarouselBackground />
      <section className="col-md-8 content-section">
        <Card className="Home-card">
          <CardBody className="text-center">
            <CardTitle className="CardTitle">
              Find new recipes! Maybe even make them...
            </CardTitle>
            {user === null ? (<CardSubtitle className="CardSubtitle">
              Sign up to filter results, create meal plans, and more!
            </CardSubtitle>)
            :
            (<div>
              <CardSubtitle className="CardSubtitle">
              Find a new twist for an old favorite, or try something completely new!
              </CardSubtitle>
              <h6>Choose Health Options:</h6>
              <HealthOptions />
            </div>)}
            <>
              <SearchBar />
              <Button onClick={() => apiTest()}>Test</Button>          
            </>
          </CardBody>
        </Card>
        {isModalVisible && <RecipeModal />}
      </section>
    </div>
  )
}

export default Home;