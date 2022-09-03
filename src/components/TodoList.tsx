import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<Props> = ( { todos, setTodos}) => {
  return (
    <div className="todos">
         {todos.map(ele => 
          <SingleTodo todo={ele} todos={todos} setTodos={setTodos} key={ele.id} />
         )}
    </div>
  )
}

export default TodoList