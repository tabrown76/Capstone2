import React, { useContext } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

function NotFound() {
  const navigate = useNavigate();
  const { tooManyFilters } = useContext(Context);

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            {
              tooManyFilters ?
              `Please change your filters and try again.` :
              `Hmmm. I can't seem to find what you want.`
            }   
          </CardTitle>
          <Button className="Button not-found" onClick={() => navigate(-1)}>Back</Button>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;