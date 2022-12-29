// React & Router
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import SideMenu from "../components/SideMenu";
import TaskCard from "../components/TaskCard";

// Assets
import arrowDown from "../assets/icons/arrow_down_blue.svg";
import calendar from "../assets/icons/calendar_blue.svg";

const Tasks = () => {
  const { currentUser } = useAuth();
  const { lightMode, light, dark} = useTheme();

  const task = {
    body: "Workout abs + biceps",
    date: "08:00 AM",
  };

  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDate, setNewDate] = useState("");

  const getLatestTasks = () => {
    //
  };

  const createNewTask = () => {
    //
  };

  useEffect(() => {
    //
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />; 
  }

  return (
    <div className="md:flex md:h-screen" style={{backgroundColor: lightMode ? light.wall : dark.wall}}>
      <SideMenu />
      <div className="w-full m-2 rounded-2xl overflow-y-scroll" style={{backgroundColor: lightMode ? light.background : dark.background}}>
        <div className=" flex flex-col items-center w-11/12 m-auto">
          <h1 className="text-5xl font-body font-bold mt-20 mb-10" style={{color: lightMode ? light.header : dark.header}}>
            What are your tasks for today Islem?
          </h1>
          <div className="rounded-xl p-3 flex items-center w-3/4" style={{backgroundColor: lightMode ? light.card : dark.card}}>
            <div className="bg-gray-100 rounded-md w-6 h-6"></div>
            <input
              type="text"
              name="task"
              id="task"
              maxLength="100"
              placeholder="New task.."
              className="mx-5 py-2 w-4/6 bg-transparent focus:outline-none"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
            />
            <div className="bg-gray-100 rounded-lg h-10 w-10 mr-3 flex justify-center items-center">
              <img src={calendar} alt="calendar" className="w-6" />
            </div>
            <div className="bg-gray-100 rounded-lg py-2 px-4 flex justify-center items-center cursor-pointer">
              <p className="text-accent font-medium">Category</p>
              <img src={arrowDown} alt="arrow down" className="w-3 ml-3" />
            </div>
          </div>
          <h2 className="text-3xl font-body font-bold text-left w-full mt-20 mb-4" style={{color: lightMode ? light.header : dark.header}}>
            Recent tasks
          </h2>
          <TaskCard task={task} />
          <TaskCard task={task} />
          <TaskCard task={task} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
