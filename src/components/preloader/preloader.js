// hidePreloader START
let hidePreloader = function() {
  setTimeout(function() {
    let preloader = document.getElementById('preloader');
  
    if (!preloader.classList.contains('preloader--hidden')) {
        preloader.classList.add('preloader--hidden');
    }
  }, 300)
};

document.addEventListener('DOMContentLoaded', hidePreloader());
// hidePreloader END
