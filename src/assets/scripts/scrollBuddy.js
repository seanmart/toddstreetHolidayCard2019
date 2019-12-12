export default function() {
  let items = document.querySelectorAll(".scroll-item");
  let itemsArray = Array.apply(null, items).map(item => {
    return {
      el: item,
      speed: item.getAttribute("data-speed") || null,
      distance: item.getAttribute("data-distance") || null
    };
  });

  function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function callback() {
    itemsArray.forEach(item => {
      let transformY = item.speed
        ? window.scrollY * item.speed
        : item.distance
        ? (window.scrollY / document.body.clientHeight) * item.distance
        : 0;

      window.requestAnimationFrame(() => {
        item.el.style.transform = `translateY(${transformY}px)`;
      });
    });
  }

  window.addEventListener("scroll", throttle(callback, 5));
}
