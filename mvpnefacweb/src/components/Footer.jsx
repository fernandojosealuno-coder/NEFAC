import React from "react";
import { footerLinks, footerBottomText } from "../data/globalConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {footerLinks.map((item) => (
          <div
            key={item.label}
            className={`footer-section flex2${item.isCenter ? " center" : ""}${item.isRight ? " right" : ""}`}
          >
            <img src={item.imgSrc} alt={item.altText} />
            <a href={item.href}>{item.label}</a>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>{footerBottomText}</p>
      </div>
    </footer>
  );
}
