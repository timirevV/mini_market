import { createModuleFederationConfig } from "@module-federation/rsbuild-plugin";

const CATALOG_REMOTE =
  process.env.CATALOG_REMOTE || "http://localhost:3001/remoteEntry.js";
const CART_REMOTE =
  process.env.CART_REMOTE || "http://localhost:3002/remoteEntry.js";

export default createModuleFederationConfig({
  name: "host",
  remotes: {
    catalog: `catalog@${CATALOG_REMOTE}`,
    cart: `cart@${CART_REMOTE}`,
  },
  shareStrategy: "loaded-first",
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});
