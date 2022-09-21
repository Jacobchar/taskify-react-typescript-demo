import React, { useEffect, useState } from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodoList: Todo[];
  setCompletedTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todoList,
  setTodoList,
  completedTodoList,
  setCompletedTodoList,
}) => {
  const [updateLists, setUpdateLists] = useState<boolean>(false);

  useEffect(() => {
    if (updateLists) {
      let recentlyCompleted: Todo[] = todoList.filter((todo) => todo.isDone === true);
      let recentlyUncompleted: Todo[] = completedTodoList.filter((todo) => todo.isDone === false);
      // Add any 'uncompleted' tasks that have been marked as not done to the active todo list
      // AND
      // Remove completed tasks from the active task list
      setTodoList(recentlyUncompleted.concat(todoList).filter((todo) => todo.isDone === false));

      // Add any 'completed' tasks that have been marked as done to the completed todo list
      // AND
      // Remove uncompleted tasks from the completed task list
      setCompletedTodoList(
        recentlyCompleted.concat(completedTodoList).filter((todo) => todo.isDone === true)
      );

      // Clean up the flag
      setUpdateLists(false);
    }
  }, [updateLists, setCompletedTodoList, todoList, setTodoList, completedTodoList, setUpdateLists]);

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todoList ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todoList__heading">Active Tasks</span>
            {todoList.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todoList={todoList}
                setTodoList={setTodoList}
                setUpdateLists={setUpdateLists}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="CompletedTodoList">
        {(provided, snapshot) => (
          <div
            className={`todoList remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todoList__heading">Completed Tasks</span>
            {completedTodoList.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todoList={completedTodoList}
                setTodoList={setCompletedTodoList}
                setUpdateLists={setUpdateLists}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
