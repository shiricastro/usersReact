import {useState,useEffect} from 'react'

function UserDataComp(props) {
  const [user,setUser]=useState(props.user);
  const [addTodo,setAddTodo]=useState(false);
  const [newTodo,setNewTodo]=useState('');
  const [addPost,setAddPost]=useState(false);
  const [newPost,setNewPost]=useState({'title':'','body':''});
  useEffect(() =>
  {
    setUser(props.user)
  })
  const updateTodo = (todoId)=>{
    let todos = user.todos;
    let todo = todos.find(x=>x.id === todoId);
    todo.completed = true;
    props.updateTodo(todo);
  }

  return (
    <div >
      <button className="close_btn" onClick={()=>props.closeUserData('')}>X</button>
      <div className="todos margB1">
        <div className="title wrapT1 margB2">
          <div>Todos- User {user.id}</div>
          {
            !addTodo &&
            <button className="btnT1" onClick={()=>setAddTodo(true)}>Add</button>
          }
        </div>
        <div className="grayBorder padT1">
          {
            addTodo &&
            <div className='add_section grayBorder padT1'>
              <form onSubmit={(e)=>{e.preventDefault(); props.addTodo(newTodo); setAddTodo(false);}}>
                Title: <input name="title" type="text" onChange={(e)=>setNewTodo(e.target.value)}/>
                <br/>
                <div className='form_wrap'><div className='btns'>
                  <input className="btn btnT1" type="button" value="cancle" onClick={()=>setAddTodo(false)}/>
                  <input className="btn btnT1" type="submit" value="Add"/>
                </div></div>
              </form>
            </div>
           }
          {
            !addTodo &&
            user.todos.map(todo=>{
              return <div key={todo.id} className="itemT1 grayBorder padT2 margB1">
                <strong>Title:</strong> {todo.title}<br/>
                <div className="wrapT1">
                  <span><strong>Completed:</strong> {todo.completed ? 'True' : 'False'}</span>
                  {
                    !todo.completed &&
                    <button className="btnT1" onClick={()=>updateTodo(todo.id)}>Mark Completed</button>
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>
      <div className="posts">
        <div className="title wrapT1 margB2">
          <div>Posts- User {props.user.id}</div>
          {
            !addPost &&
            <button className="btnT1" onClick={()=>setAddPost(true)}>Add</button>
          }
        </div>
        <div className="grayBorder padT1">
        {
            addPost &&
            <div className='add_section grayBorder padT1'>
              <form onSubmit={(e)=>{e.preventDefault(); props.addPost(newPost); setAddPost(false);}}>
                Title: <input name="title" type="text" onChange={(e)=>setNewPost({...newPost,'title':e.target.value})}/>
                <br/>
                Body: <input name="body" type="text" onChange={(e)=>setNewPost({...newPost,'body':e.target.value})}/>
                <br/>
                <div className='form_wrap'><div className='btns'>
                  <input className="btn btnT1" type="button" value="cancle" onClick={()=>setAddPost(false)}/>
                  <input className="btn btnT1" type="submit" value="Add"/>
                </div></div>
              </form>
            </div>
           }
          {
            !addPost &&
            props.user.posts.map(post=>{
              return <div key={post.id} className="itemT1 grayBorder padT2 margB1">
                <strong>Title:</strong> {post.title}<br/>
                <strong>Body:</strong> {post.body}
              
              </div>
            })
          }
        </div>
      </div>
      
    </div>
  );
}

export default UserDataComp;
