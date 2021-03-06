const buttonSvg = {
    next:
        '<svg class="pagination-component__svg" viewBox="0 0 24 24"><path class="pagination-component__path" fill="#000000"  d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>',
    prev:
        '<svg class="pagination-component__svg" viewBox="0 0 24 24"><path class="pagination-component__path" fill="#000000" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/></svg>'
};

export const renderButton = side => {
    const button = /* HTML */ `
        <button
            class="pagination-component__button pagination-component__button--${side}"
            data-testid="${side + 'Btn'}"
        >
            ${buttonSvg[side]}
        </button>
    `;
    return button;
};
