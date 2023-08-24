// declare variables
const editorContainer = document.querySelector(".editor-container");
const runBtn = document.querySelector('.btn_run');
const clearBtn = document.querySelector('.btn_clear');
const codeInput = document.querySelector('.code-input');
const outputArea = document.querySelector('.ouput');
const lineNumberDiv = document.querySelector(".line-number");
const toggleButton = document.querySelector(".btn_toggle");


// on clicking run btn
runBtn.addEventListener('click', () => {
    const code = codeInput.value;

    fetch('/run', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
        .then(response => response.json())
        .then(data => {
            outputArea.textContent = data.output;
        })
        .catch(error => {
            console.error(`Error: ${error}`);
            outputArea.textContent = 'Output will appear here...';
        });
});


// on clicking clear btn
clearBtn.addEventListener('click', () => {
    codeInput.value = '';
});


// updating line number
codeInput.addEventListener('click', (updateLineNumber));

const updateLineNumber = () => {
    const line = codeInput.value.split("\n");
    const lineNumberHTML = line.map((_, index) => `<span>${index + 1}</span>`).join("");
    lineNumberDiv.innerHTML = lineNumberHTML;
}

updateLineNumber();


// function to change theme of the code editor
toggleButton.addEventListener("click", toggleTheme);

const toggleTheme = () => {
    editorContainer.classList.toggle("dark-theme");
}