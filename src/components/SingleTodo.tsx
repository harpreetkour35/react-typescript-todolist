import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((ele) =>
        ele.id === id ? { ...ele, isDone: !ele.isDone } : ele
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((ele) => ele.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((ele) => (ele.id === id ? { ...ele, todo: editTodoText } : ele))
    );
    setIsEditMode(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditMode]);

  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={index}
      key={todo.id.toString()}
    >
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="todos-single"
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {isEditMode ? (
            <input
              ref={inputRef}
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
              className="todos-single-text"
            />
          ) : todo.isDone ? (
            <s className="todos-single-text">{todo.todo}</s>
          ) : (
            <span className="todos-single-text">{todo.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() =>
                !isEditMode && !todo.isDone && setIsEditMode(!isEditMode)
              }
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
