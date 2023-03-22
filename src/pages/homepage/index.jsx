import { useEffect, useReducer, useState } from "react";
import Search from "../../components/search";
import './style.css';
import RecipeItem from "../../components/recipe-item";
import FavoriteItem from "../../components/favorite-item";

const dummydata = 'dummydata'

const reducer = (state, action) => {
    switch (action.type) {
        case "filterFavorites":

        console.log(action);

            return {
                ...state,
                filteredValue : action.value 
            };

        default:
            return state;

    }
}

const initalState = {
    filteredValue: ''
}


const Homepage = () => {
    //loading state

    const [loadingState, setLoadingState] = useState(false)

    //save result that recevies from the api

    const [recipes, setRecipes] = useState([])

    //favorites data state

    const [favorites, setFavorites] = useState([])

    //state for api is success or not

    const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

    //use reducer function

    const [filteredState, dispatch] = useReducer(reducer, initalState)

    const getDataFromSearchComponent = (getData) => {

        //keep the loading state as true before we call the api
        setLoadingState(true);
        console.log(getData, 'getdata');

        //calling the api
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=02ea009d946c40f188876639c4da62a0&query=${getData}`);
            const result = await apiResponse.json();
            const { results } = result;

            if (results && results.length > 0) {
                //set the loading state as false
                //set the recipes state 

                setLoadingState(false);
                setRecipes(results);
                setApiCalledSuccess(true);
            }

            console.log(result);
        }

        getReceipes()
    };

    console.log(loadingState, recipes, 'loadingState, recipes');

    const addToFavorites = (getCurrentRecipeItem) => {


        let cpyFavorites = [...favorites];

        const index = cpyFavorites.findIndex(item => item.id === getCurrentRecipeItem.id)
        console.log(index);
        if (index === -1) {
            cpyFavorites.push(getCurrentRecipeItem)
            setFavorites(cpyFavorites)
            //save the favorites in the local storage
            localStorage.setItem('favorites', JSON.stringify(cpyFavorites))
        } else {
            alert('Item is already added to your favorites')
        }
    };

    console.log(filteredState, 'filteredState');

    const removeFromFavorites = (getCurrentId) => {

        let cpyFavorites = [...favorites]
        cpyFavorites = cpyFavorites.filter(item => item.id !== getCurrentId);

        setFavorites(cpyFavorites);
        localStorage.setItem('favorites', JSON.stringify(cpyFavorites))
    }

    useEffect(() => {
        const extractFavoritesFromLocalStorageOnPageLoad = JSON.parse(localStorage.getItem('favorites'));
        setFavorites(extractFavoritesFromLocalStorageOnPageLoad)
    }, [])

    console.log(favorites)

    return (
        <div className="homepage">
            <Search getDataFromSearchComponent={getDataFromSearchComponent} dummydatacopy={dummydata}
                apiCalledSuccess={apiCalledSuccess}
                setApiCalledSuccess={setApiCalledSuccess}
            />

            {/*show favorite item*/}


            <div className="favorites-wrapper ">
                <h1 className="favorites-title ">Favorites</h1>
                <div className="search-favorites">

                    <input
                        onChange={(event) => dispatch({ type: 'filterFavorites', value: event.target.value })
                    }
                        value={filteredState.filteredValue}
                        name="searchfavorites" placeholder="searchfavorites"
                    />

                </div>
                <div className="favorites">
                    {
                        favorites && favorites.length > 0 ?
                            favorites.map(item => (
                                <FavoriteItem
                                    removeFromFavorites={() => removeFromFavorites(item.id)}
                                    id={item.id} image={item.image} title={item.title}
                                />
                            ))
                            : null
                    }
                </div>
            </div>

            {/*show favorite item*/}
            {/* show loading* state*/}

            {/*map through all recipes*/}

            <div className="items">
                {recipes && recipes.length > 0
                    ? recipes.map((item) => <RecipeItem addToFavorites={() => addToFavorites(item)} id={item.id} image={item.image} title={item.title} />)
                    : null}

            </div>



            {/*map through all recipes*/}
            {
                loadingState && <div className="loading">Loading Recipes ! Please wait....</div>
            }
        </div>
    )
}

export default Homepage;