import React from "react";
import "../assets/css/unathorized.css";

type UnAuthorizedProps = {};

const UnAuthorized = (props: UnAuthorizedProps) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>401 UnAuthorized</h2>
              <div className="error-details">
                Sorry, an error has occured, Requested page not not available
                for you!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnAuthorized;
