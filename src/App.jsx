import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "あああああ",
    "いいいいい"
  ]);
  const [completeTodos, setCompleteTodos] = useState(["ううううう"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (deleteTodoIndex) => {
    // const newtodos = incompleteTodos.filter(
    //   (todo, index) => index !== deleteTodoIndex
    // );
    const newtodos = [...incompleteTodos];
    newtodos.splice(deleteTodoIndex, 1);

    setIncompleteTodos(newtodos);
  };

  const onClickComplete = (completeTodoIndex) => {
    const newCompleteTodos = [
      ...completeTodos,
      incompleteTodos[completeTodoIndex]
    ];
    setCompleteTodos(newCompleteTodos);

    /// const newIncompleteTodo = incompleteTodos.filter(
    //   (todo, index) => index !== completeTodoIndex
    // );
    const newIncompleteTodo = [...incompleteTodos];
    newIncompleteTodo.splice(completeTodoIndex, 1);
    setIncompleteTodos(newIncompleteTodo);
  };

  const onClickUndo = (incompleteTodoIndex) => {
    // const newCompleteTodos = completeTodos.filter(
    //   (todo, index) => index !== incompleteTodoIndex
    // );
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(incompleteTodoIndex, 1);
    setCompleteTodos(newCompleteTodos);

    const newIncompleteTodos = [
      ...incompleteTodos,
      completeTodos[incompleteTodoIndex]
    ];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録は5つまで</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickUndo={onClickUndo} />
    </>
  );
};
