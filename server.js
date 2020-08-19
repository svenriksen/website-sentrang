const express = require('express');
const app = express();
const initRoutes = require('./routes/routes');

app.use(express.urlencoded({extended: true}));

initRoutes(app);

const port = 8080
app.listen(port, () => {
    console.log(`I'm running at localhost:${port}/`);
})