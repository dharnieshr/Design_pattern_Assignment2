import React from "react";
import StructureDiagram from "./StructureDiagram.jsx";

export default function Structure() {
  return (
    <section id="structure" className="section">
      <div className="section__inner section__inner--wide">
        <span className="section__kicker">06</span>
        <h2 className="section__title">Structure</h2>
        <p className="section__lede">
          The cyan line is the bridge itself — plain composition. Everything
          on the left can grow (new refined abstractions); everything on the
          right can grow (new concrete implementors); neither side has to
          know about the other's subclasses.
        </p>
        <StructureDiagram />
      </div>
    </section>
  );
}
