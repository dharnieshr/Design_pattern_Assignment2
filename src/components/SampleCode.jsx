import React from "react";
import LiveDemo from "./LiveDemo.jsx";

export default function SampleCode() {
  return (
    <section id="sample-code" className="section">
      <div className="section__inner section__inner--wide">
        <span className="section__kicker">11</span>
        <h2 className="section__title">Sample Code</h2>
        <p className="section__lede">
          The classes from Implementation, running live. Swap the remote and
          the device independently — that independence is the entire point
          of the pattern.
        </p>
        <LiveDemo />
      </div>
    </section>
  );
}
