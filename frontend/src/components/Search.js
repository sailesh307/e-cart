import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSearchResults } from '../state/actions/searchActions';
import { useNavigate } from 'react-router-dom';
import routeNames from '../constants/routeNames';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [ queryData, setQueryData ] = useState({
    query: '',
    limit: 10,
    page: 1,
    price: null,
  });

  const handleChange = (event) => {
    setQueryData({
      ...queryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    navigate(routeNames.PRODUCTPAGE)
    dispatch(fetchSearchResults(queryData));
  };

  return (
    <div className="flex-grow flex lg:ml-6">
      <div className="relative w-full">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          type="search"
          name="query"
          placeholder="Search"
          onChange={handleChange}
          className="w-full bg-gray-200 h-10 px-2 pr-10 rounded-lg text-sm focus:outline-dashed"
        />
        <button type="submit" className="absolute right-0 top-0 p-2" onClick={handleSearch}>
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Search