import React from "react";
import icon from "../icon/sprite.svg";

const Footer = () => {
  const social = ["#icon-instagram", "#icon-linkedin", "#icon-github"];
  const href = ['https://www.instagram.com/useinakbarr/', 'https://id.linkedin.com/in/usein-akbar-896379206', 'https://github.com/useinakbar']

  return (
    <footer className="footer">
      <h3 className="footer__text">crafted with ❤️ in Jakarta</h3>
      <div className="footer__icon-container">
        {social.map((item, i) => {
          return (
            <a href={href[i]} className="footer__icon-link" key={i}>
              <svg className="footer__icon">
                <use xlinkHref={`${icon}${item}`}></use>
              </svg>
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
