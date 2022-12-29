import { useState } from "react";

import dots from "../assets/icons/dots_blue.svg";
import arrowDown from "../assets/icons/arrow_down_blue.svg";
import calendar from "../assets/icons/calendar_blue.svg";
import heart from "../assets/icons/heart_blue.svg";
import trash from "../assets/icons/trash.svg";
import { useTheme } from "../contexts/ThemeContext";

const TaskCard = (props) => {
  const { lightMode, light, dark} = useTheme();
  const task = props.task;

  const [optionsModal, setOptionsModal] = useState(false);

  const deleteTask = () => {
    // 
  };

  const toggleFavorite = () => {
    // 
  };

  const changeCategory = () => {
    // 
  };

  return (
    <div className="rounded-xl px-4 py-3 my-2 w-full" style={{backgroundColor: lightMode ? light.card : dark.card}}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <div className="bg-red-300 rounded-md w-6 h-6"></div>
        <h3 className="mx-5 py-2 text-lg" style={{color: lightMode ? light.text : dark.text}}>{task.body}</h3>
        </div>
        <div className="flex items-center">
          <h3 className="mx-5 py-2" style={{color: lightMode ? light.text : dark.text}}>{task.date}</h3>
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
      { optionsModal && (<div>
        <div className="bg-accent h-px w-full my-3 rounded-md"></div>
        <div className="flex items-center justify-end">
          <div className="bg-gray-100 rounded-lg mx-2 py-2 px-4 flex justify-center items-center cursor-pointer">
            <p className="text-accent font-medium">Category</p>
            <img src={arrowDown} alt="arrow down" className="w-3 ml-3" />
          </div>
          <div className="bg-gray-100 rounded-lg mx-2 py-2 px-4 flex justify-center items-center cursor-pointer">
            <img src={heart} alt="heart" className="w-4 mr-3" />
            <p className="text-accent font-medium ">Add to favorites</p>
          </div>
          <div className="bg-gray-100 rounded-lg ml-2 py-2 px-4 flex justify-center items-center cursor-pointer">
            <img src={trash} alt="trash" className="w-4 mr-3" />
            <p className="text-red-500 font-medium ">Delete</p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default TaskCard;
