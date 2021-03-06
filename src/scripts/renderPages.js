const DEFAULT_FIRST_ELEMENT = 1;
const MIN_ELEMENTS_TO_SHOW_FROM_LEFT = 4;
const MIN_ELEMENTS_TO_SHOW_FROM_RIGHT = 3;
const MIN_ELEMENTS_BEFORE_ACTIVE_ELEMENT = 2;
const MIN_ELEMENTS_AFTER_ACTIVE_ELEMENT = 1;
const VISIBLE_ELEMENTS_AFTER_FIRST_ELEMENT_ON_MIDDLE = 3;
const MAX_ELEMENTS_TO_DISPLAY_ALL_ELEMENTS = 6;
const MIN_VALUE_FROM_RIGHT_TO_SHOW_RIGHT_DOTS = 2;

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

const getFirstElementsTemplate = () => {
    const firstElements = /* HTML */ `
        <li
            class="pagination-component__page"
            id="1"
            data-testid="pagination-page"
        >
            <a class="pagination-component__link">1</a>
        </li>
        <li
            class="
            pagination-component__page"
            data-testid="pagination-page"
        >
            <a class="pagination-component__link">...</a>
        </li>
    `;
    return firstElements;
};

const getLastElementsTemplate = maxElement => {
    const lastElements = /* HTML */ `
        <li class="pagination-component__page" data-testid="pagination-page">
            <a class="pagination-component__link">...</a>
        </li>
        <li
            data-testid="pagination-page"
            class="
            pagination-component__page"
            id="${maxElement}"
        >
            <a class="pagination-component__link">${maxElement}</a>
        </li>
    `;
    return lastElements;
};

const getActivePage = counter => {
    return /* HTML */ `
        <li
            class="pagination-component__page pagination-component__page--active"
            id="${counter}"
            data-testid="pagination-page"
        >
            <a class="pagination-component__link">${counter}</a>
        </li>
    `;
};

const getRegularPage = counter => {
    return /* HTML */ `
        <li
            class="pagination-component__page"
            id="${counter}"
            data-testid="pagination-page"
        >
            <a class="pagination-component__link">${counter}</a>
        </li>
    `;
};

const getPaginationElements = (
    paginationStart,
    paginationEnd,
    currentElement
) => {
    let paginationPages = ``;

    for (let counter = paginationStart; counter <= paginationEnd; counter++) {
        if (currentElement === counter) {
            paginationPages += getActivePage(counter);
            continue;
        }
        paginationPages += getRegularPage(counter);
    }
    return paginationPages;
};

const addThreeDotsOnRightSide = (currentElement, maxElement) => {
    const paginationEnd = getPaginationStartWhenRightDots(currentElement);
    let paginationPages = getPaginationElements(
        DEFAULT_FIRST_ELEMENT,
        paginationEnd,
        currentElement
    );
    paginationPages += getLastElementsTemplate(maxElement);
    return paginationPages;
};

const addThreeDotsOnLeftSide = (currentElement, maxElement) => {
    const paginationStart = getPaginationStartWhenLeftDots(
        currentElement,
        maxElement
    );
    let paginationPages = getFirstElementsTemplate();
    paginationPages += getPaginationElements(
        paginationStart,
        maxElement,
        currentElement
    );
    return paginationPages;
};

const addThreeDotsOnBothSides = (currentElement, maxElement) => {
    const paginationStart = getPaginationStartWhenBothDots(currentElement);
    const paginationEnd = getPaginationEndWhenBothDots(paginationStart);
    let paginationPages = getFirstElementsTemplate();
    paginationPages += getPaginationElements(
        paginationStart,
        paginationEnd,
        currentElement
    );
    paginationPages += getLastElementsTemplate(maxElement);
    return paginationPages;
};

const getAllPages = (currentElement, maxElement) => {
    return getPaginationElements(
        DEFAULT_FIRST_ELEMENT,
        maxElement,
        currentElement
    );
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

export const createPagesStructure = (currentElement, maxElement) => {
    if (canAllElementsBeShown(maxElement)) {
        return getAllPages(currentElement, maxElement);
    }
    if (isApplicableForAddingRightDots(currentElement, maxElement)) {
        return addThreeDotsOnRightSide(currentElement, maxElement);
    }
    if (isApplicableForAddingLeftDots(currentElement, maxElement)) {
        return addThreeDotsOnLeftSide(currentElement, maxElement);
    } else {
        return addThreeDotsOnBothSides(currentElement, maxElement);
    }
};
