import {useState,useEffect} from 'react'

function UserComp(props) {
  const [user, setUser] = useState(props.data);
  const [action, setAction] = useState('');
  const [active,setActive]=useState('');
  useEffect(() =>
  {
    setActive(props.active)
    setUser(props.data)
  })
  const formSumbit=(e)=>{
    e.preventDefault();
    props.modifyUser({'user':user,'action':action})
  }
  const activateUser = ()=>{
    props.showUserData(user.id)
  }



  return (
    <div   className={active == user.id ?'active':''}>
      <div onClick={activateUser} className={`cubeT1 ${user.uncomplited ? 'redBorder' : 'greenBorder'}`}>
        ID: {user.id}
        <br/>
        uncomplited: {user.uncomplited ? 'X' : 'V'}
        <br/>
        <form onSubmit={formSumbit} onClick={(e) => e.stopPropagation()}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
          <br/>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
          <br/>
          <div className="form_wrap">
             <button className='btnT1 gray'
                onMouseOver={(e)=>{e.target.nextSibling.classList.add('show');} } 
                onClick={(e)=>{e.preventDefault(); e.target.nextSibling.classList.remove('show');} }
                >Other Data
              </button>
              <div className="more_data">
                <label htmlFor="street">Street: </label>
                <input type="text" id="street" name="street" value={user.address.street} onChange={(e)=>setUser({...user,address:{...user.address,street:e.target.value}})}/>
                <br/>
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" value={user.address.city} onChange={(e)=>setUser({...user,address:{...user.address,city:e.target.value}})}/>
                <br/>
                <label htmlFor="zipcode">Zip Code: </label>
                <input type="text" id="zipcode" name="zipcode" value={user.address.zipcode} onChange={(e)=>setUser({...user,address:{...user.address,zipcode:e.target.value}})}/>
          
              </div>
              <div className='btns'>
                <input className='btn btnT1' type="submit" value="Update" onClick={()=>{setAction('update');}}/>
                <input className='btn btnT1' type="submit" value="Delete" onClick={()=>{setAction('delete');}}/>
              </div>
          </div>
        </form>
      </div>
   
    </div>
  );
}

export default UserComp;
