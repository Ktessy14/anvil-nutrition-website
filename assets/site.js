/* Anvil Nutrition — site behaviour: mobile menu, category media, FAQ, quote brief. */
(function () {
  'use strict';

  // Mobile menu
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.hasAttribute('hidden');
      if (open) menu.removeAttribute('hidden');
      else menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Home: category rows swap the sticky media panel
  var media = document.querySelector('[data-cat-media]');
  if (media) {
    var rows = Array.prototype.slice.call(document.querySelectorAll('[data-cat-img]'));
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        rows.forEach(function (r) { r.classList.remove('is-active'); });
        row.classList.add('is-active');
        media.style.backgroundImage = 'url(' + row.getAttribute('data-cat-img') + ')';
      });
    });
  }

  // FAQ accordion
  var items = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('is-open');
      items.forEach(function (it) {
        it.classList.remove('is-open');
        var b = it.querySelector('.faq-q');
        if (b) {
          b.setAttribute('aria-expanded', 'false');
          var s = b.querySelector('.sign');
          if (s) s.textContent = '+';
        }
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        var sign = btn.querySelector('.sign');
        if (sign) sign.textContent = '−';
      }
    });
  });

  // Contact: compose the brief as an email
  var form = document.getElementById('brief-form');
  var send = document.getElementById('send-brief');
  if (form && send) {
    send.addEventListener('click', function () {
      var get = function (name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el && el.value ? el.value.trim() : '';
      };
      var lines = [
        ['Name', get('name')],
        ['Company', get('company')],
        ['Email', get('email')],
        ['Product category', get('category')],
        ['Target formula or concept', get('formula')],
        ['Volume / order size', get('volume')],
        ['Packaging format', get('packaging')],
        ['Timeline', get('timeline')],
        ['Compliance requirements', get('compliance')],
        ['Notes', get('notes')]
      ].filter(function (l) { return l[1]; })
       .map(function (l) { return l[0] + ': ' + l[1]; });

      var subject = 'Quote request' + (get('company') ? ' — ' + get('company') : '');
      var href = 'mailto:sales@anvilnutrition.com.au' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
      send.textContent = 'Brief sent';
    });
  }
})();
