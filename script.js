(() => {
  const root = document.getElementById('app');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  let language = 'zh';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    root.querySelectorAll('[data-zh][data-en]').forEach(el => {
      const value = el.dataset[language];
      if (value !== undefined) el.innerHTML = value;
    });
    const toggle = root.querySelector('#languageToggle');
    toggle.textContent = language === 'zh' ? 'English ↗' : '中文 ↗';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    updateMomentCount();
  }

  root.querySelector('#languageToggle').addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));

  root.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('.nav-btn').forEach(item => item.classList.toggle('active', item === button));
      root.querySelectorAll('.section').forEach(section => section.classList.toggle('active', section.id === `section-${button.dataset.target}`));
    });
  });

  root.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      root.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
      root.querySelectorAll('.moment-card').forEach(card => {
        const show = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
        card.classList.toggle('hidden', !show);
      });
      updateMomentCount();
    });
  });

  function updateMomentCount() {
    const count = [...root.querySelectorAll('.moment-card')].filter(card => !card.classList.contains('hidden')).length;
    const label = language === 'zh' ? `${count} 个片段` : `${count} moments`;
    root.querySelector('#momentCount').textContent = label;
  }

  root.querySelector('#topButton').addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  }));

  setLanguage('zh');
})();