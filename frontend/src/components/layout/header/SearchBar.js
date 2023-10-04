import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import routeNames from '../../../constants/routeNames';
import { fetchProducts, setSearchQuery } from '../../../state/actions/productActions';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  
  const [ queryData, setQueryData ] = useState({
    query: '',
    page: 1,
  });

  const handleChange = (event) => {
    setQueryData({
      ...queryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(queryData);
    navigate(routeNames.SEARCH + '?q=' + queryData.query);
    dispatch(setSearchQuery(queryData.query));
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if(location.pathname !== routeNames.SEARCH) {
      setQueryData({
        query: '',
        page: 1,
      });
    }
  }, [location.pathname]);

  return (
    <div className="flex-grow flex lg:ml-6">
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="search"
          name="query"
          value={queryData.query}
          placeholder="Search"
          onChange={handleChange}
          className="w-full bg-gray-200 h-10 px-2 pr-10 rounded-lg text-sm focus:outline-dashed"
        />
        <button type="submit" className="absolute right-0 top-0 p-2">
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar