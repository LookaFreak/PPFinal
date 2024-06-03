import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logos.png";
import { social_media } from "../data/data";

const Footer = ({ dark }) => {
  return (
    <footer className={`${dark ? "bg-dark" : "bg-light"}  footer`}>
      <div className="footer-container">
        <div className="detail text-white">
          <img src={logo} alt="" style={{ width: "4rem", height: "4rem" }} />
          <div className="text-content">
            <span className="title">Palermo Footbal Club SpA</span>
            <p>
              Tax code and VAT number 06804260823{" "}
              <span className="underline">Privacy Policy</span>-
              <span className="underline">Cookie Policy</span>
            </p>
            <p>
              Subject to the management and coordination of the English company
              City Football Group Limited
            </p>

            <p className="copyRight text-white">
              Copyright 2025 palermo FC All rights reserved
            </p>
          </div>
        </div>
        <div className="main">
          <div className="socials">
            {social_media.map((social) => (
              <div className="social-icons text-white">{social.icon}</div>
            ))}
          </div>
          <p className="text-end text-white fw-bold">IM*MEDIA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
