// declare variables
const editorContainer = document.querySelector('.editor-container');
const codeInput = document.querySelector('.code-input');
const lineNumber = document.querySelector('.line-number');
const runBtn = document.querySelector('.btn_run');
const outputText = document.getElementById('output-text');
const downloadBtn = document.querySelector('.btn_download');
const clearBtn = document.querySelector('.btn_clear');
const themeBtn = document.querySelector('.btn_toggle');


// Clear the code on clicking clear btn
clearBtn.addEventListener('click', () => {
    codeInput.value = '';
})


// Function to update line numbers
const updateLineNumbers = () => {
    const lines = codeInput.value.split('\n');
    const lineNumbersHTML = lines.map((_, index) => `<div>${index + 1}</div>`).join('');
    lineNumber.innerHTML = lineNumbersHTML;
}

// event listener
codeInput.addEventListener('input', updateLineNumbers);
window.addEventListener('load', updateLineNumbers);


// Function to handle download
const downloadCode = () => {
    const codeContent = codeInput.value;
    const blob = new Blob([codeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.cpp'; // Change the filename as needed
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// event listener
downloadBtn.addEventListener('click', downloadCode);


// Function to toggle themes
const toggleTheme = () => {
    editorContainer.classList.toggle('dark-theme');
    editorContainer.classList.toggle('light-theme');
}

// event listener
themeBtn.addEventListener('click', toggleTheme);


// Function to simulate code execution
function runCode() {
    const codeContent = codeInput.value;

    // Simulate running the code
    const simulatedOutput = `Simulated Output:\n${codeContent}`;
    outputText.textContent = simulatedOutput;
}

// Attach event listener to the button
runBtn.addEventListener('click', runCode);