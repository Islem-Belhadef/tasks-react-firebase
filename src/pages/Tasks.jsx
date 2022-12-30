// React & Router
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

// Components
import SideMenu from "../components/SideMenu";
import TaskCard from "../components/TaskCard";
import LoadingAnimation from "../components/LoadingAnimation";

const Tasks = () => {
  const { currentUser } = useAuth();
  const { lightMode, light, dark } = useTheme();
  const { categories, tasks, addTask, isLoading } = useTasks();
  
  const date = new Date();
  const now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'+date.getHours()+':'+date.getMinutes();
  
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const [datetime, setDatetime] = useState(now);

  const getLatestTasks = () => {
    //
  };

  const createNewTask = () => {
    //
  };

  const handleAddTask = (e) => {
    addTask(body, datetime, category);
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="md:flex md:h-screen"
      style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
    >
      <SideMenu />
      <div
        className="w-full m-2 rounded-2xl overflow-y-scroll"
        style={{
          backgroundColor: lightMode ? light.background : dark.background,
        }}
      >
        <div className=" flex flex-col items-center w-11/12 m-auto">
          <h1
            className="text-5xl font-body font-bold mt-20 mb-10"
            style={{ color: lightMode ? light.header : dark.header }}
          >
            What are your tasks for today {currentUser.displayName}?
          </h1>
          <form
            className="w-full flex justify-center"
            onSubmit={(e) => {
              handleAddTask(e);
            }}
            autoComplete="off"
          >
            <div
              className="rounded-xl p-3 flex items-center w-3/4"
              style={{ backgroundColor: lightMode ? light.card : dark.card }}
            >
              <input
                type="text"
                name="task"
                id="task"
                maxLength="100"
                placeholder="New task.."
                className="mx-5 py-2 w-4/6 bg-transparent focus:outline-none"
                required
                value={body}
                onChange={(e) => {
                  e.preventDefault();
                  setBody(e.target.value);
                }}
                style={{ color: lightMode ? light.text : dark.text }}
              />
              <div
                className="rounded-lg h-10 w-10 mr-3 flex justify-center items-center"
                style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
              >
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-transparent text-4xl text-transparent cursor-pointer focus:outline-none"
                  value={datetime}
                  onChange={(e) => {
                    setDatetime(e.target.value);
                  }}
                />
              </div>
              <select
                name="category"
                id="category"
                className="rounded-lg py-2 px-4 pr-10 font-medium cursor-pointer focus:outline-none"
                style={{
                  backgroundColor: lightMode ? light.btn : dark.btn,
                  color: lightMode ? light.primary : dark.text,
                  backgroundImage: lightMode
                    ? "url(/arrow_down_light.svg)"
                    : "url(/arrow_down_dark.svg)",
                }}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="" disabled>Category</option>
                {categories.map((category, i) => (
                  <option
                    key={i}
                    value={category.name}
                    style={{
                      backgroundColor: category.color,
                      color: light.text,
                    }}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg ml-3 py-2 px-4 font-medium"
                style={{
                  backgroundColor: lightMode ? light.primary : dark.primary,
                  color: dark.text,
                }}
              >
                Add
              </button>
            </div>
          </form>
          <h2
            className="text-3xl font-body font-bold text-left w-full mt-20 mb-4"
            style={{ color: lightMode ? light.header : dark.header }}
          >
            Recent tasks
          </h2>
          {tasks.length === 0 && <div>No tasks yet, add one</div>}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
