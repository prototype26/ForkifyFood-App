import {elements} from './base';
export const getInput = ()=> elements.searchInput.value;

export const clearInput = ()=>{
    elements.searchInput.value = '';
}

export const clearResults = () =>{
    elements.searchRenderRes.innerHTML = '';
}

export const clearPaginationButtons = () =>{
    elements.searchResPages.innerHTML = '';
}


const renderRecipe = recipe =>  {
    var markup = `<li>
    <a class="results__link" href=#${recipe.recipe_id}  >
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;

elements.searchRenderRes.insertAdjacentHTML('beforeend',markup);
};
//pagination
//type--'prev' or 'next'
const createButton =(page,type)=>`
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? page-1 :page+1}>
<span>Page ${type==='prev' ? page-1 :page+1}</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left':'right'}"></use>
</svg>
</button>
`;

const renderButtons = (page,numResults,resPerPage)=>{
    const pages = Math.ceil(numResults/resPerPage);
    let button;
    if(page===1 && pages>1)//for first page
    {
        //button to go next page
       button =  createButton(page,'next');
    }
    else if(page<pages){
        //both buttons
        button = `
                    ${createButton(page,'prev')}
                    ${createButton(page,'next')}
                    `;
    }
    else if(page === pages && pages >1)//for last page
    {
        //to go on prev page
        button = createButton(page,'prev');
    }


    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes,page = 1,resPerPage = 10)=>{
    //rendering results 
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);
    //rendering pagination code
    renderButtons(page,recipes.length,resPerPage);

}