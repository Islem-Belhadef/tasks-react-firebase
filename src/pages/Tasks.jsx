// React & Router
import { useState } from "react";
import { Navigate } from "react-router-dom";

// Libraries
import { motion } from "framer-motion";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

// Components
import SideMenu from "../components/SideMenu";
import TaskCard from "../components/TaskCard";
import MobileNav from "../components/MobileNav";

const Tasks = () => {
  const { currentUser } = useAuth();
  const { lightMode, light, dark } = useTheme();
  const { categories, tasks, addTask, isLoading } = useTasks();

  const date = new Date();
  const now =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "T" +
    date.getHours() +
    ":" +
    date.getMinutes();

  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [datetime, setDatetime] = useState(now);

  const handleAddTask = (e) => {
    e.preventDefault();
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
      <SideMenu page="tasks" />
      <MobileNav />
      <div
        className="rounded-xl w-full md:m-2 md:rounded-2xl overflow-y-scroll"
        style={{
          backgroundColor: lightMode ? light.background : dark.background,
        }}
      >
        <div className=" flex flex-col items-center w-11/12 m-auto">
          <h1
            className="text-3xl md:text-5xl font-body font-bold mt-10 md:mt-20 mb-10"
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
              className="rounded-xl p-3 lg:flex lg:items-center w-full md:w-3/4"
              style={{ backgroundColor: lightMode ? light.card : dark.card }}
            >
              <input
                type="text"
                name="task"
                id="task"
                maxLength="100"
                placeholder="New task.."
                className="mx-5 py-4 md:py-2 w-4/6 bg-transparent focus:outline-none font-body"
                required
                value={body}
                onChange={(e) => {
                  e.preventDefault();
                  setBody(e.target.value);
                }}
                style={{ color: lightMode ? light.text : dark.text }}
              />
              <div className="flex items-center w-full justify-center">
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
                  <option value="" disabled>
                    Category
                  </option>
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
            </div>
          </form>
          <h2
            className="text-xl md:text-3xl font-body font-bold text-left w-full mt-20 mb-4"
            style={{ color: lightMode ? light.header : dark.header }}
          >
            Recent tasks
          </h2>
          {tasks.length === 0 && (
            <div>
              <h3 className="md:text-xl font-body font-semibold w-full mt-6 text-white">
                You don't have any tasks 👏
              </h3>
            </div>
          )}
          {tasks.map((task, i) => {
            return (
              <motion.div
                key={task.id}
                className="w-full"
                initial={{ y: -i * 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <TaskCard task={task} />
              </motion.div>
            );
          })}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
