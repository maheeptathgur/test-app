console.log("Main.tsx is loading...");

// Test basic DOM manipulation first
const rootElement = document.getElementById("root");
if (rootElement) {
  rootElement.innerHTML = "<h1>Direct DOM Test</h1><p>If you see this, the basic JS is working</p>";
  console.log("Direct DOM manipulation successful");
}

// Then try React
import { createRoot } from "react-dom/client";

function TestApp() {
  console.log("TestApp component rendering...");
  return <div><h1>React Test</h1><p>React is working</p></div>;
}

try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<TestApp />);
  console.log("React render attempted");
} catch (error) {
  console.error("React render failed:", error);
}
