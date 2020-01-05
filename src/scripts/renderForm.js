const paginationComponent = document.querySelector('.pagination-component');

const renderForm = () => {
    const input = /* HTML */ `
        <form action="" method="GET" class="pagination-component__form">
            <label for="pagination-component__input">Max page:</label>
            <input
                id="pagination-component__input"
                class="pagination-component__input"
                type="text"
            />
        </form>
    `;
    paginationComponent.insertAdjacentHTML('afterbegin', input);
};

renderForm();
