// (function(exports, require, module, __filename, __dirname) { ... });
// Node.js treats each JavaScript file as a separate module.
// The entire code written inside a module is private to the module, unless explicitly stated (exported) otherwise.

const http = require("http");
const fs = require("fs");

const HOSTNAME = process.env.HOSTNAME || "localhost";
process.env.PORT = 3000;
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // to return html, just change content type to "text/html" to render plain text, "text/plain"
  res.setHeader("Content-Type", "text/html");

  let path = "./";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
