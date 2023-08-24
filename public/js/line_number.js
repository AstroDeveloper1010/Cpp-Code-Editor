// declare variables
const lineNumberDiv = document.querySelector('.line-number');

const updateLineNumber = () => {
    const codeInput = document.querySelector('.code-input');
    const codeLine = codeInput.value.split('\n');
    const lineNumber = codeLine.map((_, index) => index + 1);

    lineNumberDiv.innerHTML = lineNumber.join(`<br>`);
};

const codeInput = document.querySelector('.code-input');
codeInput.addEventListener('input', updateLineNumber);
