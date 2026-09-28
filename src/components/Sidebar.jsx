import React, { useState } from "react";

const LINKS = [
  ["#name", "Name"],
  ["#intent", "Intent"],
  ["#also-known-as", "Also Known As"],
  ["#motivation", "Motivation"],
  ["#applicability", "Applicability"],
  ["#structure", "Structure"],
  ["#participants", "Participants"],
  ["#collaboration", "Collaboration"],
  ["#consequences", "Consequences"],
  ["#implementation", "Implementation"],
  ["#sample-code", "Sample Code"],
  ["#known-uses", "Known Uses"],
  ["#related-patterns", "Related Patterns"],
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <a className="topbar__brand" href="#name" onClick={() => setOpen(false)}>
          <svg className="topbar__mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="7" cy="10" r="3.2" fill="#4fd1c5" />
            <circle cx="25" cy="10" r="3.2" fill="#f2b134" />
            <path
              d="M7 13 v6 M25 13 v6 M4 22 h6 M22 22 h6 M10 10 h12"
              stroke="#8fa3b8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          Bridge
        </a>
        <button
          className="topbar__toggle"
          aria-label={open ? "Close contents" : "Open contents"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Contents"}
        </button>
      </div>

      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)} />}

      <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
        <div className="sidebar__inner">
          <span className="sidebar__title">Bridge Pattern</span>
          <nav>
            <ol className="sidebar__list">
              {LINKS.map(([href, label], i) => (
                <li key={href}>
                  <a href={href} onClick={() => setOpen(false)}>
                    <span className="sidebar__num">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>
    </>
  );
}
