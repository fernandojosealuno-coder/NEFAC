import React from "react";
import { footerLinks, footerBottomText } from "../data/globalConfig";

export default function Footer() {
  const base = import.meta.env.BASE_URL || "/";

  function resolveSrc(src) {
    if (!src) return src;
    // remove leading slash se houver e prefixa com base
    return `${base}${src.replace(/^\//, "")}`;
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        {footerLinks.map((item) => (
          <div
            key={item.label}
            className={`footer-section flex2${item.isCenter ? " center" : ""}${item.isRight ? " right" : ""}`}
          >
            <img src={resolveSrc(item.imgSrc)} alt={item.altText} />
            <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>{footerBottomText}</p>
      </div>
    </footer>
  );
}