import { renderButton } from './renderButton';
import { renderForm } from './renderForm';
import { createPagesStructure } from './renderPages';
import debounce from 'lodash/debounce';

export function renderMain(paginationDOM) {
    const DEFAULT_FIRST_ELEMENT = 1;
    const DEFAULT_MAX_PAGE = 10;
    const MAX_PAGE_LIMIT = 999;

    const paginationComponentContainer = paginationDOM.querySelector(
        '.pagination-component__container'
    );
    paginationComponentContainer.insertAdjacentHTML(
        'afterbegin',
        renderButton('prev')
    );
    paginationComponentContainer.insertAdjacentHTML(
        'afterbegin',
        renderButton('next')
    );

    const paginationComponent = paginationDOM.querySelector(
        '.pagination-component'
    );
    paginationComponent.insertAdjacentHTML('afterbegin', renderForm());

    const paginationComponentPages = paginationDOM.querySelector(
        '.pagination-component__pages'
    );
    const btnPrev = paginationComponent.querySelector(
        '.pagination-component__button--prev'
    );
    const btnNext = paginationComponent.querySelector(
        '.pagination-component__button--next'
    );
    const paginationComponentInput = paginationComponent.querySelector(
        '.pagination-component__input'
    );

    let currentElement = DEFAULT_FIRST_ELEMENT;
    let maxElement = DEFAULT_MAX_PAGE;

    const getCurrentElement = () => {
        const url = new URL(window.location.href);
        if (url.searchParams.has('p') && !isNaN(url.searchParams.get('p'))) {
            return Number(url.searchParams.get('p'));
        }
    };

    const cleanPagesContainer = () => {
        paginationComponentPages.textContent = '';
    };

    const updateURL = currentElement => {
        const url = new URL(`?p=${currentElement}`, window.location.href);
        window.history.pushState('', '', url);
    };

    const isTooBig = (currentElement, maxElement) => {
        return currentElement >= maxElement;
    };

    const isTooSmall = currentElement => {
        return currentElement <= 1;
    };

    const addClickEventsOnPages = maxElement => {
        const pages = paginationDOM.querySelectorAll(
            '.pagination-component__page'
        );
        pages.forEach(page => {
            page.addEventListener('click', () => {
                if (page.id && page.id !== currentElement) {
                    currentElement = Number(page.id);
                    const paginationPages = renderPages(
                        currentElement,
                        maxElement
                    );
                    paginationComponentPages.insertAdjacentHTML(
                        'afterbegin',
                        paginationPages
                    );
                    addClickEventsOnPages(maxElement);
                }
            });
        });
    };

    const disableButtonEffects = () => {
        btnPrev.classList.remove('pagination-component__button--disabled');
        btnNext.classList.remove('pagination-component__button--disabled');
    };

    const updateButtonsState = (currentElement, maxElement) => {
        disableButtonEffects();
        if (currentElement === maxElement) {
            btnNext.classList.add('pagination-component__button--disabled');
        }
        if (currentElement === 1) {
            btnPrev.classList.add('pagination-component__button--disabled');
        }
    };

    const renderPages = (currentElement, maxElement) => {
        cleanPagesContainer();
        updateButtonsState(currentElement, maxElement);
        updateURL(currentElement);
        return createPagesStructure(currentElement, maxElement);
    };

    const getValidatedCurrentElement = (currentElement, maxElement) => {
        if (isTooSmall(currentElement)) {
            return 1;
        } else if (isTooBig(currentElement, maxElement)) {
            return maxElement;
        } else {
            return currentElement;
        }
    };

    const updateMaxElement = e => {
        const newValue = e.target.value;
        if (!isNaN(newValue) && newValue) {
            maxElement =
                Number(newValue) <= MAX_PAGE_LIMIT
                    ? Math.round(Number(newValue))
                    : MAX_PAGE_LIMIT;

            if (isTooSmall(maxElement)) {
                maxElement = DEFAULT_FIRST_ELEMENT;
            }

            currentElement = getValidatedCurrentElement(
                currentElement,
                maxElement
            );
            const paginationPages = renderPages(currentElement, maxElement);
            paginationComponentPages.insertAdjacentHTML(
                'afterbegin',
                paginationPages
            );

            addClickEventsOnPages(maxElement);
        }
    };

    const loadPreviousPage = () => {
        if (!isTooSmall(currentElement)) {
            currentElement = Number(currentElement) - 1;
        } else {
            currentElement = getValidatedCurrentElement(
                currentElement,
                maxElement
            );
        }

        const paginationPages = renderPages(currentElement, maxElement);
        paginationComponentPages.insertAdjacentHTML(
            'afterbegin',
            paginationPages
        );
        addClickEventsOnPages(maxElement);
    };

    const loadNextPage = () => {
        if (!isTooBig(currentElement, maxElement)) {
            currentElement = Number(currentElement) + 1;
        } else {
            currentElement = getValidatedCurrentElement(
                currentElement,
                maxElement
            );
        }

        const paginationPages = renderPages(currentElement, maxElement);
        paginationComponentPages.insertAdjacentHTML(
            'afterbegin',
            paginationPages
        );
        addClickEventsOnPages(maxElement);
    };

    paginationDOM.addEventListener('keydown', e => {
        if (e.keyCode === 37) {
            loadPreviousPage();
        } else if (e.keyCode === 39) {
            loadNextPage();
        }
    });

    btnPrev.addEventListener('click', loadPreviousPage);

    btnNext.addEventListener('click', loadNextPage);

    paginationComponentInput.addEventListener(
        'input',
        debounce(updateMaxElement, 1000)
    );

    if (getCurrentElement() && getCurrentElement() >= 1) {
        currentElement = getCurrentElement();
    }

    if (isTooBig(currentElement, maxElement) || isTooSmall(currentElement)) {
        currentElement = getValidatedCurrentElement(currentElement, maxElement);
    }

    const paginationPages = renderPages(currentElement, maxElement);
    paginationComponentPages.insertAdjacentHTML('afterbegin', paginationPages);
    addClickEventsOnPages(maxElement);
}
