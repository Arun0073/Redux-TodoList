import React from "react";
import Heading from "./Components/Heading";
import ToDoList from "./Components/ToDoList";
function App() {
  return (
    <div className="App container py-16 px-6 min-h-screen mx-auto">
      <Heading />
      <ToDoList/>
    </div>
  );
}

export default App;
