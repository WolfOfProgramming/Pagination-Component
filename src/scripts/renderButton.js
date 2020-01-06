export const renderButton = type => {
    const button = /* HTML */ `
        <button class="form__button form__button--${type}" type="button">
            ${type}
        </button>
    `;
    return button;
};
