import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { FaRegEdit, FaRegTrashAlt, FaRegCheckCircle, FaRegSave } from "react-icons/fa";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import "./styles.css"
import { Actions } from '../store/actions';
import { Draggable } from 'react-beautiful-dnd';

type SingleTodoProps = {
  index: number
  todo: Todo;
  dispatch: React.Dispatch<Actions>;
  todos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<SingleTodoProps> = ({ index, todo, dispatch, todos, setCompletedTodos }: SingleTodoProps) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    dispatch({ type: "done", payload: id })
  }

  const handleDelete = (id: number) => {
    dispatch({ type: "remove", payload: id })
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    dispatch({ type: "edit", payload: { id, text: editTodo } })
    setIsEdit(false);
  }

  // const handleDone = (id: number) => {
  //   setTodos(
  //     todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo )
  //     )
  // }

  // const handleDelete = (id: number) => {
  //  setTodos(todos.filter(todo => todo.id !== id));
  // }

  // const handleEdit = (e: React.FormEvent, id: number) => {
  //   e.preventDefault();
  //   setTodos(todos.map(todo => (todo.id === id ?{...todo, todo:editTodo}:todo )));
  //   setIsEdit(false);
  // }

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit])


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form 
              className={`todos__single ${todo.isDone && "todos__complete"} ${snapshot.isDragging ? "drag" : ""}`}
              ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
              onSubmit={(e) => handleEdit(e, todo.id)}
            >
            {
              isEdit ? (

                <input ref={inputRef} type="text" className='todos__single--text' value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />

              ) : (

                todo.isDone ? (
                  <s className="todos__single--text">{todo.todo}</s>
                ) : (
                  <span className="todos__single--text">{todo.todo}</span>
                )
              )
            }

            <div className='icons'>
              <span className='icon'
                aria-placeholder='Edit'
                onClick={(e) => {
                  handleEdit(e, todo.id)
                  if (!todo.isDone) {
                    setIsEdit(!isEdit)
                  }
                }}>{isEdit ? <FaRegSave /> : <FaRegEdit />}
              </span>
              <span className='icon' onClick={() => handleDelete(todo.id)}><FaRegTrashAlt /></span>
              <span className='icon' onClick={() => handleDone(todo.id)}>{todo.isDone ? <IoArrowUndoCircleOutline style={{ width: "23px", height: "23px" }} /> : <FaRegCheckCircle />}</span>
            </div>
          </form>
        )
      }
    </Draggable>
  ) 
}

export default SingleTodo
