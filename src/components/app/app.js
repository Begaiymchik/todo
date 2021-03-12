import React, {useState,useEffect} from 'react';
import './app.css'
import TodoList from "../todo-list";
import Header from "../header";
import SearchPanel from "../search-panel";
import AddTodo from "../add-todo";


const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [status, setStatus] = useState('all');
    const [searchInputText, setSearchInputText] = useState('');
    useEffect(() => {
        getItem();
        activeBtn2();
    }, []);
    useEffect(() => {
        filterHandler();
        saveTodos();
        activeBtn();
        Array.from(document.getElementsByClassName('statusBtn')).map((btn) => {
            console.log(btn.value === status ? btn.classList.add('active') : btn.classList.remove('active'))
        });
    }, [status,todos, searchInputText]);
    const saveTodos = () => {
        localStorage.setItem('todo', JSON.stringify(todos))
    };
    const getItem = () => {
        setTodos(JSON.parse(localStorage.getItem('todo')))
    };
    const activeBtn = () => {
      localStorage.setItem('active', status)
    };
    const activeBtn2 = () => {
      setStatus(localStorage.getItem('active'))
    };
    const filterHandler = () => {
        if (status === 'active') {
            setFilteredTodos(todos.filter((todo) => {
                return todo.isActive
            }))
        } else if (status === 'done') {
            setFilteredTodos(todos.filter((todo) => {
                return !todo.isActive
            }))
        } else {
            setFilteredTodos(todos)
        }
    };
    return (
        <div className='main'>
            <div className='todo-container'>
                <Header todos={todos}/>
                <SearchPanel setStatus={setStatus}  setSearchInputText={setSearchInputText} todos={todos} />
                {todos.length === 0 ? <div className='todos-titel'>Here should be ToDo</div>
                    : <TodoList  todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} searchInputText={searchInputText}/>}
                <AddTodo setTodos={setTodos}
                         setInput={setInput}
                         input={input}
                         todos={todos}/>
            </div>
        </div>
    );
};

export default App;