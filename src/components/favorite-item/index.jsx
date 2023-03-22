
import './style.css'


const FavoriteItem = (props) =>{

    const{id,image,removeFromFavorites,title} = props;

    console.log(props, 'recipe-item-props');

        return(
            <div key={id} className="favorite-item">
                <div>
                    <img src={image} alt='Not Found'/>
                </div>
                <p>{title}</p>

                <button type='button' onClick={removeFromFavorites} >Remove From Favorites</button>
            </div>
        )
}

export default FavoriteItem;