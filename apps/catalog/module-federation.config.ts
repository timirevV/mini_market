import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "catalog",
  filename: "remoteEntry.js",
  exposes: {
    "./Catalog": "./src/pages/Catalog/index.tsx",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});