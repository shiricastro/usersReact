import {useState,useEffect} from 'react'

function AddUser(props) {
  const [newUser,setNewUser]=useState({'name':'','email':''});


  return (
    <div >
      <div className=" margB1">
        <div className="title wrapT1 margB2">
          <div>Add New User</div>
        </div>
        <div className="grayBorder padT1">
        <div className='add_section grayBorder padT1'>
              <form onSubmit={(e)=>{e.preventDefault(); props.addUser(newUser);}}>
                Name: <input name="name" type="text" onChange={(e)=>setNewUser({...newUser,'name':e.target.value})}/>
                <br/>
                Email: <input name="email" type="text" onChange={(e)=>setNewUser({...newUser,'email':e.target.value})}/>
                <br/>
                <div className='form_wrap'><div className='btns'>
                  <input className="btn btnT1" type="button" value="cancle" onClick={()=>{props.closeNewUser(false);}}/>
                  <input className="btn btnT1" type="submit" value="Add"/>
                </div></div>
              </form>
            </div>
        </div>
      </div>

      
    </div>
  );
}

export default AddUser;
