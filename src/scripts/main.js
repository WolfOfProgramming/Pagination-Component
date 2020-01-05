import './renderButton';
import './renderForm';
import './renderPages';
import { createPagesStructure } from './renderPages';

const paginationComponent = document.querySelector('.pagination-component');
const DEFAULT_ELEMENT = 1;
const DEFAULT_MAX_PAGE = 10;
const leftButton = paginationComponent.querySelector(
    '.pagination-component__button--left'
);
const rightButton = paginationComponent.querySelector(
    '.pagination-component__button--right'
);

const paginationComponentInput = paginationComponent.querySelector(
    '.pagination-component__input'
);

let currentElement = DEFAULT_ELEMENT;
let maxElement = DEFAULT_MAX_PAGE;

const updateCurrentElement = () => {
    const url = new URL(document.URL);
    if (url.searchParams.has('p')) {
        console.log(currentElement);
        currentElement = Number(url.searchParams.get('p'));
    }
};

const updateURL = currentElement => {
    const url = new URL(`?p=${currentElement}`, document.URL);
    window.history.pushState('', '', url);
};

const isTooBig = (currentElement, maxElement) => {
    return currentElement >= maxElement;
};

const isTooSmall = currentElement => {
    return currentElement <= 1;
};

const renderPages = (currentElement, maxElement) => {
    updateURL(currentElement);
    createPagesStructure(currentElement, maxElement);
};

const checkCurrentElementValidation = () => {
    if (isTooSmall(currentElement)) {
        currentElement = 1;
        leftButton.classList.remove('pagination-component__button--disabled');
    }
    if (isTooBig(currentElement, maxElement)) {
        currentElement = maxElement;
        rightButton.classList.add('pagination-component__button--disabled');
    }
};

leftButton.addEventListener('click', () => {
    currentElement -= 1;
    checkCurrentElementValidation();
    rightButton.classList.remove('pagination-component__button--disabled');
    renderPages(currentElement, maxElement);
});

rightButton.addEventListener('click', () => {
    currentElement += 1;
    checkCurrentElementValidation();
    leftButton.classList.remove('pagination-component__button--disabled');
    renderPages(currentElement, maxElement);
});

paginationComponentInput.addEventListener('blur', () => {
    const newValue = paginationComponentInput.value;
    if (!isNaN(newValue)) {
        maxElement = newValue;
        renderPages(currentElement, maxElement);
    }
});

updateCurrentElement();
checkCurrentElementValidation();
renderPages(currentElement, maxElement);
