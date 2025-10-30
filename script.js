
const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const submitButton = document.querySelector('#submit')
const input = document.querySelector('#search-input')
const container = document.querySelector('.cocktail-list')


const fetchCocktails =(e) => {

    e.preventDefault()
    let query = input.value
    container.innerHTML = ''
    if (query === '') {
      query = 'a'
    }else{
        query = input.value
    }
    fetch(apiEndpoint + query)
    .then((resp)=>{
      return resp.json()
    })
    .then((data)=>{
      const drinks = data.drinks
      for (let index = 0; index < drinks.length; index++) {
        let singleDrink = drinks[index];
        console.log(singleDrink);
        const article = document.createElement('article')
        article.innerHTML = `
            <div class="image">
                        <img src="${singleDrink.strDrinkThumb}" alt=""/>
                        </div>
                      <div class="description">
                          <h4>${singleDrink.strDrink}</h4>
                          <div class="sub">
                            <p>Category :</p> <p>${singleDrink.strCategory}</p>
                          </div>
                          <div class="sub">
                            <p>Serving glass :</p> <p>${singleDrink.strGlass}</p>
                          </div>
                        <a href='details.html'>
                            <button>
                              More Details 
                            </button>
               </a>
                        
                      </div>
        `
        container.appendChild(article)
        input.value = ''
        
      }
    })
    
}

submitButton.addEventListener('click', fetchCocktails);
window.addEventListener('load', fetchCocktails);