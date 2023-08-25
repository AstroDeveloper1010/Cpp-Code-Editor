// importing the libraries
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cmd = require('node-cmd');

// initialising our express app
const app = express();

// using cors
app.use(cors());

// setting the view engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// storing the directory path in pathfile
const pathfile = path.join(__dirname, 'public');

// setting our app to use static files (css and js)
app.use(express.static(path.join(pathfile)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requesting index.ejs at the home directory
app.get('/', (req, res) => {
    res.render('index');
});

// running cpp code
app.post('/run', async (req, res) => {
    const code = req.body.code;
    const input = req.body.input;

    try {
        const output = await compileAndExecuteCpp(code, input);
        res.send({
            'error': null,
            'output': output
        });
    } catch (e) {
        res.send({ 'error': e.toString() });
    }
});

// listening at port 4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

// function to compile cpp code
async function compileAndExecuteCpp(code, input) {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(__dirname, 'temp.cpp');
        require('fs').writeFileSync(tempFilePath, code);

        cmd.get(
            `g++ ${tempFilePath} -o ${tempFilePath.replace('.cpp', '')} && ${tempFilePath.replace('.cpp', '')} < input.txt`,
            (err, data, stderr) => {
                if (err || stderr) {
                    reject(err || stderr);
                } else {
                    resolve(data);
                }
            }
        );
    });
}