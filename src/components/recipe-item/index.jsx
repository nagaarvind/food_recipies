
import './style.css'


const RecipeItem = (props) =>{

    const{id,image,title,addToFavorites} = props;

    console.log(props, 'recipe-item-props');

        return(
            <div key={id} className="recipe-item">
                <div>
                    <img src={image} alt='Not Found'/>
                </div>
                <p>{title}</p>

                <button type='button' onClick={addToFavorites}>Add To Favorites</button>
            </div>
        )
}

export default RecipeItem;