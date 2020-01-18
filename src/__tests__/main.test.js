import {
    queryByTestId,
    fireEvent,
    getByText,
    getByTestId,
    getAllByTestId,
    waitForElement
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { renderMain } from '../scripts/main';

function getExampleDOM() {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="container" data-testid="container">
    <article class="pagination-component" data-testid="pagination">
        <nav ul="" class="pagination-component__container">
            <ul class="pagination-component__pages"></ul>
        </nav>
    </article>
    </div>
    `;

    renderMain(div);

    return div;
}

function clickButton(btn) {
    fireEvent.click(btn, { button: 1 });
}

function getPaginationPagesSize(container) {
    return getAllByTestId(container, 'pagination-page').length;
}

beforeEach(() => {
    const url = new URL(`?p=1`, window.location.href);
    window.history.pushState('', '', url);
});

test('Should render all elements with event', () => {
    const container = getExampleDOM();
    const btnPrev = getByTestId(container, 'prevBtn');
    const btnNext = getByTestId(container, 'nextBtn');
    const input = getByTestId(container, 'main-input');
    const paginationPages = getAllByTestId(container, 'pagination-page');

    expect(queryByTestId(container, 'pagination')).toBeTruthy();
    expect(btnNext).toBeTruthy();
    expect(btnPrev).toBeTruthy();
    expect(input).toBeTruthy();
    expect(paginationPages).toBeTruthy();
    expect(paginationPages.length).toBe(6);
});

test('PaginationComponent should render correct number of elements after clicking on right button', () => {
    const container = getExampleDOM();
    const btnNext = getByTestId(container, 'nextBtn');

    expect(getPaginationPagesSize(container)).toBe(6);

    clickButton(btnNext);
    clickButton(btnNext);
    expect(getPaginationPagesSize(container)).toBe(6);

    clickButton(btnNext);
    expect(getPaginationPagesSize(container)).toBe(7);

    clickButton(btnNext);
    expect(getPaginationPagesSize(container)).toBe(8);
});

test('PaginationComponent should render correct number of elements after clicking on left button', () => {
    const POSITION_TO_TEST_PREV_BTN = 4;
    const container = getExampleDOM();
    const btnPrev = getByTestId(container, 'prevBtn');
    const btnNext = getByTestId(container, 'nextBtn');

    clickButton(btnPrev);
    expect(getPaginationPagesSize(container)).toBe(6);

    for (let counter = 0; counter < POSITION_TO_TEST_PREV_BTN; counter++) {
        clickButton(btnNext);
    }

    expect(getPaginationPagesSize(container)).toBe(8);

    clickButton(btnPrev);
    expect(getPaginationPagesSize(container)).toBe(7);

    clickButton(btnPrev);
    expect(getPaginationPagesSize(container)).toBe(6);

    clickButton(btnPrev);
    expect(getPaginationPagesSize(container)).toBe(6);

    clickButton(btnPrev);
    expect(getPaginationPagesSize(container)).toBe(6);
});

test('Should change value after correct input', async () => {
    const container = getExampleDOM();
    const input = getByTestId(container, 'main-input');

    fireEvent.input(input, { target: { value: '65' } });
    await waitForElement(() => getByText(container, '65'), {
        container
    });
    expect(getByText(container, '65')).toBeTruthy();

    fireEvent.input(input, { target: { value: '9999999999' } });
    await waitForElement(() => getByText(container, '999'), {
        container
    });
    expect(getByText(container, '999')).toBeTruthy();
});
