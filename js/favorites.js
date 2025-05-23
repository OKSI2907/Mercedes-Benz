document.addEventListener('DOMContentLoaded', () => {
  const favoritesList = document.querySelector('.favorites-list');
  const countSpan = document.getElementById('favorites-count');

  // Получаем избранные товары из localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Удаляем битые записи (например, пустые объекты)
  favorites = favorites.filter(product => product && product.id);

  // Обновляем localStorage, если были удалены битые объекты
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Функция отрисовки
  function renderFavorites() {
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      favoritesList.innerHTML = '<p>Избранных товаров пока нет.</p>';
      if (countSpan) countSpan.textContent = '0';
      return;
    }

    favorites.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.setAttribute('data-id', product.id);

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${product.image}" alt="${product.title}">
          <button class="like-btn active" title="Удалить из избранного"></button>
        </div>
        <span class="new-label">NEW</span>
        <p class="car-model">${product.title}</p>
        <p class="car-price">${product.price}</p>
        <div class="card-actions">
          <a href="product.html" class="btn-more">подробнее</a>
          <button class="cart-btn">
            <img src="images/cart-icon.png" alt="Корзина">
          </button>
        </div>
      `;

      // Удаление из избранного
      card.querySelector('.like-btn').addEventListener('click', () => {
        favorites = favorites.filter(item => item.id !== product.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites(); // обновить интерфейс
      });

      favoritesList.appendChild(card);
    });

    // Обновить счётчик
    if (countSpan) countSpan.textContent = favorites.length;
  }

  renderFavorites();
});