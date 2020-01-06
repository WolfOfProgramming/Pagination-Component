const DEFAULT_FIRST_ELEMENT = 1;
const MIN_ELEMENTS_TO_SHOW_FROM_LEFT = 4;
const MIN_ELEMENTS_TO_SHOW_FROM_RIGHT = 3;
const MIN_ELEMENTS_BEFORE_ACTIVE_ELEMENT = 2;
const MIN_ELEMENTS_AFTER_ACTIVE_ELEMENT = 1;
const VISIBLE_ELEMENTS_AFTER_FIRST_ELEMENT_ON_MIDDLE = 3;
const MAX_ELEMENTS_TO_DISPLAY_ALL_ELEMENTS = 6;
const MIN_VALUE_FROM_RIGHT_TO_SHOW_RIGHT_DOTS = 2;

const paginationComponentPages = document.querySelector(
    '.pagination-component__pages'
);

const getPaginationStartWhenLeftDots = (currentElement, maxElement) => {
    return Math.min(
        currentElement - MIN_ELEMENTS_BEFORE_ACTIVE_ELEMENT,
        maxElement - MIN_ELEMENTS_TO_SHOW_FROM_RIGHT
    );
};

const getPaginationStartWhenRightDots = currentElement => {
    return Math.max(
        currentElement + MIN_ELEMENTS_AFTER_ACTIVE_ELEMENT,
        MIN_ELEMENTS_TO_SHOW_FROM_LEFT
    );
};

const getPaginationStartWhenBothDots = currentElement => {
    return currentElement - MIN_ELEMENTS_BEFORE_ACTIVE_ELEMENT;
};

const getPaginationEndWhenBothDots = paginationStart => {
    return paginationStart + VISIBLE_ELEMENTS_AFTER_FIRST_ELEMENT_ON_MIDDLE;
};

const appendFirstElements = () => {
    const firstElements = /* HTML */ `
        <div class="pagination-component__page" id="1">1</div>
        <div
            class="
            pagination-component__page"
        >
            ...
        </div>
    `;
    paginationComponentPages.insertAdjacentHTML('afterbegin', firstElements);
};

const appendLastElements = maxElement => {
    const lastElements = /* HTML */ `
        <div class="pagination-component__page">...</div>
        <div
            class="
            pagination-component__page"
            id="${maxElement}"
        >
            ${maxElement}
        </div>
    `;
    paginationComponentPages.insertAdjacentHTML('beforeend', lastElements);
};

const createPaginationElements = (
    paginationStart,
    paginationEnd,
    currentElement
) => {
    let paginationPages = ``;

    for (let counter = paginationStart; counter <= paginationEnd; counter++) {
        if (currentElement === counter) {
            paginationPages += `<div
            class="pagination-component__page pagination-component__page--active" id="${counter}">${counter}</div>`;
            continue;
        }
        paginationPages += `<div
            class="pagination-component__page" id="${counter}">${counter}</div>`;
    }
    paginationComponentPages.insertAdjacentHTML('beforeend', paginationPages);
};

const addThreeDotsOnRightSide = (currentElement, maxElement) => {
    const paginationEnd = getPaginationStartWhenRightDots(currentElement);
    createPaginationElements(
        DEFAULT_FIRST_ELEMENT,
        paginationEnd,
        currentElement
    );
    appendLastElements(maxElement);
};

const addThreeDotsOnLeftSide = (currentElement, maxElement) => {
    const paginationStart = getPaginationStartWhenLeftDots(
        currentElement,
        maxElement
    );
    createPaginationElements(paginationStart, maxElement, currentElement);
    appendFirstElements();
};

const addThreeDotsOnBothSides = (currentElement, maxElement) => {
    const paginationStart = getPaginationStartWhenBothDots(currentElement);
    const paginationEnd = getPaginationEndWhenBothDots(paginationStart);
    createPaginationElements(paginationStart, paginationEnd, currentElement);
    appendFirstElements();
    appendLastElements(maxElement);
};

const addAllPages = (currentElement, maxElement) => {
    createPaginationElements(DEFAULT_FIRST_ELEMENT, maxElement, currentElement);
};

const canLeftDotsBeShown = currentElement => {
    return currentElement > MIN_ELEMENTS_TO_SHOW_FROM_LEFT;
};

const canRightDotsBeShown = (currentElement, maxElement) => {
    return (
        currentElement < maxElement - MIN_VALUE_FROM_RIGHT_TO_SHOW_RIGHT_DOTS
    );
};

const canAllElementsBeShown = maxElement => {
    return maxElement <= MAX_ELEMENTS_TO_DISPLAY_ALL_ELEMENTS;
};

const isApplicableForAddingRightDots = (currentElement, maxElement) => {
    return (
        !canLeftDotsBeShown(currentElement) &&
        canRightDotsBeShown(currentElement, maxElement)
    );
};

const isApplicableForAddingLeftDots = (currentElement, maxElement) => {
    return (
        canLeftDotsBeShown(currentElement) &&
        !canRightDotsBeShown(currentElement, maxElement)
    );
};

const cleanPagesContainer = () => {
    paginationComponentPages.textContent = '';
};

export const createPagesStructure = (currentElement, maxElement) => {
    cleanPagesContainer();
    if (canAllElementsBeShown(maxElement)) {
        addAllPages(currentElement, maxElement);
    } else if (isApplicableForAddingRightDots(currentElement, maxElement)) {
        addThreeDotsOnRightSide(currentElement, maxElement);
    } else if (isApplicableForAddingLeftDots(currentElement, maxElement)) {
        addThreeDotsOnLeftSide(currentElement, maxElement);
    } else {
        addThreeDotsOnBothSides(currentElement, maxElement);
    }
};
