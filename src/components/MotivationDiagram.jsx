import React from "react";

const leafLabels = [
  "Basic\n+TV",
  "Basic\n+Radio",
  "Adv.\n+TV",
  "Adv.\n+Radio",
];

function LeafBox({ x, y, w, h, text }) {
  const lines = text.split("\n");
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" className="uml-box" />
      {lines.map((l, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={y + h / 2 - (lines.length - 1) * 6 + i * 13}
          textAnchor="middle"
          className="uml-row"
        >
          {l}
        </text>
      ))}
    </g>
  );
}

export default function MotivationDiagram() {
  const leafW = 58;
  const leafH = 44;
  const leafY = 138;
  const leafXs = [22, 90, 158, 226];
  const rootBox = { x: 100, y: 34, w: 120, h: 32 };

  const remoteBox = { x: 370, y: 90, w: 150, h: 50 };
  const deviceBox = { x: 560, y: 90, w: 150, h: 50 };
  const bridgeY = remoteBox.y + remoteBox.h / 2;

  return (
    <div className="diagram-frame">
      <svg viewBox="0 0 700 230" width="700" height="230" role="img" aria-label="Left: one remote class per remote/device combination. Right: two independent hierarchies joined by a bridge.">
        <text x="160" y="16" textAnchor="middle" className="uml-caption uml-caption--bad">
          Without Bridge
        </text>
        <rect {...rootBox} rx="4" className="uml-box uml-box--accent" />
        <text x={rootBox.x + rootBox.w / 2} y={rootBox.y + 20} textAnchor="middle" className="uml-title">
          RemoteControl
        </text>

        {leafXs.map((x, i) => (
          <line
            key={i}
            x1={rootBox.x + rootBox.w / 2}
            y1={rootBox.y + rootBox.h}
            x2={x + leafW / 2}
            y2={leafY}
            className="uml-line"
          />
        ))}
        {leafXs.map((x, i) => (
          <LeafBox key={i} x={x} y={leafY} w={leafW} h={leafH} text={leafLabels[i]} />
        ))}
        <text x="160" y="205" textAnchor="middle" className="uml-caption uml-caption--bad">
          +1 class per new combination
        </text>

        <line x1="330" y1="10" x2="330" y2="220" className="uml-line uml-line--dashed" opacity="0.5" />

        <text x="520" y="16" textAnchor="middle" className="uml-caption uml-caption--good">
          With Bridge
        </text>
        <rect {...remoteBox} rx="4" className="uml-box uml-box--accent" />
        <text x={remoteBox.x + remoteBox.w / 2} y={remoteBox.y + 24} textAnchor="middle" className="uml-title">
          RemoteControl
        </text>
        <text x={remoteBox.x + remoteBox.w / 2} y={remoteBox.y + 40} textAnchor="middle" className="uml-sub">
          + refined variants
        </text>

        <rect {...deviceBox} rx="4" className="uml-box uml-box--accent" />
        <text x={deviceBox.x + deviceBox.w / 2} y={deviceBox.y + 24} textAnchor="middle" className="uml-title">
          Device
        </text>
        <text x={deviceBox.x + deviceBox.w / 2} y={deviceBox.y + 40} textAnchor="middle" className="uml-sub">
          + concrete variants
        </text>

        <line
          x1={remoteBox.x + remoteBox.w}
          y1={bridgeY}
          x2={deviceBox.x}
          y2={bridgeY}
          className="uml-line uml-line--bridge"
        />
        <polygon
          points={`${remoteBox.x + remoteBox.w},${bridgeY} ${remoteBox.x + remoteBox.w + 8},${bridgeY - 5} ${remoteBox.x + remoteBox.w + 16},${bridgeY} ${remoteBox.x + remoteBox.w + 8},${bridgeY + 5}`}
          className="uml-diamond"
        />

        <text x="520" y="170" textAnchor="middle" className="uml-caption uml-caption--good">
          each hierarchy grows on its own
        </text>
      </svg>
    </div>
  );
}
