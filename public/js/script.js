// declare variables
const editorContainer = document.querySelector(".editor-container");
const runBtn = document.querySelector('.btn_run');
const clearBtn = document.querySelector('.btn_clear');
const downloadBtn = document.querySelector('.btn_download');
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


// donwloading code written by the user
downloadBtn.addEventListener("click", downloadCode);

const downloadCode = () => {
    const code = codeInput.value;
    const blob = new Blob([code], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "my_code.cpp";
    link.click();

    URL.revokeObjectURL(link.href);
}


// auto complete and intendation function
codeInput.addEventListener('input', autoComplete);

const autoComplete = () => {
    const indentSize = 4;
    const lines = codeInput.value.split("\n");

    for (let i = 1; i < lines.length; i++) {
        if (lines[i - 1].trim().endsWith("{")) {
            lines[i] = " ".repeat(indentSize) + lines[i];
        }
    }

    codeInput.value = lines.join("\n");
}


// tab btn space feature
codeInput.addEventListener("keydown", tabBtnSpace);

const tabBtnSpace = () => {
    if (e.key === "Tab") {
        e.preventDefault();

        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;

        codeInput.value = codeInput.value.substring(0, start) + "    " + codeInput.value.substring(end);

        codeInput.selectionStart = codeInput.selectionEnd = start + 4;
    }
}