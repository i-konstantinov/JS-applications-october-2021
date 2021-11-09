// Моето Решение

async function loadRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const recipeObjects = await response.json();
    
    const main = document.querySelector('main');
    
    Array.from(Object.values(recipeObjects))
    .forEach(obj => makePreview(obj));
    
    main.querySelector('p').remove();

    function makePreview(recipeObj) {
        const article = document.createElement('div');

        const preview = document.createElement('article');
        preview.className = 'preview';
        preview.style.display = 'block';
        preview.id = recipeObj._id;
        preview.innerHTML = `<div class="title">
                                <h2>${recipeObj.name}</h2>
                            </div>
                            <div class="small">
                                <img src=${recipeObj.img}>
                            </div>`;
        const details = document.createElement('article');
        details.style.display = 'none';

        article.appendChild(preview)

        article.addEventListener('click', toggleDetails);
        
        main.appendChild(article);
    }

    async function toggleDetails(ev) {
        console.log(ev);
        const parentArticle = ev.target.parentElement;

        const recipeId = ev.target.id;
        const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipeId}`);
        const detailsObj = await response.json();            
        const detailedArticle = await revealDetails(detailsObj);
            
        ev.target.style.display = 'none';
        parentArticle.appendChild(detailedArticle);

    }

    async function revealDetails(obj) {
        const article = document.createElement('article');
        article.id = 'hidden';
        article.className = 'preview';

        const title = document.createElement('h2');
        title.textContent = obj.name;
        article.appendChild(title);

        const band = document.createElement('div');
        band.className = 'band';
        article.appendChild(band);

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.innerHTML = `<img src=${obj.img}>`;
        band.appendChild(thumb);

        const ingredients = document.createElement('div');
        ingredients.className = 'ingredients';
        ingredients.innerHTML = "<h3>Ingredients:</h3>";

        const ingredientsUl = document.createElement('ul');
        for (let i of obj.ingredients) {
            const li = document.createElement('li');
            li.textContent = i;
            ingredientsUl.appendChild(li);
        }
        ingredients.appendChild(ingredientsUl);
        band.appendChild(ingredients);

        const description = document.createElement('div');
        description.className = 'description';
        description.innerHTML = '<h3>Preparation:</h3>';

        for (let step of obj.steps) {
            const p = document.createElement('p');
            p.textContent = step;
            description.appendChild(p);
        }
        article.appendChild(description);

        return article;
    }
}

loadRecipes();

/*​
_id: "01"
img: "assets/lasagna.jpg"
ingredients: Array(4) [ "1 tbsp Ingredient 1", "2 cups Ingredient 2", "500 g  Ingredient 3", … ]
​​
0: "1 tbsp Ingredient 1"
1: "2 cups Ingredient 2"​​
2: "500 g  Ingredient 3"
3: "25 g Ingredient 4"
​
name: "Recipe 1"
steps: Array(3) [ "Prepare ingredients", "Mix ingredients", "Cook until done" ]
​​
0: "Prepare ingredients"
​​
1: "Mix ingredients"
​​
2: "Cook until done"
​​
length: 3
*/