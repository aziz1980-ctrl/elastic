const investegation = require("./handlers/investegation");
const search = require("./handlers/search");
const welcome = require("./handlers/welcome");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    welcome(request, response);
  } else if (url === "/load") {
    investegation(request, response);
  } else if (url.includes("/search?name=")) {
    search(request, response);
  }
}

module.exports = router;
