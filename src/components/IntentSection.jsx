import React from "react";
import { intent } from "../data/content.js";

export default function IntentSection() {
  return (
    <section id="intent" className="section section--tight">
      <div className="section__inner">
        <span className="section__kicker">02</span>
        <h2 className="section__title">Intent</h2>
        <p className="section__lede">{intent}</p>
      </div>
    </section>
  );
}
