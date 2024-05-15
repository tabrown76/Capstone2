import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import SearchBar from "../SearchBar";
import RecipeModal from "../RecipeModal";
import { Context } from "../Context";
import { APIContext } from "../APIContext";
import HealthOptions from "../HealthOptions";
import "../styles/Home.css";
import CarouselBackground from "../Carousel";

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