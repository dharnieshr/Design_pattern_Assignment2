import React from "react";
import { structure } from "../data/content.js";

const { nodes } = structure;

function Box({ x, y, w, h, node, accent }) {
  const headerH = 40;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        className={`uml-box${accent ? " uml-box--accent" : ""}`}
      />
      <line
        x1={x}
        y1={y + headerH}
        x2={x + w}
        y2={y + headerH}
        className="uml-line"
        strokeWidth="1"
        opacity="0.5"
      />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" className="uml-title">
        {node.title}
      </text>
      <text x={x + w / 2} y={y + 32} textAnchor="middle" className="uml-sub">
        {node.stereotype}
      </text>
      {node.rows.map((r, i) => (
        <text key={i} x={x + 12} y={y + headerH + 18 + i * 16} className="uml-row">
          {r}
        </text>
      ))}
    </g>
  );
}

// Hollow triangle arrowhead, tip pointing straight up at (x, tipY).
function ArrowUp({ x, tipY }) {
  return (
    <polygon
      points={`${x - 7},${tipY + 12} ${x + 7},${tipY + 12} ${x},${tipY}`}
      className="uml-arrow"
    />
  );
}

function Diamond({ cx, cy }) {
  return (
    <polygon
      points={`${cx - 8},${cy} ${cx},${cy - 5} ${cx + 8},${cy} ${cx},${cy + 5}`}
      className="uml-diamond"
    />
  );
}

export default function StructureDiagram() {
  // Layout constants — all axis-aligned, see component notes above.
  const abst = { x: 20, y: 20, w: 200, h: 108 };
  const refined = { x: 20, y: 170, w: 200, h: 78 };
  const impl = { x: 460, y: 20, w: 200, h: 108 };
  const tv = { x: 400, y: 170, w: 130, h: 78 };
  const radio = { x: 550, y: 170, w: 130, h: 78 };

  const abstCenterX = abst.x + abst.w / 2; // 120
  const implCenterX = impl.x + impl.w / 2; // 560
  const tvCenterX = tv.x + tv.w / 2; // 465
  const radioCenterX = radio.x + radio.w / 2; // 615
  const bridgeY = abst.y + abst.h / 2; // 74
  const busY = 150;

  return (
    <div className="diagram-frame">
      <svg viewBox="0 0 700 300" width="700" height="300" role="img" aria-label="UML structure of the Bridge pattern">
        {/* Bridge: composition from Abstraction to Implementor */}
        <line
          x1={abst.x + abst.w}
          y1={bridgeY}
          x2={impl.x}
          y2={bridgeY}
          className="uml-line uml-line--bridge"
        />
        <Diamond cx={abst.x + abst.w + 8} cy={bridgeY} />
        <text x={(abst.x + abst.w + impl.x) / 2} y={bridgeY - 10} textAnchor="middle" className="uml-caption">
          device: Device
        </text>

        {/* Extends: RefinedAbstraction -> Abstraction */}
        <line x1={abstCenterX} y1={refined.y} x2={abstCenterX} y2={abst.y + abst.h + 12} className="uml-line" />
        <ArrowUp x={abstCenterX} tipY={abst.y + abst.h} />

        {/* Implements: TV & Radio -> Device, via an orthogonal bus */}
        <line x1={implCenterX} y1={impl.y + impl.h + 12} x2={implCenterX} y2={busY} className="uml-line uml-line--dashed" />
        <ArrowUp x={implCenterX} tipY={impl.y + impl.h} />
        <line x1={tvCenterX} y1={busY} x2={radioCenterX} y2={busY} className="uml-line uml-line--dashed" />
        <line x1={tvCenterX} y1={busY} x2={tvCenterX} y2={tv.y} className="uml-line uml-line--dashed" />
        <line x1={radioCenterX} y1={busY} x2={radioCenterX} y2={radio.y} className="uml-line uml-line--dashed" />

        <Box {...abst} node={nodes.abstraction} accent />
        <Box {...refined} node={nodes.refined} />
        <Box {...impl} node={nodes.implementor} accent />
        <Box {...tv} node={nodes.concreteA} />
        <Box {...radio} node={nodes.concreteB} />
      </svg>
    </div>
  );
}
