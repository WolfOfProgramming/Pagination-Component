import { renderInput } from './renderInput';
import { renderButton } from './renderButton';
import { isInputsCorrect, createErrorParagraphs } from './validation';

const formButtons = document.querySelector('.form__buttons');
const formContainer = document.querySelector('.form__container');
formButtons.insertAdjacentHTML('beforeend', renderButton('add'));
formButtons.insertAdjacentHTML('beforeend', renderButton('submit'));

const addButton = document.querySelector('.form__button--add');
const submitButton = document.querySelector('.form__button--submit');
const MAX_INPUT_COUNT = 6;

let activeInputs = 0;

const deleteErrorParagraphs = () => {
    const formSections = document.querySelectorAll('.form__section');
    formSections.forEach(formSection => {
        const formError = formSection.querySelector('.form__error');
        if (formError) {
            formSection.removeChild(formError);
        }
    });
};

const updateCounter = result => {
    if (result) {
        activeInputs += 1;
    } else {
        activeInputs -= 1;
    }
};

const updateNumbers = () => {
    const spans = document.querySelectorAll('.form__number');
    spans.forEach((span, index) => (span.textContent = index + 1));
};

const generateInput = activeInputs => {
    const formInput = renderInput(activeInputs);
    formContainer.insertAdjacentHTML('beforeend', formInput);

    const currentElement = formContainer.lastElementChild;
    const currentDeleteButton = currentElement.querySelector('.form__delete');
    if (currentDeleteButton) {
        currentDeleteButton.addEventListener('click', e => {
            if (
                e.target.parentNode.parentNode.classList.contains(
                    'form__section'
                )
            ) {
                e.target.parentNode.parentNode.remove();
                deleteErrorParagraphs();
                updateNumbers();
                updateCounter(false);
                addButton.classList.remove('form__button--disabled');
            }
        });
    }
    currentElement.querySelector('.form__input').focus();
    updateCounter(true);
};

generateInput(activeInputs);

addButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.form__input');
    deleteErrorParagraphs();
    if (activeInputs < MAX_INPUT_COUNT) {
        if (isInputsCorrect(inputs)) {
            generateInput(activeInputs);
        } else {
            createErrorParagraphs(inputs);
        }
    }
    if (activeInputs === MAX_INPUT_COUNT) {
        addButton.classList.add('form__button--disabled');
    }
});

submitButton.addEventListener('click', e => {
    e.preventDefault();
    deleteErrorParagraphs();
    const inputs = document.querySelectorAll('.form__input');
    if (isInputsCorrect(inputs)) {
        let url = new URL(document.URL);

        const inputsValues = [];
        inputs.forEach(input => inputsValues.push(input.value));

        window.location.href =
            url.origin + '?passwords=' + inputsValues.join(';');
    } else {
        createErrorParagraphs(inputs);
    }
});
