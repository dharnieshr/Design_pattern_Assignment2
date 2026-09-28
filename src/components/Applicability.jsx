import React from "react";
import { applicability } from "../data/content.js";

export default function Applicability() {
  return (
    <section id="applicability" className="section">
      <div className="section__inner">
        <span className="section__kicker">05</span>
        <h2 className="section__title">Applicability</h2>
        <p className="section__lede">Reach for Bridge when:</p>
        <ul className="arrow-list">
          {applicability.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
