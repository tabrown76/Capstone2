import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

/**
 * NotAuthorized component that displays a message when the user is not authorized to view a route.
 * 
 * @component
 * @example
 * return (
 *   <NotAuthorized />
 * )
 */
function NotAuthorized() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
                Hmmm. I can't let you see that.
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotAuthorized;