import { createApp } from "./app.mjs";
import { config } from "./config/env.mjs";

// =========================================
// SERVER
// =========================================

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`DREAMS API listening on port ${config.port}`);
});

// =========================================
// GRACEFUL SHUTDOWN
// =========================================

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    console.log(`${signal} received. Closing DREAMS API...`);

    server.close((error) => {
      if (error) {
        console.error("Failed to close server:", error);
        process.exitCode = 1;
        return;
      }

      console.log("DREAMS API closed successfully.");
    });
  });
}
