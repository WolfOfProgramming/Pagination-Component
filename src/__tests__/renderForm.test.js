import {
    queryByTestId,
    fireEvent,
    getByText,
    getByTestId,
    getAllByTestId,
    queryByText,
    waitForDomChange
} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { main } from '../scripts/main';

const POSITION_TO_TEST_PREV_BTN = 4;

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
    main(div);
    return div;
}

// afterEach(() => (document.querySelector('.container').innerHTML = ''));

describe('Tests', () => {
    let container;

    beforeEach(() => {
        const url = new URL(`?p=1`, window.location.href);
        window.history.pushState('', '', url);
        container = getExampleDOM();
    });

    test('Testing rendering', () => {
        const btnPrev = getByTestId(container, 'prevBtn');
        const btnNext = getByTestId(container, 'nextBtn');
        const input = getByTestId(container, 'main-input');
        let paginationPages = getAllByTestId(container, 'pagination-page');

        expect(queryByTestId(container, 'pagination')).toBeTruthy();
        expect(btnNext).toBeTruthy();
        expect(btnPrev).toBeTruthy();
        expect(input).toBeTruthy();
        expect(paginationPages).toBeTruthy();
        expect(paginationPages.length).toBe(6);

        fireEvent.click(btnNext, { button: 1 });
        fireEvent.click(btnNext, { button: 1 });

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);
    });

    test('Next Button', () => {
        const btnNext = getByTestId(container, 'nextBtn');
        let paginationPages = getAllByTestId(container, 'pagination-page');

        expect(paginationPages.length).toBe(6);

        fireEvent.click(btnNext, { button: 1 });
        fireEvent.click(btnNext, { button: 1 });

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);

        fireEvent.click(btnNext, { button: 1 });

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(7);

        fireEvent.click(btnNext, { button: 1 });

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(8);
    });

    test('Previous Button', () => {
        const btnPrev = getByTestId(container, 'prevBtn');
        const btnNext = getByTestId(container, 'nextBtn');
        let paginationPages = getAllByTestId(container, 'pagination-page');

        fireEvent.click(btnPrev, { button: 1 });

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);

        for (let counter = 0; counter < POSITION_TO_TEST_PREV_BTN; counter++) {
            fireEvent.click(btnNext, { button: 1 });
        }

        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(8);

        fireEvent.click(btnPrev, { button: 1 });
        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(7);

        fireEvent.click(btnPrev, { button: 1 });
        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);

        fireEvent.click(btnPrev, { button: 1 });
        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);

        fireEvent.click(btnPrev, { button: 1 });
        paginationPages = getAllByTestId(container, 'pagination-page');
        expect(paginationPages.length).toBe(6);
    });

    test('Input to set max Element', async () => {
        const input = getByTestId(container, 'main-input');

        fireEvent.input(input, { target: { value: '65' } });
        await waitForDomChange({ container });
        expect(getByText(container, '65')).toBeTruthy();

        fireEvent.input(input, { target: { value: '-32' } });
        await waitForDomChange({ container });
        expect(getByText(container, '1')).toBeTruthy();
        expect(queryByText(container, '2')).toBeNull();
        expect(queryByText(container, '...')).toBeNull();

        fireEvent.input(input, { target: { value: '9999999999' } });
        await waitForDomChange({ container });
        expect(getByText(container, '999')).toBeTruthy();
    });
});
