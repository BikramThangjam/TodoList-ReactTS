import React, { useReducer, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
// import {Todo} from "./model"
import TodoList from './components/TodoList';
import { todoReducer } from './store/reducer';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  // const [todos, setTodos] = useState<Todo[]>([])

  const [todos, dispatch] = useReducer(todoReducer, [])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo){
      dispatch({type:"add", payload:todo})
      setTodo("");
    }
    // if (todo){
    //   setTodos(
    //     [
    //       {
    //         id: Date.now(), 
    //         todo, 
    //         isDone:false
    //       },
    //       ...todos
    //     ]
    //   )

    //   setTodo("");
    // }

  }

  return (
    <div className="App">
     <span className='heading'>TODOFY</span>
     <InputField todo={todo} setTodo = {setTodo} handleAdd={handleAdd}/>
     <TodoList todos={todos} dispatch={dispatch}/>
    </div>
  );
}

export default App;
