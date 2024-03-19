const fs = require("fs");
const path = require("path");
const authRoutes = require("./authRoutes");
const loadAppRoutes = (app) => {
  const loadRoutes = (baseRoute, routesPath) => {
    const files = fs.readdirSync(routesPath).sort();
    files.forEach((file) => {
      if (file.endsWith(".js")) {
        const routePath = path.join(routesPath, file);
        const route = require(routePath);
        const routeName = file.replace(".js", "");
        app.use(`/${baseRoute}/${routeName}`, route);
      }
    });
  };
  // auth routes
  loadRoutes("v1", authRoutes);
};
// 'http:localhost:3000/v1/auth/'
module.exports = {
  loadAppRoutes,
};
