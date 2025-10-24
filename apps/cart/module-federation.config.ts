import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "cart",
  filename: "remoteEntry.js",
  exposes: {
    "./Cart": "./src/App.tsx",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});
