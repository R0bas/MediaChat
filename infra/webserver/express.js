const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { corsOptions, fileLimit ,publicFolder} = require("../../config/config");

function expressConfig(app) {
    app.use(bodyParser.json({ limit: fileLimit }));
    app.use(express.static(publicFolder));
    app.use(cors(corsOptions));
}

module.exports = { expressConfig }