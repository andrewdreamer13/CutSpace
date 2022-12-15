"use strict";
// header burger menu
burger();

function burger() {
  const burgerBtn = document.querySelector('.header__burger-btn');
  burgerBtn.addEventListener('click', () => {
    document.querySelector('.header__nav-list').classList.toggle('header__nav-list-transform');
    document.querySelector('.span-1').classList.toggle('span-1-transform');
    document.querySelector('.span-2').classList.toggle('span-2-transform');
    document.querySelector('.span-3').classList.toggle('span-3-transform');
    document.body.classList.toggle('no-scroll');
  })
} // End of burger

// form label on focus
const headingLabel = document.querySelector('.heading__form-label');
const headingInput = document.querySelector('.heading__form-input');
headingInput.onfocus = () => {
  headingLabel.classList.add('heading__form-label-focus');
}
headingInput.onblur = () => {
  headingLabel.classList.remove('heading__form-label-focus');
}
// end of form label on focus

// clients slider
clientsSlider();

function clientsSlider() {

  const slider = document.querySelector('.clients__slider');
  const track = document.querySelector('.clients__slider-track');

  let initialPosition = null;
  let moving = false;
  let transform = 0;

  function funcStart(e) {
    track.classList.add('clients__slider--grabbing');
    initialPosition = e.pageX;
    moving = true;
    const transformation = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformation !== 'none') {
      transform = parseInt(transformation.split(',')[4].trim());
    }

  }

  function funcMove(e) {
    if (moving) {
      const currentPosition = e.pageX;
      const diff = currentPosition - initialPosition;
      track.style.transform = `translateX(${transform + diff}px)`;
      checkBoundary();
    }
  }

  function funcEnd() {
    moving = false;
    track.classList.remove('clients__slider--grabbing');
  }
  // stop left and right moving
  function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = track.getBoundingClientRect();

    if (inner.left > 0) {
      track.style.transform = 'translate(-' + 0 + 'px)';
    } else if (inner.right < outer.right) {
      track.style.transform = `translateX(-${inner.width - outer.width}px`;
    }
  }

  if (window.PointerEvent) {
    slider.addEventListener('pointerdown', funcStart);

    slider.addEventListener('pointermove', funcMove);

    slider.addEventListener('pointerup', funcEnd);
  } else {
    slider.addEventListener('touchdown', funcStart);

    slider.addEventListener('touchmove', funcMove);

    slider.addEventListener('touchup', funcEnd);

    slider.addEventListener('mousedown', funcStart);

    slider.addEventListener('mousemove', funcMove);

    slider.addEventListener('mouseup', funcEnd);
  }

} // end of clients slider function

// provide slider
provideSlider();

function provideSlider() {

  const slider = document.querySelector('.provide__slider');
  const track = document.querySelector('.provide__slider-track');
  const photos = document.querySelectorAll('.provide__slider-item');
  let initialPosition = null;
  let moving = false;
  let transform = 0;

  function funcStart(e) {
    track.classList.add('clients__slider--grabbing');
    initialPosition = e.pageX;
    moving = true;
    const transformation = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformation !== 'none') {
      transform = parseInt(transformation.split(',')[4].trim());
    }

  }

  function funcMove(e) {
    if (moving) {
      const currentPosition = e.pageX;
      const diff = currentPosition - initialPosition;
      track.style.transform = `translateX(${transform + diff}px)`;
      checkBoundary();
    }
  }

  function funcEnd() {
    moving = false;
    track.classList.remove('clients__slider--grabbing');
  }

  //stop left and right moving
  function checkBoundary() {
    let outer = slider.getBoundingClientRect();
    let inner = track.getBoundingClientRect();
    if (inner.right <= outer.right - 56) {
      track.style.transform = 'translate(-' + 56 + 'px)';
    } else if (inner.left >= outer.left) {
      track.style.transform = `translateX(${inner.width - outer.width}px`;

    }


  }

  if (window.PointerEvent) {
    slider.addEventListener('pointerdown', funcStart);

    slider.addEventListener('pointermove', funcMove);

    slider.addEventListener('pointerup', funcEnd);
  } else {
    slider.addEventListener('touchdown', funcStart);

    slider.addEventListener('touchmove', funcMove);

    slider.addEventListener('touchup', funcEnd);

    slider.addEventListener('mousedown', funcStart);

    slider.addEventListener('mousemove', funcMove);

    slider.addEventListener('mouseup', funcEnd);
  }

} // end of clients slider function

// footer accordion
accordion();

function accordion() {
  document.querySelectorAll('.footer__title-button').forEach((button) => {
    button.addEventListener('click', () => {
      let content = button.nextElementSibling;
      let triangle = button.children[1];
      if (content.style.maxHeight) {
        document.querySelectorAll('.footer__information-list').forEach((list) => {
          list.style.maxHeight = null;
        })
        triangle.classList.remove('animation');
        triangle.classList.remove('rotate');
      } else {
        document.querySelectorAll('.footer__information-list').forEach((list) => {
          list.style.maxHeight = null;
          content.style.maxHeight = content.scrollHeight + 'px';
        })
        document.querySelectorAll('.footer__triangle').forEach((element) => {
          element.classList.remove('animation');
          element.classList.remove('rotate');
        })
        triangle.classList.add('animation');
        triangle.classList.add('rotate');
      }
    })
  })
} // end

// modal windows
openModalWindows();

function openModalWindows() {
  const modalWindow = document.querySelector('.modal-window');
  const closeButton = document.querySelector('.modal-window__close');
  const openButtons = document.querySelectorAll('.btn');

  openButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let path = event.currentTarget.getAttribute('data-path');
      modalWindow.classList.add('modal-window--visible');
      document.body.style.overflow = 'hidden';
      document.querySelector(`[data-target="${path}"]`).classList.add('modal-window__inner--visible');

      closeButton.addEventListener('click', () => {
        modalWindow.classList.remove('modal-window--visible');
        document.querySelector(`[data-target="${path}"]`).classList.remove('modal-window__inner--visible');
        document.body.style.overflow = 'scroll';
      })
      window.addEventListener('click', (e) => {
        if (e.target == modalWindow) {
          modalWindow.classList.remove('modal-window--visible');
          document.querySelector(`[data-target="${path}"]`).classList.remove('modal-window__inner--visible');
          document.body.style.overflow = 'scroll';
        }
      })
    })
   }) // end of openButtons
} // end of openModalWindows
// Alert window
const forms = document.querySelectorAll('.form');
forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
     Swal.fire(
      'Good!',
      'We will call you',
      'success'
    )
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach((input) => {
      input.value = '';
    })
    let contacts = document.querySelectorAll('.contact-us');
   contacts.forEach((contact)=>{
     contact.classList.remove('modal-window__inner--visible');
    document.querySelector('.modal-window').classList.remove('modal-window--visible');
    document.body.style.overflow = 'scroll';
   })
    
  })
})

// window on blur and focus
window.onblur = () => {
  document.querySelector('head title').innerHTML = 'come back!';
}
window.onfocus = () => {
  document.querySelector('head title').innerHTML = 'CutSpace';
}










