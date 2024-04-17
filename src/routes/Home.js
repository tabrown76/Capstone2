import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import SearchBar from "../SearchBar";
import RecipeModal from "../RecipeModal";
import { Context } from "../Context";
import "../styles/Home.css";
import CarouselBackground from "../Carousel";

const Home = () => {
  const navigate = useNavigate();
  const { isModalVisible } = useContext(Context); 

  return (
    <div className="home-container">
      <CarouselBackground />
      <section className="col-md-8 content-section">
        <Card className="Home-card">
          <CardBody className="text-center">
            <CardTitle className="CardTitle">
              Find new recipes! Maybe even make them...
            </CardTitle>
            <CardSubtitle className="CardSubtitle">
              Sign up to filter results, create meal plans, and more!
            </CardSubtitle>
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