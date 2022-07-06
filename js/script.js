const headerNav = document.querySelector('.header__nav');
const popupBtns = document.querySelectorAll('[data-popup]');
const popup = document.querySelector('.popup');
const submitBtns = document.querySelectorAll('[data-submit]');
const phoneInputs = document.querySelectorAll('input[data-input-tel]');
let inputNumbersValue;
submitBtns.forEach((submitBtn) => {
   submitBtn.disabled = true;

}); 
let getInputNumbersValue = function (input) {
   return input.value.replace(/\D/g, '');
 };
 document.addEventListener('input', (evt) => {
   const input = evt.target,
      parentForm = input.closest('form');
   if (input.closest('input[data-input-tel]')) {
      let selectionStart = input.selectionStart,
      formattedInputValue = "";
      inputNumbersValue = getInputNumbersValue(input);
      if (!inputNumbersValue) {
            return input.value = "";
      }
      if (input.value.length != selectionStart) {
            if (evt.data && /\D/g.test(evt.data)) {
               input.value = inputNumbersValue;
            }
            return;
      }
      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
         if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
         let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
         formattedInputValue = input.value = firstSymbols + " ";
         if (inputNumbersValue.length > 1) {
            formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
         }
         if (inputNumbersValue.length >= 5) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
         }
         if (inputNumbersValue.length >= 8) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
         }
         if (inputNumbersValue.length >= 10) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
         }
      } else {
            formattedInputValue = inputNumbersValue.substring(0, 0);
      }
      input.value = formattedInputValue;
      const inputs = parentForm.querySelectorAll('input');
      inputs.forEach((input) => {
         if (input.type="tel") {
            if (inputNumbersValue.length >= 11) {
               parentForm.querySelector('[data-submit]').disabled = false;
            } else {
               parentForm.querySelector('[data-submit]').disabled = true;
            };
         }; 
      });
   }
   if (!parentForm.querySelector('input:invalid')) {
      parentForm.querySelector('[data-submit]').disabled = false;
   } else {
      parentForm.querySelector('[data-submit]').disabled = true;
   }
 });
 document.addEventListener('paste', (evt) => {
   if (evt.target.closest('input[data-input-tel]')) {
      let input = evt.target;
      inputNumbersValue = getInputNumbersValue(input);
      let pasted = evt.clipboardData || window.clipboardData;
      if (pasted) {
         let pastedText = pasted.getData('Text');
         if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
         }
      }
   }
 });
 document.addEventListener('keydown', (evt) => {
   let key = evt.keyCode;
   if (key == 27) {
      if (!document.querySelector('.popup.d-none')) {
         popup.classList.add('d-none');
      };
   };
   if (key == 8) {
      if (evt.target.closest('input[data-input-tel]')) {
         let inputValue = evt.target.value.replace(/\D/g, '');
         if (inputValue.length == 1) {
            evt.target.value = "";
        }
       };
   };
});
document.addEventListener('click', (evt) => {
   if (evt.target.closest('.header__burger-btn')) {
     headerNav.classList.toggle('header__nav--open');
   } else if (headerNav.classList.contains('header__nav--open')) {
     headerNav.classList.remove('header__nav--open');
   };
   popupBtns.forEach((PopupBtn) => {
     if (evt.target == PopupBtn) {
       popup.classList.remove('d-none');
     };
     if (evt.target.closest('.popup') && !evt.target.closest('.popup__wrapper')) {
       popup.classList.add('d-none');
     };
   });
 });
 const portfolioSlider = new Swiper ('.portfolio__slider', {
   loop: true,
   spaceBetween: 50,
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
   pagination: {
     el: '.swiper-pagination',
   },
 });
 const reviewsSlider = new Swiper('.reviews__slider', {
   loop: true,
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 });