import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../ToDoSlice"; // Importing specific actions from the ToDoSlice file to manipulate todo items
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import todoImg from "../assets/todo.png";

//Defining ToDoList components
const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);// Accessing the todoList from the Redux store
  const sortCriteria = useSelector((state) => state.todo.sortCriteria); // Accessing the sortCriteria from the Redux store

    // State for controlling the visibility of the modal dialog
  const [showModal, setShowModal] = useState(false);
    // State for tracking the current todo item being edited
  const [currentTodo, setCurrentTodo] = useState(null);
    // State for the new task description input
  const [newTask, setNewTask] = useState("");

    // Effect hook to persist todoList to localStorage whenever it changes
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);

    // Effect hook to load the todoList from localStorage on component mount
  useEffect(() => {
    const localToDoList = JSON.parse(localStorage.getItem("todolist"));
    if (localToDoList) {
      dispatch(setTodoList(localToDoList));
    }
  }, []);

    // Function to add a new todo item

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

    // Function to delete a todo item
  const handleDelTodo = (id) => {
    const updateTodo = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updateTodo));
    localStorage.setItem("todolist", JSON.stringify(updateTodo));
  };

    // Function to update of todo items.
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

    // Function to handle sorting of todo items based on the selected criteria
  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

    // Function to toggle the completion status of a todo item
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
              onChange={(e) => setNewTask(e.target.value)} //input value is set to newTask
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
                      handleUpdateTodo(currentTodo.id, newTask); //updating the todo item
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
                      handleAddTodo(newTask); //Adding new item to todo list.
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
        {todoList.length === 0 ? ( //checking if todoList is empty if so display image otherwise display todolist
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
              {sortToDoList.map((todo) => ( //mapping through the todolist by the values given by user
                <div
                  key={todo.id}
                  className="flex flex-row items-center justify-between mb-6 bg-Tangarao mx-auto w-full md:w-[75%] rounded-md p-4 "
                >
                  <div
                    onClick={() => {
                      handleToggleCompleted(todo.id); //toggling the completion status of the todo item
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
                        setCurrentTodo(todo); //updating the todo item
                        setNewTask(todo.task); //setting new updated task
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
