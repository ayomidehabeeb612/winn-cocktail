const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const submitButton = document.querySelector('#submit');
const input = document.querySelector('#search-input');
const container = document.querySelector('.cocktail-list');


const fetchCocktails = (e) => {
  e.preventDefault();
  let query = input.value.trim() || 'a';
  container.innerHTML = '<p>Loading...</p>';

  fetch(apiEndpoint + query)
    .then((resp) => resp.json())
    .then((data) => {
      container.innerHTML = '';
      const drinks = data.drinks;

      if (!drinks) {
        container.innerHTML = '<p class="no-cocktail">No cocktails found!</p>';
        return;
      }

      drinks.forEach((drink) => {
        const article = document.createElement('article');
        article.innerHTML = `
          <div class="image">
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
          </div>
          <div class="description">
            <h4>${drink.strDrink}</h4>
            <div class="sub"><p>Category :</p> <p>${drink.strCategory}</p></div>
            <div class="sub"><p>Glass :</p> <p>${drink.strGlass}</p></div>
            <a href="details.html?id=${drink.idDrink}">
              <button>More Details</button>
            </a>
          </div>
        `;
        container.appendChild(article);
      });
      input.value = '';
    })
    .catch(() => {
      container.innerHTML = '<p class="no-cocktail">Something went wrong.</p>';
    });
};

submitButton.addEventListener('click', fetchCocktails);
window.addEventListener('load', fetchCocktails);
