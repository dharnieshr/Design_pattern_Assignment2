import React from "react";
import { collaboration } from "../data/content.js";

export default function Collaboration() {
  return (
    <section id="collaboration" className="section section--tight">
      <div className="section__inner">
        <span className="section__kicker">08</span>
        <h2 className="section__title">Collaboration</h2>
        <p className="section__lede">{collaboration}</p>
      </div>
    </section>
  );
}
