import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import todoImg from "../assets/todo.png";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);
  useEffect(() => {
    const localToDoList = JSON.parse(localStorage.getItem("todolist"));
    if (localToDoList) {
      dispatch(setTodoList(localToDoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(true);
    }
  };

  const handleDelTodo = (id) => {
    const updateTodo = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updateTodo));
    localStorage.setItem("todolist", JSON.stringify(updateTodo));
  };

  const handleUpdateTodo = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(
        updateTodo({
          task: task,
          id: id,
        })
      );
      setShowModal(false);
    }
  };
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });
  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center ">
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              className="border p-2 rounded-md outline-none mb-8 w-full"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update Your Task Here" : "Enter Your Task Here"
              }
            />
            <div className="flex flex-row gap-20">
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateTodo(currentTodo.id, newTask);
                    }}
                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="bg-Tangarao rounded-md text-white py-3 px-8"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                    onClick={() => {
                      setShowModal(false);
                      handleAddTodo(newTask);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-Tangarao rounded-md text-white py-3 px-8"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <>
            <div className="mb-8">
              <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
                <img src={todoImg} alt="" width="1600px" height="1600px" />
              </div>
              <p className="text-center text-Gray">
                You have no Todo's, Please Add one
              </p>
            </div>
          </>
        ) : (
          <div className="container mx-auto mmt-6">
            <div className="flex justify-center mb-6">
              <select onChange={(e) => handleSort(e.target.value)}>
                <option className="text-sm" value="All">
                  All
                </option>
                <option className="text-sm" value="Completed">
                  Completed
                </option>
                <option className="text-sm" value="Not Completed">
                  Not Completed
                </option>
              </select>
            </div>
            <div>
              {sortToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className="flex flex-row items-center justify-between mb-6 bg-Tangarao mx-auto w-full md:w-[75%] rounded-md p-4 "
                >
                  <div
                    onClick={() => {
                      handleToggleCompleted(todo.id);
                    }}
                    className={`${
                      todo.completed
                        ? "line-through text-greenTeal"
                        : "text-sunsetOrange"
                    }`}
                  >
                    {todo.task}
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-white p-1 rounded-md ml-2 "
                      onClick={() => {
                        setShowModal(true);
                        setCurrentTodo(todo);
                        setNewTask(todo.task);
                      }}
                    >
                      <TiPencil />
                    </button>
                    <button
                      className="bg-sunsetOrange text-white p-1 rounded-md ml-2 "
                      onClick={() => handleDelTodo(todo.id)}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
