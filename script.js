const SearchBox = document.querySelector('.SearchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipes = async (query) =>{
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    recipecontainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p> Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";  
        recipeDiv.appendChild(button);

        // Adding Eventlistner to recipe button

        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });


        recipecontainer.appendChild(recipeDiv);
        
    });
        }
            catch(error){
                recipecontainer.innerHTML = "<h2>No Recipe Found!!!</h2>";
        }
    }


const fetchIngredients = (meal) =>{
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener(`click`,()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML= `<h2> Type the meal in the search box.</h2>`;
        return;
    }

    fetchRecipes(searchInput);
    
});