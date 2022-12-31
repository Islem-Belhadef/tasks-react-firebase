import { useState } from "react";

import { motion } from "framer-motion";

import dots from "../assets/icons/dots_blue.svg";
import check_light from "../assets/icons/check_light.svg";
import check_dark from "../assets/icons/check_dark.svg";
import heart_blue from "../assets/icons/heart_blue.svg";
import heart_red from "../assets/icons/heart_red.svg";
import trash from "../assets/icons/trash.svg";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

const TaskCard = ({ task }) => {
  const { lightMode, light, dark } = useTheme();
  const { tasks, categories, deleteTask, updateTask } = useTasks();

  const [taskCategory, setTaskCategory] = useState(task.data().category);
  const [favorite, setFavorite] = useState(task.data().favorite);
  const [done, setDone] = useState(task.data().done);

  const [optionsModal, setOptionsModal] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const taskDate = new Date(task.data().datetime);

  const today = new Date().getDate();

  const category = categories.filter((obj) => {
    return obj.name === task.data().category;
  });

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  // const addFav = () => {
  //   updateTask(task, null, null, true);
  // };

  // const removeFav = () => {
  //   updateTask(task, null, null, false);
  // };

  const toggleFav = () => {
    updateTask(task, null, null, !favorite);
  }

  const toggleDone = () => {
    updateTask(task, !done, null, null);
  }

  const changeCategory = (cat) => {
    updateTask(task, null, cat, null);
  }

  return (
    <div
      className="rounded-xl px-4 py-3 my-2 w-full"
      style={{ backgroundColor: lightMode ? light.card : dark.card }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="rounded-md w-6 h-6"
            style={{
              backgroundColor:
                category.length != 0
                  ? category[0].color
                  : lightMode
                  ? light.btn
                  : dark.btn,
            }}
          ></div>
          <h3
            className="mx-5 py-2 text-lg"
            style={{
              color: lightMode ? light.text : dark.text,
              textDecorationLine: task.data().done ? "line-through" : "",
            }}
          >
            {task.data().body}
          </h3>
        </div>
        <div className="flex items-center">
          <h3
            className="mx-5 py-2"
            style={{ color: lightMode ? light.text : dark.text }}
          >
            {/* {task.data().datetime} */}
            {taskDate.getDate() === today
              ? taskDate.getHours()+
                ":" +
                taskDate.getMinutes()
              : months[taskDate.getMonth()] +
                " " +
                (taskDate.getDate() < 10
                  ? "0" +
                    taskDate.getDate() +
                    " - " +
                    taskDate.getHours() +
                    ":" +
                    taskDate.getMinutes()
                  : taskDate.getDate() +
                    " - " +
                    taskDate.getHours() +
                    ":" +
                    taskDate.getMinutes())}
          </h3>
          <div
            className="rounded-md w-6 h-6 cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: lightMode ? light.btn : dark.btn,
            }}
            onClick={() => {
              setDone(!done);
              toggleDone();
            }}
          >
            {done && lightMode && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                src={check_light}
                className="w-4"
              />
            )}
            {done && !lightMode && (
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                src={check_dark}
                className="w-4"
              />
            )}
          </div>
          <img
            src={dots}
            alt="dots"
            className="h-4 px-4 cursor-pointer"
            onClick={() => {
              setOptionsModal(!optionsModal);
            }}
          />
        </div>
      </div>
      {optionsModal && (
        <motion.div initial={{ y: -60 }} animate={{ y: 0 }} exit={{ y: -60 }}>
          <div className="bg-accent h-px w-full my-3 rounded-md"></div>
          <div className="flex items-center justify-end">
            <select
              name="category"
              id="category"
              className="rounded-lg py-2 px-4 pr-10 font-medium cursor-pointer focus:outline-none"
              style={{
                backgroundColor: lightMode ? light.btn : dark.btn,
                color: light.primary,
                backgroundImage: "url(/arrow_down_light.svg)",
              }}
              value={taskCategory}
              onChange={(e) => {
                changeCategory(e.target.value);
              }}
            >
              <option value="">category</option>
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
            {task.data().favorite === false && <div
              className="rounded-lg mx-2 py-2 px-4 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
              onClick={() => {
                setFavorite(!favorite);
                toggleFav();
              }}
            >
              <img src={heart_blue} alt="heart" className="w-4 mr-3" />
              <p className="text-accent font-medium ">Add to favorites</p>
            </div>}
            {task.data().favorite === true && <div
              className="rounded-lg mx-2 py-2 px-4 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
              onClick={() => {
                setFavorite(!favorite);
                toggleFav();
              }}
            >
              <img src={heart_red} alt="heart" className="w-4 mr-3" />
              <p className="text-red-500 font-medium ">Remove favorite</p>
            </div>}
            <div
              className="rounded-lg ml-2 py-2 px-4 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
              onClick={handleDeleteTask}
            >
              <img src={trash} alt="trash" className="w-4 mr-3" />
              <p className="text-red-500 font-medium ">Delete</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskCard;
