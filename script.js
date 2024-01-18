const searchBox =document.querySelector('.searchBox');
const searchBtn =document.querySelector('.searchBtn');
const recipeContainer =document.querySelector('.recipe-container');
const recipeDetailsContent =document.querySelector('.recipe-details-content');
const recipeCloseBtn =document.querySelector('.recipe-close-btn');
const body = document.getElementsByTagName('body');





 const fetchRecepies = async(query) => {
    recipeContainer.innerHTML = '<h2>Loading Recipes...</h2>'
    try {
       const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
       const response = await data.json();

       recipeContainer.innerHTML = '';
       response.meals.forEach((meal)=>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipeDiv.appendChild(button);


        // Adding Event listener
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        } )

console.log(response)
        recipeContainer.appendChild(recipeDiv);
       });
    } 
    catch (error) {
        recipeContainer.innerHTML = `<h2>This dish is not present</h2>`;
    }
}



const fetchIngredients = (meal) =>{
    let ingredientList = '';
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li >${ingredient} : ${measure}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup =(meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = 'block'
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display = 'none';
})


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const searchTerm = searchBox.value;
    if(!searchTerm){
        recipeContainer.innerHTML = `<h2>Type a dish name you want to search</h2>`;
    }else{
        fetchRecepies(searchTerm);
    }
    // console.log('button cliicked')
})
