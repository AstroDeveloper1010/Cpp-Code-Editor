async function keyword_highlight() {
    const response = await fetch('././keywords.json');
    const keywords = await response.json();

    const codeInput = document.querySelector('.code-input');
    const codeLine = codeInput.value.split('\n');

    const highlight_line = codeLine.map(line => {
        keywords.forEach(keyword => {
            line = line.replace(new RegExp(`\\b${keyword}\\b`, 'g'), `<span class="keyword">${keyword}</span>`);
            return line;
        });

        codeInput.innerHTML = highlight_line.join('\n');
    });
};