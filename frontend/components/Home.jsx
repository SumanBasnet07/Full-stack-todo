import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      console.log("error creating todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:3000/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("couldnot delete the todo");
    }
  };

const logout = async () =>{
   const data = await axios.get("http://localhost:3000/user/logout",{withCredentials:true})
    // console.log(data.data.message)
    toast.success(data.data.message)
    localStorage.removeItem("JWT")
    navigateTo('/login')
}

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="lg:w-[50vw] w-screen lg:h-[90vh] max-h-[100vh] h-[100vh] bg-gray-300 lg:rounded-2xl relative">
        <h1 className="text-3xl font-bold text-center mt-5 mb-5">Todo App</h1>
        <div className=" flex p-2 gap-3">
          <input
            className="bg-white p-3 rounded-2xl w-full outline-0"
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => {
              return setNewTodo(e.target.value);
            }}
          />
          <button
            onClick={() => createTodo()}
            className="bg-blue-500 px-6 rounded-2xl cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="lg:h-[50vh] h-[70vh] overflow-auto">
          {todos.map((todo, index) => (
            <li
              className="flex justify-between px-5 py-2  items-center"
              key={todo._id}
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                />
                <p
                  className={`text-xl ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.text}
                </p>
              </div>
              <button
                className="text-white bg-red-500 px-3 py-2 rounded-2xl cursor-pointer"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <p className="text-gray-500">{`${
            todos.filter((todo) => !todo.completed).length
          } todos remaining`}</p>
          <button onClick={()=>logout()}className="bg-red-600 text-white px-5 py-3 rounded-2xl mb-5 mt-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
