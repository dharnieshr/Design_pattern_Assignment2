// ---------------------------------------------------------------------------
// Content for the Bridge pattern guide, organized under the classic
// Gang-of-Four catalog headings: Name, Intent, Also Known As, Motivation,
// Applicability, Structure, Participants, Collaboration, Consequences,
// Implementation, Sample Code, Known Uses, Related Patterns.
// ---------------------------------------------------------------------------

export const name = {
  title: "Bridge",
  classification: "Structural pattern",
  alsoKnownAs: "Handle/Body",
};

export const intent =
  "Separate what an object does from how it does it, so an abstraction and its implementation can each change, extend, or be swapped without forcing changes on the other.";

export const alsoKnownAs =
  "This pattern is sometimes introduced as the Handle/Body idiom: the abstraction is the handle a client holds onto, and the implementor is the body doing the real work behind it.";

export const motivation = {
  paragraphs: [
    "Picture a universal remote control that needs to work with several kinds of devices — a TV, a radio, a smart speaker — and you also want more than one remote variant: a basic one, and an advanced one with mute and channel presets.",
    "Model that with plain inheritance and the two ideas get tangled together. A BasicRemote-for-TV class and an AdvancedRemote-for-Radio class each have to bundle remote behaviour with device behaviour in a single hierarchy, so every new device multiplies against every existing remote variant, and every new remote variant multiplies against every existing device.",
    "The fix is to notice there are really two separate ideas here — 'what the remote lets a user do' and 'how a specific device carries that out' — and give each its own class hierarchy. The remote hierarchy holds a reference to a device object and forwards work to it, instead of inheriting device-specific logic itself. That reference is the bridge: it connects the two hierarchies without merging them.",
  ],
};

export const applicability = [
  "You want to avoid a permanent, compile-time link between an abstraction and one particular implementation — for instance so the implementation can be chosen, or swapped, at runtime.",
  "Both the abstraction and its implementation need to grow through subclassing, and you want each hierarchy to extend on its own, without every combination needing a class of its own.",
  "A change to an implementation shouldn't force client code to change or even recompile.",
  "You want to share one implementation across several abstraction objects, and hide that sharing from the client entirely.",
  "A class hierarchy has started multiplying because two independent things are varying inside it at once — usually a sign it's time to split it into two hierarchies joined by composition.",
];

export const structure = {
  nodes: {
    abstraction: {
      title: "RemoteControl",
      stereotype: "«abstraction»",
      rows: ["- device: Device", "+ togglePower()", "+ volumeUp()", "+ channelUp()"],
    },
    refined: {
      title: "AdvancedRemoteControl",
      stereotype: "«refined abstraction»",
      rows: ["+ mute()", "+ savePreset()"],
    },
    implementor: {
      title: "Device",
      stereotype: "«implementor» interface",
      rows: ["+ enable()", "+ disable()", "+ setVolume(v)", "+ setChannel(c)"],
    },
    concreteA: {
      title: "TV",
      stereotype: "«concrete implementor»",
      rows: ["+ setVolume(v)", "+ setChannel(c)"],
    },
    concreteB: {
      title: "Radio",
      stereotype: "«concrete implementor»",
      rows: ["+ setVolume(v)", "+ setChannel(c)"],
    },
  },
};

export const participants = [
  {
    name: "Abstraction",
    example: "RemoteControl",
    role:
      "Defines the operations a client calls, and keeps a reference to an Implementor object that it forwards work to.",
  },
  {
    name: "RefinedAbstraction",
    example: "AdvancedRemoteControl",
    role:
      "Extends Abstraction with additional operations, built purely from the inherited Implementor reference — never from new device-specific code.",
  },
  {
    name: "Implementor",
    example: "Device",
    role:
      "Declares the primitive operations concrete implementors must provide. It doesn't need to mirror Abstraction's interface — usually it only needs to expose the building blocks Abstraction is composed from.",
  },
  {
    name: "ConcreteImplementor",
    example: "TV, Radio",
    role:
      "Implements the Implementor interface for one specific device or platform, however it likes internally.",
  },
];

export const collaboration =
  "Abstraction forwards every client request to its Implementor object. Neither hierarchy calls into the other's subclasses directly — only through the Implementor interface — which is what lets either side change without the other noticing.";

export const consequences = {
  pros: [
    "New implementations can be added without recompiling, or even touching, the abstraction's code, and vice versa.",
    "Client code depends on the abstraction only, so implementation details can change behind the scenes.",
    "Replaces one bloated inheritance tree with two small, independently extensible ones.",
    "An implementor object can be swapped at runtime, not just at compile time.",
  ],
  cons: [
    "Adds a layer of indirection, which can make simple code harder to follow at first glance.",
    "Only pays off once there are genuinely two independent dimensions of variation — for a single hierarchy it's unnecessary ceremony.",
    "Requires designing the Implementor interface carefully up front, since every future implementor has to fit it.",
  ],
};

export const implementationNotes = [
  "Give Abstraction exactly one Implementor reference — set once at construction, or made swappable later if devices can change at runtime.",
  "Keep Implementor down to primitive operations only; put anything higher-level in Abstraction or a RefinedAbstraction instead.",
  "A single Implementor instance can be shared by more than one Abstraction object if that fits the use case.",
  "If there's only ever going to be one implementor, the extra indirection isn't earning its keep — reach for Bridge once a second concrete implementor is genuinely on the horizon.",
];

// Full source, shown under Implementation.
export const codeTabs = [
  {
    id: "device",
    label: "Device.java",
    code: `// The implementor. Declares the low-level primitives that
// every concrete device must provide — nothing here mentions
// "remote" or "user"; it only describes what a device can do.
public interface Device {
    boolean isEnabled();
    void enable();
    void disable();
    int getVolume();
    void setVolume(int percent);
    int getChannel();
    void setChannel(int channel);
}`,
  },
  {
    id: "tv",
    label: "TV.java",
    code: `// A concrete implementor. Free to store state however it likes;
// the abstraction above never needs to know these details.
public class TV implements Device {
    private boolean on = false;
    private int volume = 30;
    private int channel = 1;

    public boolean isEnabled() { return on; }
    public void enable() { on = true; }
    public void disable() { on = false; }
    public int getVolume() { return volume; }

    public void setVolume(int percent) {
        volume = Math.max(0, Math.min(100, percent));
    }

    public int getChannel() { return channel; }

    public void setChannel(int channel) {
        this.channel = Math.max(1, Math.min(999, channel));
    }
}`,
  },
  {
    id: "radio",
    label: "Radio.java",
    code: `// A second concrete implementor with an entirely different
// internal representation for "channel" — a frequency, not a
// number — yet it satisfies the same Device contract.
public class Radio implements Device {
    private boolean on = false;
    private int volume = 20;
    private int stationKHz = 87500;

    public boolean isEnabled() { return on; }
    public void enable() { on = true; }
    public void disable() { on = false; }
    public int getVolume() { return volume; }

    public void setVolume(int percent) {
        volume = Math.max(0, Math.min(100, percent));
    }

    public int getChannel() { return stationKHz; }

    public void setChannel(int channel) {
        this.stationKHz = Math.max(87500, Math.min(108000, channel));
    }
}`,
  },
  {
    id: "remote",
    label: "RemoteControl.java",
    code: `// The abstraction. Holds a reference to a Device — the
// "bridge" — and expresses every operation in terms of it.
// Swap in a TV or a Radio and this class does not change.
public class RemoteControl {
    protected final Device device;

    public RemoteControl(Device device) {
        this.device = device;
    }

    public void togglePower() {
        if (device.isEnabled()) device.disable();
        else device.enable();
    }

    public void volumeUp() {
        device.setVolume(device.getVolume() + 10);
    }

    public void volumeDown() {
        device.setVolume(device.getVolume() - 10);
    }

    public void channelUp() {
        device.setChannel(device.getChannel() + 1);
    }
}`,
  },
  {
    id: "advanced",
    label: "AdvancedRemoteControl.java",
    code: `// A refined abstraction. It extends RemoteControl, not Device —
// new remote behaviour is added here without a single line of
// device-specific code, and it works with any Device at all.
public class AdvancedRemoteControl extends RemoteControl {
    private int savedVolume = -1;

    public AdvancedRemoteControl(Device device) {
        super(device);
    }

    public void mute() {
        if (savedVolume == -1) {
            savedVolume = device.getVolume();
            device.setVolume(0);
        } else {
            device.setVolume(savedVolume);
            savedVolume = -1;
        }
    }
}`,
  },
  {
    id: "demo",
    label: "Demo.java",
    code: `public class Demo {
    public static void main(String[] args) {
        Device tv = new TV();
        RemoteControl basic = new RemoteControl(tv);
        basic.togglePower();
        basic.volumeUp();

        Device radio = new Radio();
        AdvancedRemoteControl advanced = new AdvancedRemoteControl(radio);
        advanced.togglePower();
        advanced.mute();

        // Same two remote classes, any current or future Device —
        // no RemoteControlForTV, no AdvancedRemoteControlForRadio.
    }
}`,
  },
];

// -- Sample Code / live demo --------------------------------------------

export const remoteTypes = [
  { id: "basic", label: "Basic remote" },
  { id: "advanced", label: "Advanced remote" },
];

export const deviceTypes = [
  {
    id: "tv",
    label: "TV",
    initial: { volume: 30, channel: 1 },
    channelLabel: "Ch.",
    channelStep: 1,
    channelMin: 1,
    channelMax: 999,
    format: (c) => String(c),
  },
  {
    id: "radio",
    label: "Radio",
    initial: { volume: 20, channel: 87500 },
    channelLabel: "MHz",
    channelStep: 200,
    channelMin: 87500,
    channelMax: 108000,
    format: (c) => (c / 1000).toFixed(1),
  },
  {
    id: "speaker",
    label: "Smart speaker",
    initial: { volume: 45, channel: 1 },
    channelLabel: "Src.",
    channelStep: 1,
    channelMin: 1,
    channelMax: 5,
    format: (c) => `input ${c}`,
  },
];

// -- Known Uses ----------------------------------------------------------

export const knownUses = [
  {
    abstraction: "Shape",
    note: "draw(), resize()",
    implementation:
      "A drawing app's Shape classes (Circle, Square) each hold a Renderer. Swap between an SVGRenderer and a CanvasRenderer without touching a single Shape subclass.",
  },
  {
    abstraction: "Connection",
    note: "query(), execute()",
    implementation:
      "JDBC works this way: application code calls the same Connection/Statement abstraction regardless of whether the driver underneath talks to PostgreSQL, MySQL, or Oracle.",
  },
  {
    abstraction: "Notifier",
    note: "send(message)",
    implementation:
      "A NotificationService abstraction (Instant, Scheduled, Digest) delegates the actual delivery to a channel implementor — Email, SMS, or Push — chosen at runtime.",
  },
  {
    abstraction: "PaymentFlow",
    note: "charge(order)",
    implementation:
      "A checkout abstraction (StandardCheckout, SubscriptionCheckout) forwards the actual charge to a gateway implementor such as Stripe or a bank's own PSP.",
  },
];

// -- Related Patterns ------------------------------------------------------

export const relatedPatterns = [
  {
    name: "Adapter",
    note:
      "Adapter is usually reached for after the fact, to make an existing, incompatible interface fit — Bridge is designed in up front so two hierarchies can evolve independently.",
  },
  {
    name: "Strategy",
    note:
      "Strategy swaps a single algorithm at the object level; Bridge splits an entire class hierarchy in two along a structural seam.",
  },
  {
    name: "Abstract Factory",
    note:
      "Abstract Factory is often used alongside Bridge to construct a matching implementor object without the client naming its concrete class.",
  },
];
