import { useState } from "react";

import dots from "../assets/icons/dots_blue.svg";
import arrowDown from "../assets/icons/arrow_down_light.svg";
import heart from "../assets/icons/heart_blue.svg";
import trash from "../assets/icons/trash.svg";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

const TaskCard = ({task}) => {
  const { lightMode, light, dark } = useTheme();
  const { tasks, categories } = useTasks();

  const [optionsModal, setOptionsModal] = useState(false);

  const category = categories.filter(obj => {
    return obj.name === task.category;
  });

  return (
    <div
      className="rounded-xl px-4 py-3 my-2 w-full"
      style={{ backgroundColor: lightMode ? light.card : dark.card }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-md w-6 h-6" style={{backgroundColor: category.length != 0 ? category[0].color : lightMode? light.btn:dark.btn}}></div>
          <h3
            className="mx-5 py-2 text-lg"
            style={{ color: lightMode ? light.text : dark.text }}
          >
            {task.body}
          </h3>
        </div>
        <div className="flex items-center">
          <h3
            className="mx-5 py-2"
            style={{ color: lightMode ? light.text : dark.text }}
          >
            {task.datetime}
          </h3>
          <input type="checkbox" name="done" id="done" />
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
        <div>
          <div className="bg-accent h-px w-full my-3 rounded-md"></div>
          <div className="flex items-center justify-end">
            <select
              name="category"
              id="category"
              className="rounded-lg mx-2 py-2 pl-4 pr-10  text-accent font-medium cursor-pointer focus:outline-none drop-shadow-none"
              style={{
                backgroundColor: lightMode ? light.btn : dark.btn,
                backgroundImage: "url(/arrow_down_light.svg)",
              }}
            >
              <option
                value="personal"
                className="bg-red-100 text-text font-body"
              >
                Personal
              </option>
              <option value="work" className="bg-green-100 text-text font-body">
                Work
              </option>
              <option
                value="family"
                className="bg-yellow-100 text-text font-body"
              >
                Family
              </option>
            </select>
            <div
              className="rounded-lg mx-2 py-2 px-4 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
            >
              <img src={heart} alt="heart" className="w-4 mr-3" />
              <p className="text-accent font-medium ">Add to favorites</p>
            </div>
            <div
              className="rounded-lg ml-2 py-2 px-4 flex justify-center items-center cursor-pointer"
              style={{ backgroundColor: lightMode ? light.btn : dark.btn }}
            >
              <img src={trash} alt="trash" className="w-4 mr-3" />
              <p className="text-red-500 font-medium ">Delete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
