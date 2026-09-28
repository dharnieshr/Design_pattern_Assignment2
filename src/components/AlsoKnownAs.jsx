import React from "react";
import { alsoKnownAs } from "../data/content.js";

export default function AlsoKnownAs() {
  return (
    <section id="also-known-as" className="section section--tight">
      <div className="section__inner">
        <span className="section__kicker">03</span>
        <h2 className="section__title">Also Known As</h2>
        <p className="section__lede">{alsoKnownAs}</p>
      </div>
    </section>
  );
}
