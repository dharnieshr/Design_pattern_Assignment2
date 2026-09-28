import React from "react";
import { participants } from "../data/content.js";

export default function Participants() {
  return (
    <section id="participants" className="section">
      <div className="section__inner">
        <span className="section__kicker">07</span>
        <h2 className="section__title">Participants</h2>

        <div className="spec-list">
          {participants.map((p) => (
            <div className="spec-row" key={p.name}>
              <div className="spec-row__abstraction">
                {p.name}
                <span>{p.example}</span>
              </div>
              <div className="spec-row__implementation">{p.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
