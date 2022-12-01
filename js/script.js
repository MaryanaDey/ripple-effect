"use strict"

//Подія кліку на унопці
document.addEventListener("click", function (e) {
    const targetItem = e.target;
    if (targetItem.closest('[data-ripple')) {
        //константи
        const button = targetItem.closest('[data-ripple]');
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        //Формування елементу
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
        ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
        ripple.classList.add('ripple');

        //іидалення існуючого елементу (опціонально)
        button.dataset.ripple === 'once' && button.querySelector('.ripple') ?
            button.querySelector('.ripple').remove() : null;

        //Додавання елементу
        button.appendChild(ripple);

        //Отримання часу дії анімації
        const timeOut = this.getAnimationDuration(ripple);

        //Видалення елементу 
        setTimeout(() => {
            ripple ? ripple.remove() : null;
        }, timeOut);

        //Функція отримання часу дії анімації
        function getAnimationDuration() {
            const aDuration = window.getComputedStyle(ripple).animationDuration;
            return aDuration.includes('ms') ?
                aDuration.replace("ms", '') : aDuration.replace("s", '') * 1000;
        }
    }
});