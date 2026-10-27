const http = require("node:http");
const fs = require("node:fs");

const folder = "/app/data";
const file = folder + "/visits.txt";

// Create the data folder if it does not exist.
fs.mkdirSync(folder, { recursive: true });

// Load the saved counter when the application starts.
let visits = 0;

if (fs.existsSync(file)) {
  visits = Number(fs.readFileSync(file, "utf8"));
}

const server = http.createServer((req, res) => {
  // Count only requests for the home page.
  if (req.method !== "GET" || req.url !== "/") {
    res.writeHead(404);
    return res.end("Not found");
  }

  visits++;
  fs.writeFileSync(file, String(visits));

  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });

  res.end(`
    <h1>My Docker Compose Demo</h1>
    <p>Name: Juan Dela Cruz</p>
    <p>Visits: ${visits}</p>
    <p>Refresh this page to increase the counter.</p>
  `);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Application running on port 3000");
});
