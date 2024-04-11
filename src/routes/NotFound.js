import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

function NotFound() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
                Hmmm. I can't seem to find what you want.
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;