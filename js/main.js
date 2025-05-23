document.addEventListener('DOMContentLoaded', function () {
  const likeButtons = document.querySelectorAll('.like-btn');

  // Загружаем список избранных из localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Отметим активные сердечки, если товар уже в избранном
  likeButtons.forEach(button => {
    const card = button.closest('.product-card');
    const id = card.dataset.id;

    if (favorites.find(item => item.id === id)) {
      button.classList.add('active');
    }

    // Обработчик клика
    button.addEventListener('click', () => {
      const title = card.dataset.title;
      const image = card.dataset.image;
      const price = card.dataset.price;

      const existingIndex = favorites.findIndex(item => item.id === id);

      if (existingIndex !== -1) {
        // Уже в избранном — удаляем
        favorites.splice(existingIndex, 1);
        button.classList.remove('active');
      } else {
        // Добавляем в избранное
        favorites.push({ id, title, image, price });
        button.classList.add('active');
      }

      // Обновляем localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
});