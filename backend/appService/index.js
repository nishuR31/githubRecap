import app from "./config/app.js";
import "../sharedService/config/env.js";

import handler from "../sharedService/utils/handler.js";

export default function appService() {
  return handler(() => {
    const port = process.env.PORT || process.env.APP_PORT || 4001;
    app.listen(port, "0.0.0.0", () => {
      console.log(`App service running on port ${port}`);
    });
  })();
}

await appService();
