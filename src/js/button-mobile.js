const js_active = document.querySelector('#js_active');
const js_menu = document.querySelector('.header_section-navigation');

js_active.addEventListener('click', function(e) {
  e.preventDefault();
  js_active.classList.toggle('active');
  js_menu.classList.toggle('active');
});