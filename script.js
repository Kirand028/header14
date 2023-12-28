let history = [];
let currentIndex = -1;
let ignoreChanges = false;

function addText() {
const text = document.getElementById('textInput').value.trim();
if (text !== '') {
    saveState(text);
    displayState();
}
}

function saveState(text) {
if (!ignoreChanges) {
    const state = {
        text: text,
        color: document.getElementById('textContainer').style.color,
        fontSize: document.getElementById('textContainer').style.fontSize,
        fontFamily: document.getElementById('textContainer').style.fontFamily,
    };
    history = history.slice(0, currentIndex + 1);
    history.push(state);
    currentIndex++;
}
}

function undo() {
if (currentIndex > 0) {
    currentIndex--;
    ignoreChanges = true;
    displayState();
    ignoreChanges = false;
}
}

function redo() {
if (currentIndex < history.length - 1) {
    currentIndex++;
    ignoreChanges = true;
    displayState();
    ignoreChanges = false;
}
}

function changeColor(color) {
    document.getElementById('textContainer').style.color = color;
    saveState(getText());
}

function changeFontSize(size) {
    document.getElementById('textContainer').style.fontSize = `${size}px`;
    saveState(getText());
}

function changeFontFamily(font) {
    document.getElementById('textContainer').style.fontFamily = font;
    saveState(getText());
}

function getText() {
    return document.getElementById('textContainer').innerHTML;
}

function displayState() {
    const state = history[currentIndex];
    if (state) {
        document.getElementById('textContainer').innerHTML = state.text;
        document.getElementById('textContainer').style.color = state.color;
        document.getElementById('textContainer').style.fontSize = state.fontSize;
        document.getElementById('textContainer').style.fontFamily = state.fontFamily;
    }
}