// React & Router
import { useState } from "react";
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

// Libraries
import { motion } from "framer-motion";

// Components
import NewCategoryModal from "./NewCategoryModal";

// Assets
import tasks_light from "../assets/icons/tasks_light.svg";
import tasks_dark from "../assets/icons/tasks_dark.svg";
import categories_light from "../assets/icons/categories_light.svg";
import categories_dark from "../assets/icons/categories_dark.svg";
import heart_light from "../assets/icons/heart_light.svg";
import heart_dark from "../assets/icons/heart_dark.svg";
import arrow_down from "../assets/icons/arrow_down.svg";
import arrow_down_dark from "../assets/icons/arrow_down_dark.svg";
import moon_dark from "../assets/icons/moon_dark.svg";
import sun_light from "../assets/icons/sun_light.svg";
import user_light from "../assets/icons/user_light.svg";
import user_dark from "../assets/icons/user_dark.svg";

const MobileNav = ({ page }) => {
  const { lightMode, light, dark, setLightMode } = useTheme();
  const { currentUser } = useAuth();
  const { categories } = useTasks();

  const [showCategories, setShowCategories] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

  const handleChangeTheme = () => {
    setLightMode(!lightMode);
    window.localStorage.setItem("lightMode", !lightMode);
  };

  return (
    <>
      <div
        className="md:hidden px-4 py-2 w-full  sticky top-0 z-20"
        style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
      >
        <div className="flex items-center justify-between">
          <Link to="/tasks">
            <h3
              className="text-xl font-header font-bold"
              style={{ color: lightMode ? light.background : dark.text }}
            >
              Dhakerni
            </h3>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 cursor-pointer">
            <div
              className="flex items-center"
              onClick={() => {
                setShowCategories(!showCategories);
              }}
            >
              {lightMode && (
                <img className="w-12" src={categories_light} alt="categories" />
              )}
              {!lightMode && (
                <img className="w-12" src={categories_dark} alt="categories" />
              )}
              <h4
                className="font-body hidden sm:block"
                style={{ color: lightMode ? light.text : dark.text }}
              >
                Categories
              </h4>
            </div>
            <Link to="/favorites" className="flex items-center">
              {lightMode && (
                <img className="w-12" src={heart_light} alt="favorites" />
              )}
              {!lightMode && (
                <img className="w-12" src={heart_dark} alt="favorites" />
              )}
              <h4
                className="font-body hidden sm:block"
                style={{ color: lightMode ? light.text : dark.text }}
              >
                Favorites
              </h4>
            </Link>
            <div className="flex items-center" onClick={handleChangeTheme}>
              {lightMode && (
                <motion.img
                  initial={{ scale: 0, rotate: 360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 360 }}
                  className="w-12 cursor-pointer"
                  src={sun_light}
                  alt="tasks"
                />
              )}
              {!lightMode && (
                <motion.img
                  initial={{ scale: 0, rotate: 360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 360 }}
                  className="w-12 cursor-pointer"
                  src={moon_dark}
                  alt="tasks"
                />
              )}
            </div>
            <Link to="/profile">
              {!currentUser.photoURL && lightMode && (
                <img
                  className="w-12 rounded-full"
                  src={user_light}
                  alt="user"
                />
              )}
              {!currentUser.photoURL && !lightMode && (
                <img className="w-12 rounded-full" src={user_dark} alt="user" />
              )}
              {currentUser.photoURL && (
                <img
                  className="w-10 rounded-full"
                  src={currentUser.photoURL}
                  alt="user"
                />
              )}
            </Link>
          </nav>
        </div>
        {showCategories && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
          >
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={"/categories/" + cat.name}
                className={
                  lightMode
                    ? "flex items-center gap-4 hover:bg-hoverLight w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer"
                    : "flex items-center gap-4 hover:bg-hoverDark w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer"
                }
              >
                <div
                  className="h-5 w-5 rounded-lg"
                  style={{ backgroundColor: cat.color }}
                ></div>
                <div
                  className="text-lg"
                  style={{
                    color: lightMode ? light.text : dark.text,
                  }}
                >
                  {cat.name}
                </div>
              </Link>
            ))}
            <div
              onClick={() => {
                setShowNewCategoryModal(true);
                setShowCategories(false);
              }}
              className={
                lightMode
                  ? "flex items-center gap-4 hover:bg-hoverLight w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer"
                  : "flex items-center gap-4 hover:bg-hoverDark w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer"
              }
            >
              <div
                className="h-5 w-5 rounded-lg"
                style={{
                  backgroundColor: lightMode ? light.btn : dark.btn,
                }}
              ></div>
              <div className="text-lg" style={{ color: "gray" }}>
                New Category
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {showNewCategoryModal && (
        <NewCategoryModal setShowNewCategoryModal={setShowNewCategoryModal} />
      )}
    </>
  );
};

export default MobileNav;
