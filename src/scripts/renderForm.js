export const renderForm = () => {
    const input = /* HTML */ `
        <form action="" method="GET" class="pagination-component__form">
            <label for="max-element-input">Max page:</label>
            <input
                id="max-element-input"
                class="pagination-component__input"
                type="text"
            />
        </form>
    `;
    return input;
};
