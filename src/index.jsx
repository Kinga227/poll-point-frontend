import { createRoot } from "react-dom/client";
import Root from "./components/Root";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element.");
}

createRoot(rootElement).render(<Root />);
