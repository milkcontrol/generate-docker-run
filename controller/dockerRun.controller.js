var fs = require("fs");
const yaml = require("js-yaml");

const generateDR = async (req, res) => {
  try {
    const file = req.file;
    let containerName = "";
    let command;
    let image;

    // const filePath = `${process.env.API_URL}/${file.path}`
    const listDockerRun = [];
    const doc = yaml.load(
      fs.readFileSync(`${__dirname}/../uploads/${file.originalname}`, "utf8")
    );
    for (const service of Object.keys(doc.services)) {
      let cmdDockerRun = `docker run `;
      containerName = `--name ${service}`;
      const dataService = doc.services[service];
      const dataAttributes = Object.keys(dataService);
      console.log("dataAttributes: ", dataAttributes);
      for (const attribute of dataAttributes) {
        switch (attribute) {
          case "container_name":
            containerName = `--name ${dataService[attribute]}`;
            break;
          case "environment":
            console.log("environment", dataService[attribute]);
            for (const env of dataService[attribute]) {
              cmdDockerRun += `-e ${env}` + " ";
            }
            // cmdDockerRun += `--env ${service.attribute}}`;
            break;
          case "env_file":
            cmdDockerRun += `--env-file ${dataService[attribute]}`;
            break;
          case "links":
            cmdDockerRun += `--link ${service.attribute}`;
            for (const link of dataService[attribute]) {
              cmdDockerRun += ` ${link}` + " ";
            }
            break;
          case "cap-add":
            for (const capAdd of dataService[attribute]) {
              cmdDockerRun += `--cap-add ${capAdd}` + " ";
            }
            break;
          case "networks":
            console.log("%%%%%%%%%%", dataService[attribute]);

            const dataNetwork = Object.keys(dataService[attribute]);
            console.log("%%%%%%%%%%", dataNetwork);
            for (const net of dataNetwork) {
              cmdDockerRun += `--net ${net}` + " ";
            }
            break;
          case "tty":
            cmdDockerRun += `--tty ${dataService[attribute]}`;
            break;
          case "volumes":
            for (const volume of dataService[attribute]) {
              cmdDockerRun += `-v ${volume}` + " ";
            }
            break;
          case "ports":
            for (const port of dataService[attribute]) {
              cmdDockerRun += `-p ${port}` + " ";
            }
            break;
          case "image":
            // cmdDockerRun += `${dataService[attribute]}`+ ' ';
            image = dataService[attribute];
            break;
          case "command":
            // cmdDockerRun += `${dataService[attribute]}`;
            command = dataService[attribute];
            break;
        }
      }
      cmdDockerRun += containerName + " " + image + `${command ? command : ""}`;
      listDockerRun.push(cmdDockerRun);
    }
    res.send(listDockerRun);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

module.exports = {
  generateDR,
};
