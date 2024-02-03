import React, { useReducer, useState } from 'react';
import './App.css';
import { Todo } from './model';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { todoReducer } from './store/reducer';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  // const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [todos, dispatch] = useReducer(todoReducer, [])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "add", payload: todo })
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

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if (!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }

    let add, 
    active=todos,
    completed = completedTodos

    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index, 1);
    }else{
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add)
    }else {
      completed.splice(destination.index, 0, add)
    }
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>TODOFY</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          dispatch={dispatch}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>

  );
}

export default App;
