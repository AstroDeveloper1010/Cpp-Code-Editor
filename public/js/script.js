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
    a.download = 'code.cpp';
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
const runCode = () => {
    const codeContent = codeInput.value;

    // Simulate running the code
    const simulatedOutput = `Simulated Output:\n${codeContent}`;
    outputText.textContent = simulatedOutput;
}

// event listener
runBtn.addEventListener('click', runCode);


// adding event listener to tab btn
codeInput.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        tabFunc();
    }
});

// Function to make the tab btn work
const tabFunc = () => {
    const cursorPosition = codeInput.selectionStart;
    const currentValue = codeInput.value;
    const newValue = currentValue.substring(0, cursorPosition) + '\t' + currentValue.substring(cursorPosition);
    codeInput.value = newValue;

    // Update cursor position after pressing tab btn
    codeInput.selectionStart = cursorPosition + 1;
    codeInput.selectionEnd = cursorPosition + 1;
}


// Fetch keywords from keywords.json
async function fetchKeywords() {
    const response = await fetch('/keywords.json');
    const data = await response.json();
    return data.keywords;
}

// function to highlight keywords
async function highlightKeywords() {
    const keywords = await fetchKeywords();
    const codeContent = codeInput.value;

    // regex pattern for all keywords
    const keywordsPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

    // applying css class to mathched keywords
    const highlightedCode = codeContent.replace(keywordsPattern, '<span class="keyword">$&</span>');

    // setting the highlighted code in the textarea
    codeInput.innerHTML = highlightedCode;
}

// event listener
codeInput.addEventListener('input', highlightKeywords);

highlightKeywords();