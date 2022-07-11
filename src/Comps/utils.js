import axios from 'axios'

const getUsers = async()=>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    return resp.data;
}
const getTodos = async()=>
{
    let resp =  await axios.get("https://jsonplaceholder.typicode.com/todos");
    return resp.data;
}
const getPosts = async()=>
{
    let resp =  await axios.get("https://jsonplaceholder.typicode.com/posts");
    return resp.data;
}
const getTodosById = async(userId)=>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/todos?userId=" + userId);
    let titles = resp.data.map(x=>x.title).slice(0, 5) 
    return titles;
}
export default  {getUsers,getTodos,getPosts}