import React from "react";
import { relatedPatterns } from "../data/content.js";

export default function RelatedPatterns() {
  return (
    <section id="related-patterns" className="section section--tight">
      <div className="section__inner section__inner--wide">
        <span className="section__kicker">13</span>
        <h2 className="section__title">Related Patterns</h2>

        <div className="related-grid">
          {relatedPatterns.map((r) => (
            <div className="related-card" key={r.name}>
              <h4>{r.name}</h4>
              <p>{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
