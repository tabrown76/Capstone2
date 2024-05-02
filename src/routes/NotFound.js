import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
                Hmmm. I can't seem to find what you want.
          </CardTitle>
          <Button className="Button not-found" onClick={() => navigate(-1)}>Back</Button>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;