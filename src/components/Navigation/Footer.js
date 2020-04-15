import React from "react";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-contact-container">
        <div className="footer-logo-container">
          <ContactSupportOutlinedIcon id="footer-logo"/>
        </div>
        <div className="footer-contact-text">
          For questions please contact: <a href="mailto:blumaa@gmail.com">blumaa@gmail.com</a>
        </div>
      </div>
      <div id="footer-copyright-text">
        Copyright &copy; 2020 Aaron Blum. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
