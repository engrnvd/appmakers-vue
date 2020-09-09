export const flexHeight = function (textarea, binding) {
    let observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    } else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }

    textarea.classList.add('apm-flex-height');
    textarea.style.overflowY = 'hidden';

    function resize() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    /* 0-timeout to get the already changed text */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }

    observe(textarea, 'change', resize);
    observe(textarea, 'cut', delayedResize);
    observe(textarea, 'paste', delayedResize);
    observe(textarea, 'drop', delayedResize);
    observe(textarea, 'keydown', delayedResize);
};
