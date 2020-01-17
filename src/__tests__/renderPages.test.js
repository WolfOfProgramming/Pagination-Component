import { createPagesStructure } from '../scripts/renderPages';

test('MaxElement: 12, CurrentElement: 8', () => {
    const result = createPagesStructure(8, 12);
    expect(result).toMatch(/id="1"/);
    expect(result).toMatch(/id="6"/);
    expect(result).toMatch(/id="7"/);
    expect(result).toMatch(/id="8"/);
    expect(result).toMatch(/id="9"/);
    expect(result).toMatch(
        /class="pagination-component__page pagination-component__page--active" id="8"/
    );

    expect(result).not.toMatch(/id="0"/);
    expect(result).not.toMatch(/id="13"/);
    expect(result).not.toMatch(/id="-"/);
    expect(result).not.toMatch(/id="NaN"/);
    expect(result).not.toMatch(/id="undefined"/);
    expect(result).not.toMatch(/id="null"/);
    expect(result).not.toMatch(/id="*[.]/);
    expect(result).not.toMatch(/id="9999999"/);
});

test('MaxElement: 12, CurrentElement: 10', () => {
    const result = createPagesStructure(10, 12);
    expect(result).toMatch(/id="1"/);
    expect(result).toMatch(/id="11"/);
    expect(result).toMatch(/id="10"/);
    expect(result).toMatch(/id="10"/);
    expect(result).toMatch(/id="9"/);
    expect(result).toMatch(/id="12"/);
    expect(result).toMatch(
        /class="pagination-component__page pagination-component__page--active" id="10"/
    );

    expect(result).not.toMatch(/id="0"/);
    expect(result).not.toMatch(/id="13"/);
    expect(result).not.toMatch(/id="-"/);
    expect(result).not.toMatch(/id="NaN"/);
    expect(result).not.toMatch(/id="undefined"/);
    expect(result).not.toMatch(/id="null"/);
    expect(result).not.toMatch(/id="*[.]/);
    expect(result).not.toMatch(/id="9999999"/);
});

test('MaxElement: 12, CurrentElement: 3', () => {
    const result = createPagesStructure(3, 12);
    expect(result).toMatch(/id="1"/);
    expect(result).toMatch(/id="2"/);
    expect(result).toMatch(/id="3"/);
    expect(result).toMatch(/id="4"/);
    expect(result).toMatch(/id="12"/);
    expect(result).toMatch(
        /class="pagination-component__page pagination-component__page--active" id="3"/
    );

    expect(result).not.toMatch(/id="0"/);
    expect(result).not.toMatch(/id="13"/);
    expect(result).not.toMatch(/id="-"/);
    expect(result).not.toMatch(/id="NaN"/);
    expect(result).not.toMatch(/id="undefined"/);
    expect(result).not.toMatch(/id="null"/);
    expect(result).not.toMatch(/id="*[.]/);
    expect(result).not.toMatch(/id="9999999"/);
});

test('MaxElement: 6, CurrentElement: 4', () => {
    const result = createPagesStructure(4, 6);
    expect(result).toMatch(/id="1"/);
    expect(result).toMatch(/id="2"/);
    expect(result).toMatch(/id="3"/);
    expect(result).toMatch(/id="4"/);
    expect(result).toMatch(/id="5"/);
    expect(result).toMatch(/id="6"/);
    expect(result).toMatch(
        /class="pagination-component__page pagination-component__page--active" id="4"/
    );

    expect(result).not.toMatch(/id="0"/);
    expect(result).not.toMatch(/id="7"/);
    expect(result).not.toMatch(/id="-"/);
    expect(result).not.toMatch(/id="NaN"/);
    expect(result).not.toMatch(/id="undefined"/);
    expect(result).not.toMatch(/id="null"/);
    expect(result).not.toMatch(/id="*[.]/);
    expect(result).not.toMatch(/id="9999999"/);
});
