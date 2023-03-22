import { useEffect, useState } from 'react';
import './style.css'

const Search =  ((props) => {
    console.log(props);
    const {getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess} = props;
    const [inputValue, setInputValue] = useState() //initial value

    const handleInputvalue = (event)=>{
        const {value} = event.target;
        //set the updated state
        setInputValue(value)
    }   

    console.log(inputValue);    

    const handleSubmit = (event)=>{
        event.preventDefault() 
        getDataFromSearchComponent(inputValue)
    }

    useEffect(() => {
        if(apiCalledSuccess){
            setInputValue('')
            setApiCalledSuccess('')
        }

    },[apiCalledSuccess])
 
    return(
        <form onSubmit={handleSubmit} className="Search">
            <input name="Search" onChange={handleInputvalue} value={inputValue} placeholder="Search recipes" id="search"/>
            <button type="submit">Search</button>
        </form>
    )
})

export default Search;

//important hooks in react function based
//use state
//use reducer -> use to manage complex states   
//input name="search" placeholder="search recipes" id="search"/> -> state value for your particular input in line 4  hint-  (usestate)
//inputValue -> state variable
//setInputValue - > state function/method

