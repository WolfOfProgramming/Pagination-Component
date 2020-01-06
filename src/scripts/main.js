import { renderButton } from './renderButton';
import { renderForm } from './renderForm';
import { createPagesStructure } from './renderPages';
import debounce from 'lodash/debounce';

const DEFAULT_FIRST_ELEMENT = 1;
const DEFAULT_MAX_PAGE = 10;
const MAX_PAGE_LIMIT = 999;

const paginationComponentContainer = document.querySelector(
    '.pagination-component__container'
);
renderButton('left', paginationComponentContainer);
renderButton('right', paginationComponentContainer);

const paginationComponent = document.querySelector('.pagination-component');

renderForm(paginationComponent);

const leftButton = paginationComponent.querySelector(
    '.pagination-component__button--left'
);
const rightButton = paginationComponent.querySelector(
    '.pagination-component__button--right'
);
const paginationComponentInput = paginationComponent.querySelector(
    '.pagination-component__input'
);

let currentElement = DEFAULT_FIRST_ELEMENT;
let maxElement = DEFAULT_MAX_PAGE;

const updateCurrentElement = () => {
    const url = new URL(document.URL);
    if (url.searchParams.has('p') && !isNaN(url.searchParams.get('p'))) {
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

const addClickEventsOnPages = maxElement => {
    const pages = document.querySelectorAll('.pagination-component__page');
    pages.forEach(page => {
        page.addEventListener('click', () => {
            if (page.id && page.id !== currentElement) {
                currentElement = Number(page.id);
                renderPages(currentElement, maxElement);
                updateURL(currentElement);
            }
        });
    });
};

const disableButtonEffects = () => {
    leftButton.classList.remove('pagination-component__button--disabled');
    rightButton.classList.remove('pagination-component__button--disabled');
};

const updateButtonsState = (currentElement, maxElement) => {
    disableButtonEffects();
    if (currentElement === maxElement) {
        rightButton.classList.add('pagination-component__button--disabled');
    } else if (currentElement === 1) {
        leftButton.classList.add('pagination-component__button--disabled');
    }
};

const renderPages = (currentElement, maxElement) => {
    updateButtonsState(currentElement, maxElement);
    updateURL(currentElement);
    createPagesStructure(currentElement, maxElement);
    addClickEventsOnPages(maxElement);
};

const fixValidationOfCurrentElement = () => {
    if (isTooSmall(currentElement)) {
        currentElement = 1;
    } else if (isTooBig(currentElement, maxElement)) {
        currentElement = maxElement;
    }
};

const updateMaxElement = () => {
    const newValue = paginationComponentInput.value;
    if (!isNaN(newValue) && newValue) {
        maxElement =
            Number(newValue) <= MAX_PAGE_LIMIT
                ? Math.round(Number(newValue))
                : MAX_PAGE_LIMIT;
        if (isTooSmall(maxElement)) {
            maxElement = DEFAULT_FIRST_ELEMENT;
        }
        fixValidationOfCurrentElement();
        renderPages(currentElement, maxElement);
    }
};

const loadPreviousPage = () => {
    if (!isTooSmall(currentElement)) {
        currentElement = Number(currentElement) - 1;
    } else {
        fixValidationOfCurrentElement();
    }
    renderPages(currentElement, maxElement);
};

const loadNextPage = () => {
    if (!isTooBig(currentElement, maxElement)) {
        currentElement = Number(currentElement) + 1;
    } else {
        fixValidationOfCurrentElement();
    }
    renderPages(currentElement, maxElement);
};

document.addEventListener('keydown', e => {
    if (e.keyCode === 37) {
        loadPreviousPage();
    } else if (e.keyCode === 39) {
        loadNextPage();
    }
});

leftButton.addEventListener('click', loadPreviousPage);

rightButton.addEventListener('click', loadNextPage);

paginationComponentInput.addEventListener(
    'input',
    debounce(updateMaxElement, 1000)
);

updateCurrentElement();
if (isTooBig(currentElement, maxElement) || isTooSmall(currentElement)) {
    fixValidationOfCurrentElement();
}
renderPages(currentElement, maxElement);
