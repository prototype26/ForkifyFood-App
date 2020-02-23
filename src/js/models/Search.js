import axios from "axios";

//model class
export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        try{
            const res = await axios((`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`));//api call 
            this.result = res.data.recipes;
           // console.log(this.result);
        }
        catch(error)
        {
            alert(error);
        }
    }
}