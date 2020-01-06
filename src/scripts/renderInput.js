export function renderInput(activeInputs) {
    let formDeleteButton = ``;
    let defaultInputText = '';
    if (activeInputs > 0) {
        formDeleteButton = /* HTML */ `
            <button class="form__delete" type="button"></button>
        `;
    } else {
        defaultInputText = 'It is default input text.';
    }

    return `
        <section class="form__section">
            <label class="form__label" for="input"
                >Input
                <span class="form__number">${activeInputs + 1}</span></label
            >
            <div class="form__wrapper">
                <input
                    class="form__input"
                    type="text"
                    name="input"
                    value="${defaultInputText}"
                />
                ${formDeleteButton}
            </div>
        </section>
    `;
}
