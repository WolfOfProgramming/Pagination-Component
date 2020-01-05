const paginationComponentPages = document.querySelector(
    '.pagination-component__pages'
);

const checkCounterForRightPagination = (currentElement, maxElement) => {
    return Math.min(currentElement - 2, maxElement - 3);
};

const checkCounterForLeftPagination = currentElement => {
    return Math.max(currentElement + 1, 4);
};

const checkCounterForMiddlePagination = currentElement => {
    return currentElement - 2;
};

const checkPaginationEnd = paginationStart => {
    return paginationStart + 3;
};

const appendFirstElements = () => {
    const firstElements = /* HTML */ `
        <div class="pagination-component__page">1</div>
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
            class="pagination-component__page pagination-component__page--active">${counter}</div>`;
            continue;
        }
        paginationPages += `<div
            class="pagination-component__page">${counter}</div>`;
    }
    paginationComponentPages.insertAdjacentHTML('beforeend', paginationPages);
};

const createLeftActiveSlides = (currentElement, maxElement) => {
    const paginationEnd = checkCounterForLeftPagination(currentElement);
    createPaginationElements(1, paginationEnd, currentElement);
    appendLastElements(maxElement);
};

const createRightActiveSlides = (currentElement, maxElement) => {
    const paginationStart = checkCounterForRightPagination(
        currentElement,
        maxElement
    );
    createPaginationElements(paginationStart, maxElement, currentElement);
    appendFirstElements();
};

const createMiddleActiveSlides = (currentElement, maxElement) => {
    const paginationStart = checkCounterForMiddlePagination(currentElement);
    const paginationEnd = checkPaginationEnd(paginationStart);
    createPaginationElements(paginationStart, paginationEnd, currentElement);
    appendFirstElements();
    appendLastElements(maxElement);
};

const isElementBiggerThanFour = currentElement => {
    return currentElement > 4;
};

const isElementLessThanMaxMinusThree = (currentElement, maxElement) => {
    return currentElement < maxElement - 2;
};

const isMaxElementLessOrEqualThanSix = maxElement => {
    return maxElement <= 6;
};

const isApplicableForLeftActiveSlide = (currentElement, maxElement) => {
    return (
        !isElementBiggerThanFour(currentElement) &&
        isElementLessThanMaxMinusThree(currentElement, maxElement)
    );
};

const isApplicableForRightActiveSlide = (currentElement, maxElement) => {
    return (
        isElementBiggerThanFour(currentElement) &&
        !isElementLessThanMaxMinusThree(currentElement, maxElement)
    );
};

const cleanPagesContainer = () => {
    paginationComponentPages.textContent = '';
};

export const createPagesStructure = (currentElement, maxElement) => {
    cleanPagesContainer();
    if (isMaxElementLessOrEqualThanSix(maxElement)) {
        createPaginationElements(1, maxElement, currentElement);
    } else if (isApplicableForLeftActiveSlide(currentElement, maxElement)) {
        createLeftActiveSlides(currentElement, maxElement);
    } else if (isApplicableForRightActiveSlide(currentElement, maxElement)) {
        createRightActiveSlides(currentElement, maxElement);
    } else {
        createMiddleActiveSlides(currentElement, maxElement);
    }
};

// createPagesStructure(3, 10);
