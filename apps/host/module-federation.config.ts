import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    cart: "cart@http://localhost:3002/remoteEntry.js",
    catalog: "catalog@http://localhost:3001/remoteEntry.js",
  },
  shareStrategy: "loaded-first",
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});
