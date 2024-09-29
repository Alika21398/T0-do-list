import React, { useEffect, useState } from "react";
import Bg from "./bgg.jpg";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  useEffect(() => {
    const savedTask = localStorage?.getItem("Task") || "[]";
    setTasks(JSON.parse(savedTask));
  }, []);

  const addTask = (event) => {
    //this will keep save the task entered and wil be keep on displaying
    event.preventDefault();
    const newTask = { task: inputTask, isCompleted: false };
    const allTask = [...tasks, newTask];
    localStorage.setItem("Task", JSON.stringify(allTask));
    const getTask = localStorage.getItem("Task");

    setTasks(JSON.parse(getTask));
    //after you enter task the place will be blank again
    setInputTask("");
  };

  const deleteTask = (taskIndex) => {
    const remainingTask = tasks.filter((task, index) => index !== taskIndex);
    localStorage.setItem("Task", JSON.stringify(remainingTask));
    setTasks(remainingTask);

    //  console.log("taskss" ,deleteask)
  };

  const onClickTask = (taskIndex) => {
    const updatedTask = tasks.map((item, index) => {
      // return (index==taskIndex? {...item, isCompleted:true}: item)
      if (index == taskIndex) {
        return { ...item, isCompleted: !item.isCompleted };
      } else {
        return item;
      }
    });
    localStorage.setItem("Task", JSON.stringify(updatedTask));
    setTasks(updatedTask);
  };
  //
  return (
    <>
      <div className=" relative min-h-screen object-cover ">
        <img className="relative w-full h-screen" src={Bg} alt="" />

        <div className="lg:h-[700px] lg:w-[670px]  bg-[#BE3E4D] m-auto rounded-xl shadow-xl absolute left-[30%] top-5 overflow-auto">
          <div className="text-center text-3xl font-bold text-[#ffffff] p-5">
            <h1>To-Do-List</h1>
          </div>

          <div className="border-[#d56e2d] border-2 m-8 text-white ">
            <form
              className="m-4 flex justify-between gap-5 text-black"
              onSubmit={addTask}
            >
              <input
                className="bg-[#BE3E4D] text-white flex-grow pl-5 border"
                placeholder="Enter Your Task"
                value={inputTask}
                onChange={(event) => setInputTask(event.target.value)}
              />
              <button
                type="submit"
                disabled={inputTask.length == 0}
                className="px-4 py-2 bg-[#D4B41B] rounded-lg"
              >
                Add
              </button>
              <div></div>
            </form>
            <ol className="m-4 ">
              {tasks.map((item, index) => {
                return (
                  <li
                    className="cursor-pointer flex justify-between gap-5 my-4 "
                    key={index}
                  >
                    {" "}
                    <p
                      className={`flex-grow font-light text-2xl ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.task}
                    </p>
                    <button
                      onClick={() => onClickTask(index)}
                      className={`bg-[#D7B91B] px-4 py-2 `}
                    >
                      {item.isCompleted ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-600 px-4 py-2"
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
