import ReactDOM from "react-dom/client";
import { Root } from "./Root";
import { langFromPath } from "@/lib/i18n";
import "./index.css";

const container = document.getElementById("root")!;
const app = <Root lang={langFromPath(window.location.pathname)} />;

// A production build ships the page prerendered, so attach to that markup;
// the dev server serves an empty #root.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
