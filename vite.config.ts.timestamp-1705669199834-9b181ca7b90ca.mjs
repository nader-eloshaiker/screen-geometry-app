// vite.config.ts
import react from "file:///Users/nadereloshaiker/Development/Personal/screen-geometry-app/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.0.10/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { checker } from "file:///Users/nadereloshaiker/Development/Personal/screen-geometry-app/node_modules/.pnpm/vite-plugin-checker@0.6.2_eslint@8.56.0_typescript@5.3.3_vite@5.0.10/node_modules/vite-plugin-checker/dist/esm/main.js";
import { configDefaults, defineConfig } from "file:///Users/nadereloshaiker/Development/Personal/screen-geometry-app/node_modules/.pnpm/vitest@1.1.2_@types+node@20.11.2_@vitest+ui@1.2.0_jsdom@23.0.1/node_modules/vitest/dist/config.js";

// package.json
var package_default = {
  name: "screen-geometry-app",
  version: "0.12.3",
  homepage: "https://github.com/nader-eloshaiker/screen-geometry-app",
  private: true,
  license: "MIT",
  type: "module",
  author: {
    name: "Nader Eloshaiker",
    url: "https://github.com/nader-eloshaiker"
  },
  packageManager: "pnpm@8.14.1",
  engines: {
    node: ">=20",
    pnpm: ">=8"
  },
  scripts: {
    preinstall: "npx only-allow pnpm",
    dev: "vite --mode dev --base=/",
    build: "tsc && vite build --mode dev --base=/",
    "build:prod": "tsc && vite build --mode prod --base=/",
    lint: "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --fix --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    format: "prettier --write .",
    preview: "vite preview",
    "gen:spec": "orval --config ./orval.config.ts",
    prepare: "husky install",
    test: "vitest --coverage",
    "test:ui": "vitest --ui  --coverage",
    "test:ci": "vitest --run --coverage",
    "test:badge": "coverage-badges-cli --source=reports/coverage/coverage-summary.json --output=docs/coverage.svg --icon=docs/vitest.svg",
    typecheck: "tsc --project tsconfig.json --noEmit",
    sb: "storybook dev -p 6006",
    "sb:build": "storybook build",
    report: "pnpm report:sb && pnpm report:test",
    "report:sb": "storybook build --docs --output-dir=./reports/storybook",
    "report:test": "pnpm test:ci && pnpm test:badge"
  },
  dependencies: {
    "@hookform/resolvers": "^3.3.4",
    "@react-hook/resize-observer": "^1.2.6",
    "@tanstack/react-query": "^5.8.7",
    axios: "^1.6.5",
    "axios-mock-adapter": "^1.22.0",
    clsx: "^2.1.0",
    localforage: "^1.10.0",
    minisearch: "^6.3.0",
    "path-to-regexp": "^6.2.1",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-router-dom": "^6.21.1",
    "simpler-color": "^1.0.1",
    "vite-plugin-checker": "^0.6.2",
    "web-vitals": "^3.5.1",
    yup: "^1.3.3"
  },
  devDependencies: {
    "@storybook/addon-essentials": "^7.6.7",
    "@storybook/addon-interactions": "^7.6.8",
    "@storybook/addon-links": "^7.6.6",
    "@storybook/addon-onboarding": "^1.0.10",
    "@storybook/addon-themes": "^7.6.6",
    "@storybook/blocks": "^7.6.6",
    "@storybook/react": "^7.6.6",
    "@storybook/react-vite": "^7.6.7",
    "@storybook/test": "^7.6.6",
    "@testing-library/jest-dom": "^6.1.6",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.2",
    "@types/eslint-config-prettier": "^6.11.3",
    "@types/eslint-plugin-prettier": "^3.1.3",
    "@types/jsdom": "^21.1.2",
    "@types/lint-staged": "^13.2.0",
    "@types/node": "^20.11.2",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.17",
    "@types/react-router-dom": "^5.3.3",
    "@types/styled-components": "^5.1.26",
    "@typescript-eslint/eslint-plugin": "^6.18.1",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/coverage-v8": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    autoprefixer: "^10.4.16",
    "coverage-badges-cli": "^1.2.5",
    daisyui: "^4.4.19",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-prettier": "^5.1.2",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "eslint-plugin-storybook": "^0.6.15",
    "eslint-plugin-tailwindcss": "^3.14.0",
    husky: "^8.0.3",
    jsdom: "^23.0.1",
    "lint-staged": "^15.2.0",
    orval: "^6.23.0",
    prettier: "^3.1.0",
    "prettier-plugin-organize-imports": "^3.2.3",
    storybook: "^7.6.6",
    "styled-components": "^6.1.6",
    "tailwind-merge": "^2.2.0",
    "tailwind-styled-components": "^2.2.0",
    tailwindcss: "^3.4.1",
    typescript: "^5.3.3",
    vite: "^5.0.10",
    "vite-plugin-checker": "^0.6.2",
    vitest: "^1.1.2"
  },
  browserslist: [
    "defaults"
  ],
  "lint-staged": {
    "**/*.{ts,tsx,js,json,yaml} !(src/openapi/generated/**/*)": "npm run lint:fix",
    "*.{ts,tsx,js,csss,json,yaml,md*}": "npm run format"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/nadereloshaiker/Development/Personal/screen-geometry-app";
var vite_config_default = defineConfig({
  base: process.env.BASE_URL,
  define: {
    "import.meta.env.VITE_PACKAGE_VERSION": JSON.stringify(package_default.version)
  },
  assetsInclude: ["/sb-preview/runtime.js"],
  plugins: [
    react(),
    checker({
      typescript: true,
      enableBuild: true
    })
  ],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      "@assets": path.resolve(__vite_injected_original_dirname, "/src/assets"),
      "@components": path.resolve(__vite_injected_original_dirname, "/src/components"),
      "@constants": path.resolve(__vite_injected_original_dirname, "/src/constants"),
      "@contexts": path.resolve(__vite_injected_original_dirname, "/src/contexts"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@models": path.resolve(__vite_injected_original_dirname, "/src/models"),
      "@openapi": path.resolve(__vite_injected_original_dirname, "/src/openapi"),
      "@pages": path.resolve(__vite_injected_original_dirname, "/src/pages"),
      "@routes": path.resolve(__vite_injected_original_dirname, "/src/routes"),
      "@server": path.resolve(__vite_injected_original_dirname, "/src/server"),
      "@test": path.resolve(__vite_injected_original_dirname, "/src/test"),
      "@utils": path.resolve(__vite_injected_original_dirname, "/src/utils")
    }
  },
  test: {
    // Do not process css files (is slow)
    // css: {
    //   include: /.+/,
    // },
    globals: true,
    clearMocks: true,
    mockReset: true,
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      //'istanbul',
      reporter: ["text", "json-summary", "json", "clover", "html"],
      reportsDirectory: "reports/coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [...configDefaults.exclude, "src/openapi/**/*", "src/test/**.*", "src/**/*.mock.{ts,tsx}"],
      reportOnFailure: true,
      thresholds: {
        lines: 50,
        branches: 65,
        functions: 47,
        statements: 50
        // autoUpdate: true, // Update thresholds when writing tests, disabled due to refactoring tests changes coverage
      }
    },
    environment: "jsdom",
    setupFiles: "./src/test/vitest.setup.ts",
    include: ["src/**/*.test.{ts,tsx}"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL25hZGVyZWxvc2hhaWtlci9EZXZlbG9wbWVudC9QZXJzb25hbC9zY3JlZW4tZ2VvbWV0cnktYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmFkZXJlbG9zaGFpa2VyL0RldmVsb3BtZW50L1BlcnNvbmFsL3NjcmVlbi1nZW9tZXRyeS1hcHAvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25hZGVyZWxvc2hhaWtlci9EZXZlbG9wbWVudC9QZXJzb25hbC9zY3JlZW4tZ2VvbWV0cnktYXBwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGNoZWNrZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJ1xuaW1wb3J0IHsgY29uZmlnRGVmYXVsdHMsIGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IHByb2Nlc3MuZW52LkJBU0VfVVJMLFxuICBkZWZpbmU6IHtcbiAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfUEFDS0FHRV9WRVJTSU9OJzogSlNPTi5zdHJpbmdpZnkocGFja2FnZUpzb24udmVyc2lvbiksXG4gIH0sXG4gIGFzc2V0c0luY2x1ZGU6IFsnL3NiLXByZXZpZXcvcnVudGltZS5qcyddLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjaGVja2VyKHtcbiAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4gICAgICBlbmFibGVCdWlsZDogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgJ0Bhc3NldHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnL3NyYy9hc3NldHMnKSxcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcvc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgICdAY29uc3RhbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvY29uc3RhbnRzJyksXG4gICAgICAnQGNvbnRleHRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvY29udGV4dHMnKSxcbiAgICAgICdAaG9va3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcbiAgICAgICdAbW9kZWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvbW9kZWxzJyksXG4gICAgICAnQG9wZW5hcGknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnL3NyYy9vcGVuYXBpJyksXG4gICAgICAnQHBhZ2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvcGFnZXMnKSxcbiAgICAgICdAcm91dGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvcm91dGVzJyksXG4gICAgICAnQHNlcnZlcic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcvc3JjL3NlcnZlcicpLFxuICAgICAgJ0B0ZXN0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy9zcmMvdGVzdCcpLFxuICAgICAgJ0B1dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcvc3JjL3V0aWxzJyksXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIC8vIERvIG5vdCBwcm9jZXNzIGNzcyBmaWxlcyAoaXMgc2xvdylcbiAgICAvLyBjc3M6IHtcbiAgICAvLyAgIGluY2x1ZGU6IC8uKy8sXG4gICAgLy8gfSxcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGNsZWFyTW9ja3M6IHRydWUsXG4gICAgbW9ja1Jlc2V0OiB0cnVlLFxuICAgIHJlcG9ydGVyczogWyd2ZXJib3NlJ10sXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIHByb3ZpZGVyOiAndjgnLCAvLydpc3RhbmJ1bCcsXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24tc3VtbWFyeScsICdqc29uJywgJ2Nsb3ZlcicsICdodG1sJ10sXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAncmVwb3J0cy9jb3ZlcmFnZScsXG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnt0cyx0c3h9J10sXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ3NyYy9vcGVuYXBpLyoqLyonLCAnc3JjL3Rlc3QvKiouKicsICdzcmMvKiovKi5tb2NrLnt0cyx0c3h9J10sXG4gICAgICByZXBvcnRPbkZhaWx1cmU6IHRydWUsXG4gICAgICB0aHJlc2hvbGRzOiB7XG4gICAgICAgIGxpbmVzOiA1MCxcbiAgICAgICAgYnJhbmNoZXM6IDY1LFxuICAgICAgICBmdW5jdGlvbnM6IDQ3LFxuICAgICAgICBzdGF0ZW1lbnRzOiA1MCxcbiAgICAgICAgLy8gYXV0b1VwZGF0ZTogdHJ1ZSwgLy8gVXBkYXRlIHRocmVzaG9sZHMgd2hlbiB3cml0aW5nIHRlc3RzLCBkaXNhYmxlZCBkdWUgdG8gcmVmYWN0b3JpbmcgdGVzdHMgY2hhbmdlcyBjb3ZlcmFnZVxuICAgICAgfSxcbiAgICB9LFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6ICcuL3NyYy90ZXN0L3ZpdGVzdC5zZXR1cC50cycsXG4gICAgaW5jbHVkZTogWydzcmMvKiovKi50ZXN0Lnt0cyx0c3h9J10sXG4gIH0sXG59KVxuIiwgIntcbiAgXCJuYW1lXCI6IFwic2NyZWVuLWdlb21ldHJ5LWFwcFwiLFxuICBcInZlcnNpb25cIjogXCIwLjEyLjNcIixcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9uYWRlci1lbG9zaGFpa2VyL3NjcmVlbi1nZW9tZXRyeS1hcHBcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcIk5hZGVyIEVsb3NoYWlrZXJcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9uYWRlci1lbG9zaGFpa2VyXCJcbiAgfSxcbiAgXCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1AOC4xNC4xXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiPj0yMFwiLFxuICAgIFwicG5wbVwiOiBcIj49OFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgZGV2IC0tYmFzZT0vXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBkZXYgLS1iYXNlPS9cIixcbiAgICBcImJ1aWxkOnByb2RcIjogXCJ0c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZCAtLWJhc2U9L1wiLFxuICAgIFwibGludFwiOiBcImVzbGludCBzcmMgLS1leHQgdHMsdHN4IC0tcmVwb3J0LXVudXNlZC1kaXNhYmxlLWRpcmVjdGl2ZXMgLS1tYXgtd2FybmluZ3MgMFwiLFxuICAgIFwibGludDpmaXhcIjogXCJlc2xpbnQgc3JjIC0tZml4IC0tZXh0IHRzLHRzeCAtLXJlcG9ydC11bnVzZWQtZGlzYWJsZS1kaXJlY3RpdmVzIC0tbWF4LXdhcm5pbmdzIDBcIixcbiAgICBcImZvcm1hdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiZ2VuOnNwZWNcIjogXCJvcnZhbCAtLWNvbmZpZyAuL29ydmFsLmNvbmZpZy50c1wiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5IGluc3RhbGxcIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgLS1jb3ZlcmFnZVwiLFxuICAgIFwidGVzdDp1aVwiOiBcInZpdGVzdCAtLXVpICAtLWNvdmVyYWdlXCIsXG4gICAgXCJ0ZXN0OmNpXCI6IFwidml0ZXN0IC0tcnVuIC0tY292ZXJhZ2VcIixcbiAgICBcInRlc3Q6YmFkZ2VcIjogXCJjb3ZlcmFnZS1iYWRnZXMtY2xpIC0tc291cmNlPXJlcG9ydHMvY292ZXJhZ2UvY292ZXJhZ2Utc3VtbWFyeS5qc29uIC0tb3V0cHV0PWRvY3MvY292ZXJhZ2Uuc3ZnIC0taWNvbj1kb2NzL3ZpdGVzdC5zdmdcIixcbiAgICBcInR5cGVjaGVja1wiOiBcInRzYyAtLXByb2plY3QgdHNjb25maWcuanNvbiAtLW5vRW1pdFwiLFxuICAgIFwic2JcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIixcbiAgICBcInNiOmJ1aWxkXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJyZXBvcnRcIjogXCJwbnBtIHJlcG9ydDpzYiAmJiBwbnBtIHJlcG9ydDp0ZXN0XCIsXG4gICAgXCJyZXBvcnQ6c2JcIjogXCJzdG9yeWJvb2sgYnVpbGQgLS1kb2NzIC0tb3V0cHV0LWRpcj0uL3JlcG9ydHMvc3Rvcnlib29rXCIsXG4gICAgXCJyZXBvcnQ6dGVzdFwiOiBcInBucG0gdGVzdDpjaSAmJiBwbnBtIHRlc3Q6YmFkZ2VcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaG9va2Zvcm0vcmVzb2x2ZXJzXCI6IFwiXjMuMy40XCIsXG4gICAgXCJAcmVhY3QtaG9vay9yZXNpemUtb2JzZXJ2ZXJcIjogXCJeMS4yLjZcIixcbiAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiOiBcIl41LjguN1wiLFxuICAgIFwiYXhpb3NcIjogXCJeMS42LjVcIixcbiAgICBcImF4aW9zLW1vY2stYWRhcHRlclwiOiBcIl4xLjIyLjBcIixcbiAgICBcImNsc3hcIjogXCJeMi4xLjBcIixcbiAgICBcImxvY2FsZm9yYWdlXCI6IFwiXjEuMTAuMFwiLFxuICAgIFwibWluaXNlYXJjaFwiOiBcIl42LjMuMFwiLFxuICAgIFwicGF0aC10by1yZWdleHBcIjogXCJeNi4yLjFcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjIuMFwiLFxuICAgIFwicmVhY3QtaG9vay1mb3JtXCI6IFwiXjcuNDguMlwiLFxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjIxLjFcIixcbiAgICBcInNpbXBsZXItY29sb3JcIjogXCJeMS4wLjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWNoZWNrZXJcIjogXCJeMC42LjJcIixcbiAgICBcIndlYi12aXRhbHNcIjogXCJeMy41LjFcIixcbiAgICBcInl1cFwiOiBcIl4xLjMuM1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tZXNzZW50aWFsc1wiOiBcIl43LjYuN1wiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1pbnRlcmFjdGlvbnNcIjogXCJeNy42LjhcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tbGlua3NcIjogXCJeNy42LjZcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tb25ib2FyZGluZ1wiOiBcIl4xLjAuMTBcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24tdGhlbWVzXCI6IFwiXjcuNi42XCIsXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl43LjYuNlwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdFwiOiBcIl43LjYuNlwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdC12aXRlXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RcIjogXCJeNy42LjZcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvamVzdC1kb21cIjogXCJeNi4xLjZcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvcmVhY3RcIjogXCJeMTQuMS4yXCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3VzZXItZXZlbnRcIjogXCJeMTQuNS4yXCIsXG4gICAgXCJAdHlwZXMvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl42LjExLjNcIixcbiAgICBcIkB0eXBlcy9lc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjMuMS4zXCIsXG4gICAgXCJAdHlwZXMvanNkb21cIjogXCJeMjEuMS4yXCIsXG4gICAgXCJAdHlwZXMvbGludC1zdGFnZWRcIjogXCJeMTMuMi4wXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMS4yXCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMi40NVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjE3XCIsXG4gICAgXCJAdHlwZXMvcmVhY3Qtcm91dGVyLWRvbVwiOiBcIl41LjMuM1wiLFxuICAgIFwiQHR5cGVzL3N0eWxlZC1jb21wb25lbnRzXCI6IFwiXjUuMS4yNlwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4xOC4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuMTAuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4yLjFcIixcbiAgICBcIkB2aXRlc3QvY292ZXJhZ2UtdjhcIjogXCJeMS4yLjBcIixcbiAgICBcIkB2aXRlc3QvdWlcIjogXCJeMS4yLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE2XCIsXG4gICAgXCJjb3ZlcmFnZS1iYWRnZXMtY2xpXCI6IFwiXjEuMi41XCIsXG4gICAgXCJkYWlzeXVpXCI6IFwiXjQuNC4xOVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxuICAgIFwiZXNsaW50LWltcG9ydC1yZXNvbHZlci10eXBlc2NyaXB0XCI6IFwiXjMuNi4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI5LjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4xLjJcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zMy4yXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjVcIixcbiAgICBcImVzbGludC1wbHVnaW4tc3Rvcnlib29rXCI6IFwiXjAuNi4xNVwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4zLjE0LjBcIixcbiAgICBcImh1c2t5XCI6IFwiXjguMC4zXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yMy4wLjFcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMFwiLFxuICAgIFwib3J2YWxcIjogXCJeNi4yMy4wXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjEuMFwiLFxuICAgIFwicHJldHRpZXItcGx1Z2luLW9yZ2FuaXplLWltcG9ydHNcIjogXCJeMy4yLjNcIixcbiAgICBcInN0b3J5Ym9va1wiOiBcIl43LjYuNlwiLFxuICAgIFwic3R5bGVkLWNvbXBvbmVudHNcIjogXCJeNi4xLjZcIixcbiAgICBcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjIuMi4wXCIsXG4gICAgXCJ0YWlsd2luZC1zdHlsZWQtY29tcG9uZW50c1wiOiBcIl4yLjIuMFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcbiAgICBcInZpdGVcIjogXCJeNS4wLjEwXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI6IFwiXjAuNi4yXCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMS4xLjJcIlxuICB9LFxuICBcImJyb3dzZXJzbGlzdFwiOiBbXG4gICAgXCJkZWZhdWx0c1wiXG4gIF0sXG4gIFwibGludC1zdGFnZWRcIjoge1xuICAgIFwiKiovKi57dHMsdHN4LGpzLGpzb24seWFtbH0gIShzcmMvb3BlbmFwaS9nZW5lcmF0ZWQvKiovKilcIjogXCJucG0gcnVuIGxpbnQ6Zml4XCIsXG4gICAgXCIqLnt0cyx0c3gsanMsY3Nzcyxqc29uLHlhbWwsbWQqfVwiOiBcIm5wbSBydW4gZm9ybWF0XCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsZ0JBQWdCLG9CQUFvQjs7O0FDSjdDO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxVQUFZO0FBQUEsRUFDWixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsSUFDUixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsZ0JBQWtCO0FBQUEsRUFDbEIsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLElBQ1IsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULFlBQWM7QUFBQSxJQUNkLEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLFFBQVU7QUFBQSxJQUNWLFNBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLFNBQVc7QUFBQSxJQUNYLE1BQVE7QUFBQSxJ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
