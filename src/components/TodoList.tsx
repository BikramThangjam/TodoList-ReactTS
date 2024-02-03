import React from 'react'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Actions } from '../store/actions';
import { Droppable } from 'react-beautiful-dnd';
// interface Props {
//     todos: Todo[];
//     setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

interface TodoListProps {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<TodoListProps> = ({todos, dispatch, completedTodos, setCompletedTodos}: TodoListProps) => {
  
    return (
      <div className="container">
        <Droppable droppableId="TodosList">
          {
            (provided, snapshot)=>(
              <div className={`todos ${snapshot.isDraggingOver? "drag__active": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                  <span className="todos__heading">
                    Active Tasks
                  </span>
                  {
                    todos.map((todo, index) => (
                      <SingleTodo index={index} todo={todo} todos={todos} dispatch={dispatch} setCompletedTodos={setCompletedTodos} key={todo.id}/>
                    ))
                  }
                  {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        <Droppable droppableId="TodosCompleted">
            {
              (provided, snapshot)=>(
                <div className={`todos completed ${snapshot.isDraggingOver? "drag__complete": ""}`} ref={provided.innerRef} {...provided.droppableProps}>
                  <span className="todos__heading">
                      Completed Tasks
                  </span>
                    {
                      completedTodos.map((todo, index) => (
                        <SingleTodo index={index} todo={todo} todos={completedTodos} dispatch={dispatch} setCompletedTodos={setCompletedTodos} key={todo.id}/>
                      ))
                    }
                  {provided.placeholder}
                </div>
              )
            }
            
        </Droppable>
        
      </div>
    // <div className='todos'>
    //   {todos.map(todo => (
    //     <SingleTodo todo={todo}dispatch={dispatch} key={todo.id}/>
    //   ))}
    // </div>
  )
}

export default TodoList
