import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import Logo from "../App/images/logo";

function NonAuthNavigation() {
  return (
    <div className="navbar">
      <div className="navbar-button">
        <div className="navbar-left">
          <Link to={routes.HOME}>HOME</Link>
        </div>
      </div>
      <div id="navbar-header">
        <div className="navbar-logo">
          <Logo />
        </div>
        <div className="navbar-title">TP REPORT</div>
      </div>
      <div className="navbar-button">
        <div className="navbar-right">
          {/* <Link to={routes.SIGN_UP}>SIGN UP</Link> */}
        </div>
      </div>
    </div>
  );
}

export default NonAuthNavigation;
