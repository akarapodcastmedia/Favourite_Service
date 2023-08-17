require("dotenv").config();
// express
const express = require("express");
const cors = require("cors");
const favourite = express();
favourite.use(express.json());
favourite.use(express.urlencoded({extended : true}));
const router = require("./route");
favourite.use(cors());

const {middlewarer}  = require('./util/middleware');
// swagger configurationm \
//==========================
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const fs = require("fs");
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
favourite.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
//==========================
favourite.use('/favourite',middlewarer,router);
favourite.listen(process.env.PORT,()=>console.log(`Favourite service is being listened at PORT ${process.env.PORT} `));
