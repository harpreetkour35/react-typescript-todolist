import React, { useState } from 'react'
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete,  } from 'react-icons/ai';
import { MdDone  } from 'react-icons/md';
import './styles.css';


type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({todo, todos, setTodos}) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [editTodoText, setEditTodoText] = useState<string>(todo.todo)


    const handleDone = (id:number) => {
        setTodos(todos.map(ele => ele.id === id ? {...ele, isDone: !ele.isDone} : ele))
    }
    const handleDelete = (id:number) => {
        setTodos(todos.filter(ele => ele.id !== id))
    }
  return (
    <form className='todos-single'>
        {isEditMode ?
            <input /> :
            todo.isDone ? 
            <s className='todos-single-text'>{todo.todo}</s> :
            <span className='todos-single-text'>{todo.todo}</span>
        }
        <div>
        <span className="icon" onClick={() => !isEditMode && !todo.isDone && setIsEditMode(!isEditMode)}>
        <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete/>
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
        </span>
        </div>
    </form>
  )
}

export default SingleTodo