import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./apps/**/vite.config.ts",
  "./packages/**/vite.config.ts",
]);
