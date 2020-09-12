export const topScrollBar = {
    inserted(el) {
        el.classList.add('top-scrollbar');
        el.style.overflowX = 'auto';
        el.style.transform = 'rotateX(180deg)';
    }
};

export const topScrollBarContent = {
    inserted(el) {
        el.style.transform = 'rotateX(180deg)';
    }
};
