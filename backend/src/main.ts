import express from "express";
import os from "node:os";

function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface] ?? []) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "0.0.0.0";
}

const app = express();
const port = 5000;
const host = getPrivateIP();

app.get("/", (req, res) => {
  res.send({ message: "Jaja" });
});

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
