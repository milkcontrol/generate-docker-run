const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config();

const routes = require("./starts/routes");
const cors = require("cors");
// const cookieParser = require('cookie-parser')


const main = async () => {
    const server = express();
    server.use(cors());
    const port = process.env.PORT
    server.use(bodyParser.json());
    server.use(express.urlencoded({
        extended: true
    }))

    // server.use(express.static("uploads"));
    routes(server)
    
    server.listen(port || 3000, (err) => {
        if (err) throw err
        console.log(`Example app listening on port ${port || 3000}`)
    })
}

main()
