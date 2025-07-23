import React , {useState} from 'react'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function Searchbar({data}) {

  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate('/courses-list/' + input);
  }


  return (
      <form onSubmit={onSearchHandler}className="max-w-xl w-full md:h-14 h-12 flex items-center bg-gray-100 border border-gray-300 rounded">
        <img src={assets.search_icon} alt="search_icon" className="md:w-auto w-10 px-3"/>

        <input
        value={input}
        onChange={(e) => setInput(e.target.value) } 
        type="text" 
        placeholder="Search for courses" 
        className="w-full h-full outline-none text-black"
        />

        <button type="submit" className="bg-blue-500 text-gray-100 rounded md:px-10 px-7 md:py-3 py-2 mx-1 hover:bg-blue-600 cursor-pointer">Search</button>
      </form>
  )
}

export default Searchbar