import dataServiceApp from "./app.js";

const PORT = process.env.DATA_SERVICE_PORT || 4001;

dataServiceApp.listen(PORT, () => {
  console.log(` DataService running on port ${PORT}`);
});
