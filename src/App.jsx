import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import NameSection from "./components/NameSection.jsx";
import IntentSection from "./components/IntentSection.jsx";
import AlsoKnownAs from "./components/AlsoKnownAs.jsx";
import Motivation from "./components/Motivation.jsx";
import Applicability from "./components/Applicability.jsx";
import Structure from "./components/Structure.jsx";
import Participants from "./components/Participants.jsx";
import Collaboration from "./components/Collaboration.jsx";
import Consequences from "./components/Consequences.jsx";
import Implementation from "./components/Implementation.jsx";
import SampleCode from "./components/SampleCode.jsx";
import KnownUses from "./components/KnownUses.jsx";
import RelatedPatterns from "./components/RelatedPatterns.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="layout">
        <main className="content">
          <NameSection />
          <IntentSection />
          <AlsoKnownAs />
          <Motivation />
          <Applicability />
          <Structure />
          <Participants />
          <Collaboration />
          <Consequences />
          <Implementation />
          <SampleCode />
          <KnownUses />
          <RelatedPatterns />
          <Footer />
        </main>
      </div>
    </div>
  );
}
