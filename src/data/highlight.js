// A deliberately small syntax highlighter: enough to make the Java samples
// in this guide readable, without pulling in a heavyweight dependency.
// Returns an array of { text, cls } tokens for one line of code.

const KEYWORDS = new Set([
  "public", "private", "protected", "class", "interface", "extends",
  "implements", "new", "return", "void", "static", "final", "abstract",
  "this", "super", "if", "else", "for", "while", "package", "import",
  "enum", "throws", "throw", "try", "catch", "null", "true", "false",
]);

const TYPES = new Set([
  "String", "int", "double", "float", "boolean", "long", "char",
  "Device", "TV", "Radio", "RemoteControl", "AdvancedRemoteControl", "Demo",
  "Override",
]);

const TOKEN_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(@\w+)|(\b\d+\b)|([A-Za-z_]\w*)|(\s+)|(.)/gm;

export function tokenizeJava(code) {
  return code.split("\n").map((line) => {
    const tokens = [];
    let match;
    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(line)) !== null) {
      const [full, comment, str, ann, num, word, ws, other] = match;
      if (comment) tokens.push({ text: comment, cls: "tok-com" });
      else if (str) tokens.push({ text: str, cls: "tok-str" });
      else if (ann) tokens.push({ text: ann, cls: "tok-ann" });
      else if (num) tokens.push({ text: num, cls: "tok-num" });
      else if (word) {
        if (KEYWORDS.has(word)) tokens.push({ text: word, cls: "tok-kw" });
        else if (TYPES.has(word)) tokens.push({ text: word, cls: "tok-type" });
        else tokens.push({ text: word, cls: "" });
      } else if (ws) tokens.push({ text: ws, cls: "" });
      else if (other) tokens.push({ text: other, cls: "" });
      if (full === "") break; // safety net against zero-length matches
    }
    return tokens;
  });
}
