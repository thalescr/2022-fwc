(() => {
  const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

  const updateCounter = () => {
    const counter = document.querySelector('.title h3');
    counter.textContent = `${(localStorage.length/669).toFixed(2) * 100}% complete (${localStorage.length}/669)`;
  };

  const countries = {
    'QAT': '🇶🇦', 'ECU': '🇪🇨', 'SEN': '🇸🇳', 'NED': '🇳🇱',
    'ENG': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'IRN': '🇮🇷', 'USA': '🇺🇸', 'WAL': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'ARG': '🇦🇷', 'KSA': '🇸🇦', 'MEX': '🇲🇽', 'POL': '🇵🇱',
    'FRA': '🇫🇷', 'AUS': '🇦🇺', 'DEN': '🇩🇰', 'TUN': '🇹🇳',
    'ESP': '🇪🇸', 'CRC': '🇨🇷', 'GER': '🇩🇪', 'JPN': '🇯🇵',
    'BEL': '🇧🇪', 'CAN': '🇨🇦', 'MAR': '🇲🇦', 'CRO': '🇭🇷',
    'BRA': '🇧🇷', 'SRB': '🇷🇸', 'SUI': '🇨🇭', 'CMR': '🇨🇲',
    'POR': '🇵🇹', 'GHA': '🇬🇭', 'URU': '🇺🇾', 'KOR': '🇰🇷',
    'FWC': '⚽',
  };

  const control = document.querySelector('.sticker-control');
  Object.keys(countries).forEach((country) => {
    control.insertAdjacentHTML(
      'beforeend',
      `<div id="${country}" class="country">
        <div class="country__top-bar"><h5>${country} ${countries[country]}</h5></div>
        <div class="country__stickers hidden"></div>
      </div>`
    );

    const countryNode = document.querySelector(`#${country} .country__stickers`);
    const maxNumber = country === 'FWC' ? 29 : 20;
    range(0, maxNumber).forEach((number) => {
      number += 1;
      const sticker = document.createElement('span');
      const stickerCode = `${country}${number}`;

      sticker.classList.add('sticker');
      sticker.setAttribute('code', stickerCode);
      sticker.textContent = number;
      if (localStorage.getItem(stickerCode) === 'true') {
        sticker.classList.add('active');
      }

      countryNode.appendChild(sticker);
    });
  });

  document.querySelectorAll('.country__top-bar').forEach((topBar) => {
    topBar.addEventListener('click', () => {
      topBar.classList.toggle('active');
      topBar.parentNode.querySelector('.country__stickers').classList.toggle('hidden');
    });
  })

  document.querySelectorAll('.sticker').forEach((sticker) => {
    sticker.addEventListener('click', () => {
      const stickerCode = sticker.getAttribute('code');
      if (sticker.classList.contains('active')) {
        localStorage.removeItem(stickerCode);
      } else {
        localStorage.setItem(stickerCode, 'true');
      }
      sticker.classList.toggle('active');
      updateCounter();
    });
  });

  updateCounter();
})();
