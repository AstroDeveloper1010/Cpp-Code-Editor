const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { stderr } = require('process');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

const pathfile = path.join(__dirname, 'public');

app.use(express.static(path.join(pathfile)));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/run', (req, res) => {
    const code = req.body.code;

    exec('g++ -o output code.cpp && ./output', (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: stderr });
        }
        else {
            res.status(200).json({ output: stdout });
        }
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});