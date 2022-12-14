(() => {
  const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

  const updateCounter = () => {
    const counter = document.querySelector('.title h3');
    counter.textContent = `${((localStorage.length/669) * 100).toFixed(2)}% complete (${localStorage.length}/669)`;
  };

  const countries = {
    'QAT': 'đśđŚ', 'ECU': 'đŞđ¨', 'SEN': 'đ¸đł', 'NED': 'đłđą',
    'ENG': 'đ´ó §ó ˘ó Ľó Žó §ó ż', 'IRN': 'đŽđˇ', 'USA': 'đşđ¸', 'WAL': 'đ´ó §ó ˘ó ˇó Źó łó ż',
    'ARG': 'đŚđˇ', 'KSA': 'đ¸đŚ', 'MEX': 'đ˛đ˝', 'POL': 'đľđą',
    'FRA': 'đŤđˇ', 'AUS': 'đŚđş', 'DEN': 'đŠđ°', 'TUN': 'đšđł',
    'ESP': 'đŞđ¸', 'CRC': 'đ¨đˇ', 'GER': 'đŠđŞ', 'JPN': 'đŻđľ',
    'BEL': 'đ§đŞ', 'CAN': 'đ¨đŚ', 'MAR': 'đ˛đŚ', 'CRO': 'đ­đˇ',
    'BRA': 'đ§đˇ', 'SRB': 'đˇđ¸', 'SUI': 'đ¨đ­', 'CMR': 'đ¨đ˛',
    'POR': 'đľđš', 'GHA': 'đŹđ­', 'URU': 'đşđž', 'KOR': 'đ°đˇ',
    'FWC': 'â˝',
  };

  const renderStickers = () => {
    const control = document.querySelector('.sticker-control');
    control.innerHTML = '';
    Object.keys(countries).forEach((country) => {
      control.insertAdjacentHTML(
        'beforeend',
        `<div id="${country}" class="country">
          <div class="country__top-bar"><h5>${country} ${countries[country]}</h5></div>
          <div class="country__stickers"></div>
        </div>`
      );
  
      const countryNode = document.querySelector(`#${country} .country__stickers`);
      const maxNumber = country === 'FWC' ? 30 : 20;
      range(0, maxNumber).forEach((number) => {
        if (country !== 'FWC') {
          number += 1;
        }
  
        const sticker = document.createElement('span');
        const stickerCode = `${country}${number}`;
  
        const stickerIsChecked = localStorage.getItem(stickerCode) === 'true';
    
        if (!stickerIsChecked || document.querySelector('.change-display-checked').checked) {
          sticker.classList.add('sticker');
          sticker.setAttribute('code', stickerCode);
          sticker.textContent = number;
          if (stickerIsChecked) {
            sticker.classList.add('active');
          }
    
          countryNode.appendChild(sticker);
        }
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
  }

  document.querySelector('.change-display-checked').addEventListener('change', () => {
    renderStickers();
  });

  renderStickers();
  updateCounter();
})();
