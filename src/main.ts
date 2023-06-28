import App from "./App.svelte";
import { migrateToMulti } from "./ts/api/server";
import { define } from "./ts/tauri";

migrateToMulti();

const app = new App({
  target: document.getElementById("app"),
});

document.addEventListener("contextmenu", (e) => e.preventDefault());

define();

export default app;
