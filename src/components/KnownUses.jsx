import React from "react";
import { knownUses } from "../data/content.js";

export default function KnownUses() {
  return (
    <section id="known-uses" className="section">
      <div className="section__inner">
        <span className="section__kicker">12</span>
        <h2 className="section__title">Known Uses</h2>
        <p className="section__lede">
          Each row is an abstraction on the left delegating to a family of
          implementors on the right.
        </p>

        <div className="spec-list">
          {knownUses.map((ex) => (
            <div className="spec-row" key={ex.abstraction}>
              <div className="spec-row__abstraction">
                {ex.abstraction}
                <span>{ex.note}</span>
              </div>
              <div className="spec-row__implementation">{ex.implementation}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
