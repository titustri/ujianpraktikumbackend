const express = require("express");
const PORT = 5000;
const app = express();
const knex = require("./db/knex");
const routerV1 = require('./routes/index')
const bodyParser = require('body-parser')
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require('./swagger_output.json')
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))
app.get("/ping", (req, res) => {
    res.send({
        error: false,
        message: "Server is healthy",
    });
});

//app.listen(PORT, () => {
//    console.log("Server started listening on PORT : "+PORT);
//});

app.listen(PORT, () => {
knex.raw('select 1=1 as test')
.then(result=> { console.log('DB CONNECTION: ',result.rows[0].test)})
.catch(err=>{console.log('ERROR DB:',err)});
console.log("Server started listening on PORT : " + PORT);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
limit: '50mb',
extended: true
}));

app.use('/data/', routerV1);

