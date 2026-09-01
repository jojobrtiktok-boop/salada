// Video preview (click to load YouTube embed)
(function () {
  var card = document.getElementById('videoCard');
  if (!card) return;
  card.addEventListener('click', function () {
    var id = card.getAttribute('data-yt-id');
    card.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0" title="Aula 1 - Tutorial das Camadas" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  }, { once: true });
})();

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(function (item) {
  var q = item.querySelector('.faq-q');
  q.addEventListener('click', function () {
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      if (openItem !== item) openItem.classList.remove('open');
    });
    item.classList.toggle('open', !wasOpen);
  });
});

// Review carousel
(function () {
  var track = document.getElementById('reviewTrack');
  if (!track) return;
  var slides = track.querySelectorAll('.review-slide');
  var dotsWrap = document.getElementById('reviewDots');
  var prevBtn = document.querySelector('.review-arrow.prev');
  var nextBtn = document.querySelector('.review-arrow.next');
  var index = 0;

  slides.forEach(function (_, i) {
    var dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('span');

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
  }

  prevBtn.addEventListener('click', function () { goTo(index - 1); });
  nextBtn.addEventListener('click', function () { goTo(index + 1); });

  // touch swipe
  var startX = null;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; });
  track.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var diff = e.changedTouches[0].clientX - startX;
    if (diff > 40) goTo(index - 1);
    else if (diff < -40) goTo(index + 1);
    startX = null;
  });

  // autoplay
  setInterval(function () { goTo(index + 1); }, 5000);
})();
