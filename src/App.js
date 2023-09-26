import logo from "./logo.svg";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);

  // Read from LocalStorage
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if(todos.length > 0)
    {

      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  function submitToAdd(e) {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Invalid Task");
      setTodo("");
    }
  }

  function deleteTodo(id) {
    let updatedTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  }

  function toggleComplete(id) {
    let updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodo);
  }

  function editTodo(id) {
    let updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setEditText("");
    setTodos(updatedTodo);
    setTodoEditing(null);
  }

  return (
    <div className="App">
      <div className="mx-auto max-w-4xl rounded-lg my-48 bg-gray-600 text-gray-300 p-4">
        <h1 className="font-thin text-4xl ">My Special Todo App</h1>
        <form>
          <div className="flex my-5 gap-4">
            <input
              type="text"
              value={todo}
              onChange={(e) => {
                setTodo(e.target.value);
              }}
              className="w-96 text-lg bg-gray-700 border-none focus:ring-0 rounded-lg px-3 py-2"
              placeholder="What do You Want to Do Today ?"
            />
            <button
              type="submit"
              onClick={(e) => submitToAdd(e)}
              className="bg-pink-600 px-4 py-1 uppercase font-bold text-lg rounded-lg tracking-wider hover:bg-pink-700 transition duration-300"
            >
              Add
            </button>
          </div>
        </form>
        <div>
          <h1 className="font-thin text-3xl">Tasks</h1>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={"flex justify-between my-2 bg-gray-800 p-3 rounded-xl"}
            >
              <div
                className={
                  todo.completed
                    ? "text-green-500 text-xl flex items-center gap-2"
                    : "text-yellow-400 text-xl flex items-center gap-2"
                }
              >
                <input
                  type="checkbox"
                  onChange={() => {
                    toggleComplete(todo.id);
                  }}
                  checked={todo.completed}
                  className={
                    todo.completed
                      ? "border-green-500 text-green-500"
                      : " border-yellow-400 text-yellow-500 focus:ring-0"
                  }
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    className="focus:ring-0 border-none bg-gray-700 rounded-xl text-lg"
                    onChange={(e) => {
                      setEditText(e.target.value);
                    }}
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>
              <div className="flex">
                {todo.id === todoEditing ? (
                  <button
                    onClick={() => {
                      editTodo(todo.id);
                    }}
                    className="px-2 font-black uppercase text-green-500 cursor-pointer hover:text-green-600 transition"
                  >
                    Submit to Edit
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTodoEditing(todo.id);
                    }}
                    className="px-2 font-black uppercase text-yellow-400 cursor-pointer hover:text-yellow-500 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                  className="px-2 font-black uppercase text-red-600 cursor-pointer hover:text-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
