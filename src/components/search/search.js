import { AsyncPaginate } from "react-select-async-paginate";
import {useState} from 'react';

import { GEO_API_URL,geoApiOptions  } from "./api";

const Search = (onSearchChange) => {

const [search, setSearch] = useState(null);

const loadOptions = async (inputValue) =>{
    const data = await fetch(GEO_API_URL)
    .then ((res)=> res.json())
    .then((data)=>data);
}

const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
}


    return (
        <AsyncPaginate
        placeholder="Search for a city"
      
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        />
    )
}

export default Search;