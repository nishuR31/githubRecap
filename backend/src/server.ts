import app from "./app";
import red from "./utils/redis";
const PORT = process.env.PORT || 4000;

(async function start() {
  await red();
  await db();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
