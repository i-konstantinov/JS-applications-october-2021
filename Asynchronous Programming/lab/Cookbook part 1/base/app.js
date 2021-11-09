//  понеже app.js се зарежда в header-a
//  а ние ще работим по DOM-a след като се зареди body-то
//  закачаме eventListener за window
window.addEventListener('DOMContentLoaded', start);

//  правим старт да е асинхронна функция, 
//  защото тя трябва да извика друга асинхронна функция
//  и после да обработи данните от нея;
async function start() {
    const main = document.querySelector('main');

    const recipes = await getRecipes();

    //  взимаме масива от рецепти recipes
    //  .map подава всяка рецепта към функцията, която я вкарва в статия
    //  после закачаме готовите статии към main
    const articles = recipes.map(createPreview)
    articles.forEach(a => main.appendChild(a));
    main.children[0].remove();
}

function createPreview(recipe) {
    const article = document.createElement('article');
    article.className = 'preview';
    article.innerHTML = `<div class="title">
                            <h2>${recipe.name}</h2>
                        </div>
                        <div class="small">
                            <img src="${recipe.img}">
                        </div>`; 
    
    //  event listener-a извиква togglePreview
    //  подава себе си като параметър за заменяне
    //  заради клоужъра можем да вземем recipe._id
    //  правим анонимна ф, коят да извика togglePreview,
    //  за да можем да подадем параметри; ако 
    //  подадем само референция към toggle Preview, не можем да подадем параметри
    //  в анонимната ф, добавяме и къстъм логика за
    //  по-добър user experiense
    article.addEventListener('click', () => {
        article.querySelector('h2').textContent = 'Loading...';
        togglePreview(recipe._id, article);
    });                   
    
    return article;
}


//  функция , която да генерира и да визуализира детайлите
//  тя е асинхронна, защото чете данни от друга такава
//  тя трябва да получи id
//  тя трябва да замени вече съществуващ DOM елемент
//  затова трябва да намери референция към този елелмент
//  правим го като подаваме като параметър самият елемент
//  да го търсим с querySelector e лоша идея!
async function togglePreview(id, preview) {
    const recipe = await getRecipeById(id);

    const element = document.createElement('article');

    element.innerHTML = `<h2>${recipe.name}</h2>
                        <div class="band">
                            <div class="thumb">
                                <img src="${recipe.img}">
                            </div>
                            <div class="ingredients">
                                <h3>Ingredients:</h3>
                                <ul>
                                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="description">
                            <h3>Preparation:</h3>
                            ${recipe.steps.map(s => `<p>${s}</p>`).join('')}
                        </div>`;
    
    preview.replaceWith(element);
}

//  GET request for all recipes
async function getRecipes() {
    const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data);
}

// get and display recipe details
async function getRecipeById(id) {
    const url = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}