const routeDockerRun = require("../routes/dockerRun")

const routes = (app)=>{ 
    app.use("/docker-run", routeDockerRun)

    app.get("/heal-check", (req, res) => {
      res.status(200).send("ok");
    });
}

module.exports = routes