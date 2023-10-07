import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import routeNames from '../../../constants/routeNames';
import { Input, Button } from '@material-tailwind/react';
import { SearchOutlined } from '@mui/icons-material';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  const [keyword, setKeyword] = useState(searchQuery);

  const handleChange = ({ target }) => {
    setKeyword(target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(keyword);
    navigate(routeNames.SEARCH + '?q=' + keyword);
  };

  useEffect(() => {
    // reset the keyword when not searching products
    if (location.pathname !== routeNames.SEARCH) {
      setKeyword('');
    }
  }, [location.pathname]);

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        name="query"
        value={keyword}
        placeholder="Search"
        onChange={handleChange}
        className="text-xl bg-white shadow-lg focus:border-none"
        labelProps={{
          className: "hidden",
        }}
      />
      <Button type="submit"
        size="sm"
        ripple={true}
        className="!absolute right-0 top-0 bottom-0 rounded-l-none bg-yellow-800/90 hover:bg-yellow-800"
      >
        <SearchOutlined className="h-5 w-5" aria-hidden="true" />
      </Button>
    </form>
  )
}

export default SearchBar