import React, { useMemo, useState } from "react";
import { remoteTypes, deviceTypes } from "../data/content.js";

export default function LiveDemo() {
  const [remoteId, setRemoteId] = useState("basic");
  const [deviceId, setDeviceId] = useState("tv");
  const [savedVolume, setSavedVolume] = useState(null);
  const [log, setLog] = useState("Pick a remote and a device, then press a button.");

  const deviceSpec = useMemo(
    () => deviceTypes.find((d) => d.id === deviceId),
    [deviceId]
  );

  const [state, setState] = useState(() => ({
    on: false,
    volume: deviceSpec.initial.volume,
    channel: deviceSpec.initial.channel,
  }));

  function changeDevice(id) {
    const spec = deviceTypes.find((d) => d.id === id);
    setDeviceId(id);
    setSavedVolume(null);
    setState({ on: false, volume: spec.initial.volume, channel: spec.initial.channel });
    setLog(`Switched the implementor to ${spec.label} — RemoteControl.java is unchanged.`);
  }

  function changeRemote(id) {
    setRemoteId(id);
    setSavedVolume(null);
    setLog(
      id === "advanced"
        ? "Now using AdvancedRemoteControl, which extends RemoteControl."
        : "Now using the plain RemoteControl."
    );
  }

  function act(action, message) {
    if (!state.on && action !== "power") {
      setLog("device.isEnabled() is false — turn the device on first.");
      return;
    }
    setState((s) => {
      switch (action) {
        case "power":
          return { ...s, on: !s.on };
        case "volUp":
          return { ...s, volume: Math.min(100, s.volume + 10) };
        case "volDown":
          return { ...s, volume: Math.max(0, s.volume - 10) };
        case "chUp":
          return { ...s, channel: Math.min(deviceSpec.channelMax, s.channel + deviceSpec.channelStep) };
        case "chDown":
          return { ...s, channel: Math.max(deviceSpec.channelMin, s.channel - deviceSpec.channelStep) };
        default:
          return s;
      }
    });
    setLog(message);
  }

  function mute() {
    if (!state.on) {
      setLog("device.isEnabled() is false — turn the device on first.");
      return;
    }
    if (savedVolume === null) {
      setSavedVolume(state.volume);
      setState((s) => ({ ...s, volume: 0 }));
      setLog(<>Muted — <b>AdvancedRemoteControl.mute()</b> saved the level and called device.setVolume(0).</>);
    } else {
      setState((s) => ({ ...s, volume: savedVolume }));
      setSavedVolume(null);
      setLog(<>Unmuted — restored via <b>device.setVolume({savedVolume})</b>.</>);
    }
  }

  const remoteLabel = remoteId === "advanced" ? "AdvancedRemoteControl" : "RemoteControl";

  return (
    <div className="demo">
          <div className="demo__controls">
            <div className="demo__picker">
              <span>Abstraction — remote</span>
              <div className="demo__picker-options">
                {remoteTypes.map((r) => (
                  <button
                    key={r.id}
                    className={`chip${r.id === remoteId ? " is-active" : ""}`}
                    onClick={() => changeRemote(r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="demo__picker">
              <span>Implementor — device</span>
              <div className="demo__picker-options">
                {deviceTypes.map((d) => (
                  <button
                    key={d.id}
                    className={`chip${d.id === deviceId ? " is-active" : ""}`}
                    onClick={() => changeDevice(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="demo__stage">
            <div className="remote">
              <span className="remote__name">{remoteLabel}</span>
              <div className="remote__buttons">
                <button className="full" onClick={() => act("power", `${remoteLabel}.togglePower() → device.${state.on ? "disable" : "enable"}()`)}>
                  {state.on ? "Turn off" : "Turn on"}
                </button>
                <button disabled={!state.on} onClick={() => act("volUp", `${remoteLabel}.volumeUp() → device.setVolume(${Math.min(100, state.volume + 10)})`)}>
                  Vol +
                </button>
                <button disabled={!state.on} onClick={() => act("volDown", `${remoteLabel}.volumeDown() → device.setVolume(${Math.max(0, state.volume - 10)})`)}>
                  Vol −
                </button>
                <button disabled={!state.on} onClick={() => act("chUp", `${remoteLabel}.channelUp() → device.setChannel(...)`)}>
                  {deviceSpec.channelLabel} +
                </button>
                <button disabled={!state.on} onClick={() => act("chDown", `${remoteLabel}.channelDown() → device.setChannel(...)`)}>
                  {deviceSpec.channelLabel} −
                </button>
                {remoteId === "advanced" && (
                  <button className="full" disabled={!state.on} onClick={mute}>
                    {savedVolume === null ? "Mute" : "Unmute"}
                  </button>
                )}
              </div>
            </div>

            <div className="device">
              <div className="device__header">
                <span className="device__name">{deviceSpec.label}</span>
                <span className={`device__power-dot${state.on ? " on" : ""}`} />
              </div>
              <div className="device__readout">
                <small>Volume</small>
                {state.volume}
              </div>
              <div className="device__volume-bar">
                <div className="device__volume-fill" style={{ width: `${state.volume}%` }} />
              </div>
              <div className="device__readout">
                <small>{deviceSpec.channelLabel}</small>
                {deviceSpec.format(state.channel)}
              </div>
            </div>
          </div>

      <div className="demo__log">{log}</div>
    </div>
  );
}
