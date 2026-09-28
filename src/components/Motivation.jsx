import React from "react";
import { motivation } from "../data/content.js";
import MotivationDiagram from "./MotivationDiagram.jsx";

export default function Motivation() {
  return (
    <section id="motivation" className="section">
      <div className="section__inner section__inner--wide">
        <span className="section__kicker">04</span>
        <h2 className="section__title">Motivation</h2>
        <div className="section__inner" style={{ padding: 0, margin: 0, maxWidth: 720 }}>
          {motivation.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: 14, fontSize: 16 }}>
              {p}
            </p>
          ))}
        </div>
        <MotivationDiagram />
      </div>
    </section>
  );
}
