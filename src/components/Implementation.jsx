import React from "react";
import { implementationNotes } from "../data/content.js";
import CodeExample from "./CodeExample.jsx";

export default function Implementation() {
  return (
    <section id="implementation" className="section">
      <div className="section__inner section__inner--wide">
        <span className="section__kicker">10</span>
        <h2 className="section__title">Implementation</h2>
        <p className="section__lede">A few things worth deciding up front:</p>
        <ul className="arrow-list">
          {implementationNotes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>

        <p className="section__lede" style={{ marginTop: 32 }}>
          The full source below — six classes, wired exactly as the structure
          diagram describes. Notice that <code>RemoteControl</code> never
          mentions <code>TV</code> or <code>Radio</code> by name, and neither
          concrete device ever mentions a remote.
        </p>
        <CodeExample />
      </div>
    </section>
  );
}
