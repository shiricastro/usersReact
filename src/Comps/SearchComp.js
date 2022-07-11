import {useState} from 'react'

function SearchComp(props) {
  const [search,setSearch]=useState('');


  return (
    <div className='search_container'>
    <div>
      <label htmlFor='search'>Search</label>
      <input type="text" name="search" id="search" onKeyUp={()=>{props.search(search)}} onChange={(e)=>{setSearch(e.target.value);}}/>
    </div>
    <input className='btnT1' type="button" value='Add' onClick={()=>{props.openNewUser(true)}}/>
  </div>
  );
}

export default SearchComp;
