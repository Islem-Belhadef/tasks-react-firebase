// React & Router
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

const Favorites = () => {
  const { currentUser } = useAuth();
  const { lightMode, light, dark } = useTheme();
  const { favTasks } = useTasks();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="md:flex md:h-screen"
      style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
    >
      <SideMenu page="favorites" />
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
            Favorite tasks
          </h1>
          {favTasks.length === 0 && (
            <div>
              <h3 className="text-xl font-body font-semibold w-full mt-6 text-white">
                You don't have any favorite tasks 💔
              </h3>
            </div>
          )}
          {favTasks.map((task, i) => (
            <motion.div
              key={task.id}
              className="w-full"
              initial={{ y: -i * 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
