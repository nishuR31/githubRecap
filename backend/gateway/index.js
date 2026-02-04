import gatewayApp from "./app.js";

const PORT = process.env.GATEWAY_PORT || 3000;

gatewayApp.listen(PORT, () => {
  console.log(`🚀 Gateway is running on port ${PORT}`);
  console.log(`📡 AppService available at: http://localhost:4000`);
  console.log(`📡 DataService available at: http://localhost:4001`);
});
