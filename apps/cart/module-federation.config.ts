import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

export default createModuleFederationConfig({
  name: "cart",
  filename: "remoteEntry.js",
  exposes: {
    './Cart': './src/components/Cart.tsx', 
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});
