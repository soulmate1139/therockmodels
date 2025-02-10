jQuery(document).ready(function($) {
    const sliderWrapper = $('.story-slide-wrapper');
    const slideWidth = sliderWrapper.find('a').outerWidth(); // Die Breite eines Elements einschließlich Rand (adjust as needed)
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let startTranslate = 0;
    let isClick = false;

    sliderWrapper.css('cursor', 'pointer');

    sliderWrapper.on('mousedown', (e) => {
        isDragging = true;
        startPosition = e.clientX;
        startTranslate = currentTranslate;
        isClick = true;
        e.preventDefault();
    });

    sliderWrapper.on('mousemove', (e) => {
        if (isDragging) {
            isClick = false;
            const currentPosition = e.clientX;
            currentTranslate = startTranslate + currentPosition - startPosition;
            sliderWrapper.children('a').css('transform', `translateX(${currentTranslate}px)`);
        }
    });

    sliderWrapper.on('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            if (isClick) {
                e.stopPropagation();
            }

            const maxTranslate = 0;
            const minTranslate = -(sliderWrapper.children('a').length - 1) * slideWidth;

            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate;
            }

            sliderWrapper.children('a').css('transform', `translateX(${currentTranslate}px)`);
        }
    });

    sliderWrapper.on('click', 'a', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });

    sliderWrapper.on('mouseleave', () => {
        sliderWrapper.css('overflow', 'auto');
    });
});
