import React from "react";
import { consequences } from "../data/content.js";

export default function Consequences() {
  return (
    <section id="consequences" className="section">
      <div className="section__inner">
        <span className="section__kicker">09</span>
        <h2 className="section__title">Consequences</h2>

        <div className="tradeoffs">
          <div className="good">
            <h3>Gains</h3>
            <ul>
              {consequences.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="bad">
            <h3>Costs</h3>
            <ul>
              {consequences.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
