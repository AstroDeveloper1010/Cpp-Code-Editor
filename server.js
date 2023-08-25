// importing the libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cpp = require('./lib/cpp.js');
// const iL = require('./lib/interpretedLang.js');
// const { createUnique } = require('./lib/randomString.js');
const cors = require('cors');

// initialising our express app
const app = express();

// setting the view engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// storing the directory path in pathfile
const pathfile = path.join(__dirname, 'public');

// setting our app to use static files (css and js)
app.use(express.static(path.join(pathfile)));
app.use(express.json());
app.use(express.urlencoded());

// requesting index.ejs at the home directory
app.get('/', (req, res) => {
    res.render('index');
});

// running cpp code
app.post('/run', async (req, res) => {
    const code = req.body.code;
    const input = req.body.input;

    try {
        const name = createUnique();
        const compile = await cpp.writeCode(code);
        const execCode = await compile(name);
        const data = await execCode(name, input);

        res.send({
            'error': null,
            'output': data
        })
    }
    catch (e) {
        res.send({ 'error': e.toString() });
    }
});

// listening at port 4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});