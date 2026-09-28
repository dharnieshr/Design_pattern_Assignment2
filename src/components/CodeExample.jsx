import React, { useState } from "react";
import { codeTabs } from "../data/content.js";
import { tokenizeJava } from "../data/highlight.js";

// Pure widget — no <section>/heading of its own. Rendered inside the
// Implementation section, which owns the required heading.
export default function CodeExample() {
  const [active, setActive] = useState(codeTabs[0].id);
  const tab = codeTabs.find((t) => t.id === active);
  const lines = tokenizeJava(tab.code);

  return (
    <div className="code-block">
      <div className="code-block__tabs">
        {codeTabs.map((t) => (
          <button
            key={t.id}
            className={`code-block__tab${t.id === active ? " is-active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <pre>
        <code>
          {lines.map((tokens, i) => (
            <div key={i}>
              {tokens.length === 0 ? "\u00A0" : null}
              {tokens.map((tok, j) =>
                tok.cls ? (
                  <span key={j} className={tok.cls}>
                    {tok.text}
                  </span>
                ) : (
                  <React.Fragment key={j}>{tok.text}</React.Fragment>
                )
              )}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
