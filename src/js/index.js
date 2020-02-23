import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
import Axios from 'axios';
/*global app state
1.search obj
2.current recipe obj
3.shopping list obj
4.liked recipes obj
*/

 const state={};
/***
 * 
 * 
 * SEARCH CONTROLLER
 * 
 */
 const controlSearch = async() =>{
    
    //1.get query from view
    const query = searchView.getInput();

    if(query){
        //2.new search obj and add to state
        state.search = new Search(query);//adding search object in state
        //3.prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4.search for recipes
        await state.search.getResults();
        //5.render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};


elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn)
    {
        const goToPage = parseInt(btn.dataset.goto,10);
        console.log(goToPage);
        searchView.clearResults();
        searchView.clearPaginationButtons();
        searchView.renderResults(state.search.result,goToPage);
    }
});


/**
 * 
 * 
 * RECIPE CONTROLLER
 * 
 */

const controlRecipe =async ()=>{
    const id = window.location.hash.replace("#"," ");

    if(id){
        //Prepare UI for results

        //create recipe obj in state
        state.recipe = new Recipe(id);
        try{
        //get recipe data
        await state.recipe.getRecipe();
        //calculate servings and time 
        state.recipe.calcTime();
        state.recipe.calcServings();    
        //render UI for results
        
        }catch(error){
            alert('error fetching recipe');
        }
    }
    
}
['hashchange','load'].forEach(event =>window.addEventListener(event,controlRecipe));
 
