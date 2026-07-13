#!/usr/bin/env node

/** Compatibility wrapper. The maintained importer is the Python script. */

import { spawnSync } from "node:child_process";

const result = spawnSync("python3", ["scripts/fetch_pharmacy_data.py"], {
  cwd: new URL("..", import.meta.url),
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exitCode = 1;
} else if (result.status !== 0) {
  process.exitCode = result.status ?? 1;
} else {
  const verification = spawnSync(
    process.execPath,
    ["scripts/verify-content.mjs"],
    {
      cwd: new URL("..", import.meta.url),
      stdio: "inherit",
    }
  );
  if (verification.error) {
    console.error(verification.error.message);
    process.exitCode = 1;
  } else {
    process.exitCode = verification.status ?? 1;
  }
}
