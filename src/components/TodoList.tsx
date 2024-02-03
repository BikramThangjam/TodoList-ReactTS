import React from 'react'
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import { Actions } from '../store/actions';

// interface Props {
//     todos: Todo[];
//     setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

interface TodoListProps {
  todos: Todo[];
  dispatch: React.Dispatch<Actions>
}

const TodoList: React.FC<TodoListProps> = ({todos, dispatch}: TodoListProps) => {
  
    return (
    <div className='todos'>
      {todos.map(todo => (
        <SingleTodo todo={todo}dispatch={dispatch} key={todo.id}/>
      ))}
    </div>
  )
}

export default TodoList
