"use client";

import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [duplicateTodoError, setDuplicateTodoError] = useState("");

  const addTodo = (text) => {
    if (todos.some((todo) => todo.text === text)) {
      setDuplicateTodoError("Todo sudah ada!");
    } else {
      setTodos([...todos, { text, isDone: false }]);
      setDuplicateTodoError("");
    }
  };

  const removeTodo = (text) => {
    const newTodos = todos.filter((todo) => todo !== text);
    setTodos(newTodos);
  };

  const handleSubmit = () => {
    if (!text) return;
    addTodo(text);
    setText("");
  };

  const handleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isDone = !updatedTodos[index].isDone;
    setTodos(updatedTodos);
  };

  return (
    <div className="flex flex-col gap-6 p-10 items-start justify-center ">
      <p className="font-semibold text-3xl bg-slate-800 text-white tracking-wide">
        {" "}
        Masukkan Kegiatan
      </p>
      <div className="flex gap-5 w-full">
        <input
          type="text"
          className=" w-1/2 h-10 px-4 rounded-md outline-none border-2 border-slate-800 focus:bg-white/60 text-slate-800 font-semibold"
          onChange={(e) => {
            setText(e.target.value);
            setDuplicateTodoError("");
          }}
          value={text}
          placeholder="Gym at 10.00 AM"
          autoFocus
        />
        <button
          type="submit"
          className="bg-slate-800 hover:bg-slate-200 hover:text-slate-800 py-2 text-white font-semibold transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md shadow-sm px-2"
          onClick={handleSubmit}
        >
          {" "}
          ADD TODO
        </button>
      </div>
      <div className="flex flex-col gap-4 text-slate-800 w-full ">
        <h1 className="font-semibold text-2xl mb-4 bg-slate-800 text-white text-center py-1">
          Kegiatan Anda
        </h1>
        {todos.map((todo, index) => {
          return (
            <div
              key={index}
              className={`text-xl font-medium flex w-full justify-between px-5 `}
            >
              <p className={`${todo.isDone ? "line-through" : "no-underline"}`}>
                {duplicateTodoError ? (
                  <>{duplicateTodoError}</>
                ) : (
                  <>{todo.text.charAt(0).toUpperCase() + todo.text.slice(1)}</>
                )}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDone(index)}
                  className="bg-slate-800 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md shadow-sm hover:bg-slate-200 hover:text-slate-800 px-2"
                  disabled={duplicateTodoError}
                >
                  <AiOutlineCheck />
                </button>
                <button
                  onClick={() => removeTodo(todo)}
                  className="bg-slate-800 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md shadow-sm hover:bg-slate-200 hover:text-slate-800 px-2"
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
