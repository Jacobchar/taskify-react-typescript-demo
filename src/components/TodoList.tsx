import React from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList }) => {
  return (
    <div className="todoList">
      {todoList?.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList} />
      ))}
    </div>
  );
};

export default TodoList;
