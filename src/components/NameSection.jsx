import React from "react";
import { name } from "../data/content.js";

export default function NameSection() {
  return (
    <section id="name" className="hero section">
      <div className="hero__inner">
        <div>
          <span className="section__kicker">01</span>
          <h2 className="section__title" style={{ marginBottom: 4 }}>
            Name
          </h2>
          <h1 className="hero__title">
            <span className="accent">{name.title}</span>
          </h1>
          <p className="hero__sub">
            {name.classification} · Gang of Four · also known as the {name.alsoKnownAs} idiom
          </p>
        </div>

        <svg
          className="hero__diagram"
          viewBox="0 0 420 220"
          role="img"
          aria-label="Two towers, Abstraction and Implementation, connected by a bridge deck and cables"
        >
          <line x1="40" y1="180" x2="40" y2="60" className="tower" strokeWidth="6" strokeLinecap="round" />
          <line x1="380" y1="180" x2="380" y2="60" className="tower" strokeWidth="6" strokeLinecap="round" />
          <line x1="10" y1="180" x2="70" y2="180" className="tower" strokeWidth="6" strokeLinecap="round" />
          <line x1="350" y1="180" x2="410" y2="180" className="tower" strokeWidth="6" strokeLinecap="round" />

          <line x1="40" y1="120" x2="380" y2="120" className="deck" strokeWidth="5" strokeLinecap="round" />

          <path className="cable" d="M40,60 L140,120" fill="none" strokeWidth="2.5" />
          <path className="cable" d="M40,60 L210,120" fill="none" strokeWidth="2.5" />
          <path className="cable" d="M380,60 L280,120" fill="none" strokeWidth="2.5" />
          <path className="cable" d="M380,60 L210,120" fill="none" strokeWidth="2.5" />

          <text x="40" y="45" textAnchor="middle" className="label-text">Abstraction</text>
          <text x="380" y="45" textAnchor="middle" className="label-text">Implementation</text>
          <text x="210" y="145" textAnchor="middle" className="label-text">the bridge (composition)</text>
        </svg>
      </div>
    </section>
  );
}
