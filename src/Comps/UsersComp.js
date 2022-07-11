import utils from './utils'
import {useState,useEffect} from 'react'
import UserComp from './UserComp';
import UserDataComp from './UserDataComp';
import AddUserComp from './AddUserComp';
import SearchComp from './SearchComp';

function UsersComp() {
  const [usersDB, setUsersDB] = useState([]);
  const [todosDB, setTodosDB] = useState([]);
  const [postsDB, setPostsDB] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [activeUser,setActiveUser] = useState('');
  const [newUser,setNewUser]=useState(false); 
  const [searchText, setSearchText] = useState('');
  
  useEffect(() =>
  {
    async function getData() {
      let todosResp = await utils.getTodos();
      setTodosDB(todosResp);
      let postsResp = await utils.getPosts();
      setPostsDB(postsResp);
      let usersResp =await utils.getUsers();
      setUsersDB(usersResp);
     
    
    }
    getData();
  },[])
  useEffect(() =>
  {
    function updateData() {
     
      setUsers(usersData());
      if(searchText !== ''){filterSearch(searchText)}
      if(activeUser !== ''){showUserData(activeUser)}
    }
    updateData();
  },[usersDB,todosDB,postsDB])
  const usersData=()=>{
    let usersArr = [...usersDB];
    let usersData = usersArr.map(user=>{
      let userTaskes = todosDB.filter(task=>user.id === task.userId);
      let uncomplited = userTaskes.find(task=> !task.completed) ? true : false;
      return {...user,'uncomplited':uncomplited}
    })
    return usersData;
    
  }
  const filterSearch=(text)=>{
    setActiveUser('');
    let usersArr = usersData();
    let filterUsers = usersArr.filter(x=>{
      return (x.name.toLowerCase().includes(text.toLowerCase()) || x.email.toLowerCase().includes(text.toLowerCase())) ? true : false
     })
     setUsers(filterUsers)  
     console.log('filterUsers',filterUsers)
  }
  const showUserData=(userId)=>{
    let userObj = {'id':userId,'todos':todosDB.filter(x=>x.userId === userId),'posts':postsDB.filter(x=>x.userId === userId)};
    setUser(userObj);
  }
  const addUser = (user)=>{
    let usersArr = [...usersDB];
    let newUser = {
      "id": getLastUserId(),
      "name": user.name,
      "email": user.email,
      "address": {
        "street": "",
        "city": "",
        "zipcode": ""
      }
    };
    usersArr.push(newUser);
    setUsersDB(usersArr);
    setNewUser(false)
  }
  const getLastUserId = ()=>{
    let usersArr = [...usersDB];
    let usersIds = usersArr.map(x => {return x.id;});
    let lastId = Math.max(...usersIds);
    return lastId +1;
  }
  const updateUser = (user)=>{
    let usersArr = [...usersDB];
    let userIndex = usersArr.findIndex(x=>x.id == user.id);
    usersArr.splice(userIndex,1,user);
    setUsersDB(usersArr)
  }
  const deleteUser = async(id)=>{
    if(activeUser === id){setActiveUser('')}
    //delete from usersDB
    let usersArr = usersDB.filter(x=>x.id !== id);
    setUsersDB(usersArr);  
    //delete from postsDB
    let postsArr = postsDB.filter(x=>x.userId !== id);
    setPostsDB(postsArr);
     //delete from todosDB
     let todosArr = todosDB.filter(x=>x.userId !== id);
     setTodosDB(todosArr);
  }
  const updateTodo = (todo)=>{
    let todosArr = [...todosDB];
    let todoIndex = todosArr.findIndex(x=>x.id == todo.id);
    todosArr.splice(todoIndex,1,todo);
    setTodosDB(todosArr);
  }
  const addTodo = (todo)=>{
    let todosArr = [...todosDB];
    let newTodo = {"userId": activeUser,"id": getLastTodoId(),"title": todo,"completed": false};
    todosArr.push(newTodo);
    setTodosDB(todosArr);
  }
  const getLastTodoId = ()=>{
    let todosArr = [...todosDB];
    let todosIds = todosArr.map(x => {return x.id;});
    let lastId = Math.max(...todosIds);
    return lastId +1;
  }
  const addPost = (post)=>{
    let postsArr = [...postsDB];
    let newPost = {"userId": activeUser,"id": getLastPostId(),"title": post.title,"body": post.body};
    postsArr.push(newPost);
    setPostsDB(postsArr);
  }
  const getLastPostId = ()=>{
    let postsArr = [...postsDB];
    let postsIds = postsArr.map(x => {return x.id;});
    let lastId = Math.max(...postsIds);
    return lastId +1;
  }

  return (
    <div className='main_container'>
      <div className='main_app'>
  
        <SearchComp search={(text)=>{setSearchText(text); filterSearch(text)}} openNewUser={()=>{setActiveUser(''); setNewUser(true)}}/>
        {
          users.map(user=>{
            return <UserComp modifyUser={(data)=>{data.action == 'update' ? updateUser(data.user) : deleteUser(data.user.id)}} showUserData={(userId)=>{setActiveUser(userId); setNewUser(false); showUserData(userId)}} data={user} active={activeUser} key={user.id} />
          })
          
        }
      </div>
      <div className="side_app">
        {
          activeUser !== '' && 
          <UserDataComp user={user} closeUserData={ () => {setActiveUser('')}}  updateTodo={(todo)=>{updateTodo(todo)}} addTodo={(todo)=>{addTodo(todo)}} addPost={(post)=>{addPost(post)}}/>   
        }
        {
          newUser &&
          <AddUserComp addUser={(user)=>{addUser(user);}} closeNewUser={ () => {setNewUser(false)}}/>
        }
      </div>
    </div>
  );
}

export default UsersComp;
