// declare variables
const codeInput = document.querySelector('.code-input');
const lineNumber = document.querySelector('.line-number');
const downloadBtn = document.querySelector('.btn_download');


// Function to update line numbers
const updateLineNumbers = () => {
    const lines = codeInput.value.split('\n');
    const lineNumbersHTML = lines.map((_, index) => `<div>${index + 1}</div>`).join('');
    lineNumber.innerHTML = lineNumbersHTML;
}

// event listeners
codeInput.addEventListener('input', updateLineNumbers);
window.addEventListener('load', updateLineNumbers);


// Function to handle download
function downloadCode() {
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

// Attach event listener to the button
downloadBtn.addEventListener('click', downloadCode);