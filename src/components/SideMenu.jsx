// React & Router
import { useState } from "react";
import { Link } from "react-router-dom";

// Libraries
import { motion } from "framer-motion";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

// Assets
import tasks_light from "../assets/icons/tasks_light.svg";
import tasks_dark from "../assets/icons/tasks_dark.svg";
import categories_light from "../assets/icons/categories_light.svg";
import categories_dark from "../assets/icons/categories_dark.svg";
import heart_light from "../assets/icons/heart_light.svg";
import heart_dark from "../assets/icons/heart_dark.svg";
import arrow_down from "../assets/icons/arrow_down.svg";
import arrow_down_dark from "../assets/icons/arrow_down_dark.svg";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import user_light from "../assets/icons/user_light.svg";
import user_dark from "../assets/icons/user_dark.svg";
import NewCategoryModal from "./NewCategoryModal";
import LogoutModal from "./LogoutModal";

const SideMenu = ({page}) => {
  const { currentUser } = useAuth();
  const { lightMode, setLightMode, light, dark } = useTheme();
  const { categories: tasksCategories } = useTasks();

  const [categoriesShown, setCategoriesShown] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  // const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleChangeTheme = () => {
    setLightMode(!lightMode);
    window.localStorage.setItem("lightMode", !lightMode);
  };

  return (
    <>
      <div className="md:w-1/3 min-w-fit text-center h-full hidden md:block">
        <div className="p-6 flex flex-col justify-between h-screen">
          <div>
            <div
              className="logo font-header text-2xl font-bold"
              style={{ color: lightMode ? light.background : dark.text }}
            >
              Dhakerni
            </div>
            {page==="profile" && <Link
              to="/profile"
              className={
                lightMode
                  ? "flex items-center my-6 px-4 py-2 rounded-md bg-hoverLight"
                  : "flex items-center my-6 px-4 py-2 rounded-md bg-hoverDark"
              }
            >
              <img
                src={currentUser.photoURL ? currentUser.photoURL : lightMode?user_light:user_dark}
                alt="pfp"
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4
                className="font-header text-xl"
                style={{ color: lightMode ? light.text : dark.text }}
              >
                {currentUser.displayName}
              </h4>
            </Link>}
            {page!="profile" && <Link
              to="/profile"
              className={
                lightMode
                  ? "flex items-center my-6 px-4 py-2 rounded-md hover:bg-hoverLight"
                  : "flex items-center my-6 px-4 py-2 rounded-md hover:bg-hoverDark"
              }
            >
              <img
                src={currentUser.photoURL ? currentUser.photoURL : lightMode?user_light:user_dark}
                alt="pfp"
                className="w-12 h-12 rounded-full mr-4"
              />
              <h4
                className="font-header text-xl"
                style={{ color: lightMode ? light.text : dark.text }}
              >
                {currentUser.displayName}
              </h4>
            </Link>}
            <nav id="nav">
              <ul>
                {page!="tasks" && <li
                  className={
                    lightMode
                      ? "my-2 hover:bg-hoverLight rounded-md"
                      : "my-2 hover:bg-hoverDark rounded-md"
                  }
                >
                  <Link
                    to="/tasks"
                    className="flex items-center font-header text-xl"
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={tasks_light}
                        alt="tasks"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img src={tasks_dark} alt="tasks" className="w-14 mr-2" />
                    )}
                    All tasks
                  </Link>
                </li>}
                {page==="tasks" && <li
                  className={
                    lightMode
                      ? "my-2 bg-hoverLight rounded-md"
                      : "my-2 bg-hoverDark rounded-md"
                  }
                >
                  <Link
                    to="/tasks"
                    className="flex items-center font-header text-xl"
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={tasks_light}
                        alt="tasks"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img src={tasks_dark} alt="tasks" className="w-14 mr-2" />
                    )}
                    All tasks
                  </Link>
                </li>}
                {page!="category" && <li
                  className={
                    lightMode
                      ? "my-2 hover:bg-hoverLight rounded-md  flex items-center justify-between cursor-pointer"
                      : "my-2 hover:bg-hoverDark rounded-md  flex items-center justify-between cursor-pointer"
                  }
                  onClick={() => {
                    setCategoriesShown(!categoriesShown);
                  }}
                >
                  <div
                    className="flex items-center font-header text-xl"
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={categories_light}
                        alt="categories"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img
                        src={categories_dark}
                        alt="categories"
                        className="w-14 mr-2"
                      />
                    )}
                    Categories
                  </div>
                  {lightMode && (
                    <img
                      src={arrow_down}
                      alt="arrow down"
                      className="w-8"
                      style={{
                        transform: categoriesShown
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                  {!lightMode && (
                    <img
                      src={arrow_down_dark}
                      alt="arrow down"
                      className="w-8"
                      style={{
                        transform: categoriesShown
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                </li>}
                {page==="category" && <li
                  className={
                    lightMode
                      ? "my-2 bg-hoverLight rounded-md  flex items-center justify-between cursor-pointer"
                      : "my-2 bg-hoverDark rounded-md  flex items-center justify-between cursor-pointer"
                  }
                  onClick={() => {
                    setCategoriesShown(!categoriesShown);
                  }}
                >
                  <div
                    className="flex items-center font-header text-xl"
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={categories_light}
                        alt="categories"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img
                        src={categories_dark}
                        alt="categories"
                        className="w-14 mr-2"
                      />
                    )}
                    Categories
                  </div>
                  {lightMode && (
                    <img
                      src={arrow_down}
                      alt="arrow down"
                      className="w-8"
                      style={{
                        transform: categoriesShown
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                  {!lightMode && (
                    <img
                      src={arrow_down_dark}
                      alt="arrow down"
                      className="w-8"
                      style={{
                        transform: categoriesShown
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  )}
                </li>}

                {categoriesShown && (
                  <motion.div
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {tasksCategories.map((cat, i) => (
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
                      }}
                      className={lightMode ? "flex items-center gap-4 hover:bg-hoverLight w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer" : "flex items-center gap-4 hover:bg-hoverDark w-5/6 py-2 px-4 rounded-lg ml-6 cursor-pointer"}
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

                {page!="favorites" && <li
                  className={
                    lightMode
                      ? "my-2 hover:bg-hoverLight rounded-md"
                      : "my-2 hover:bg-hoverDark rounded-md"
                  }
                >
                  <Link
                    to="/favorites"
                    className="flex items-center font-header text-xl "
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={heart_light}
                        alt="heart"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img src={heart_dark} alt="heart" className="w-14 mr-2" />
                    )}
                    Favorites
                  </Link>
                </li>}
                {page==="favorites" && <li
                  className={
                    lightMode
                      ? "my-2 bg-hoverLight rounded-md"
                      : "my-2 bg-hoverDark rounded-md"
                  }
                >
                  <Link
                    to="/favorites"
                    className="flex items-center font-header text-xl "
                    style={{ color: lightMode ? light.text : dark.text }}
                  >
                    {lightMode ? (
                      <img
                        src={heart_light}
                        alt="heart"
                        className="w-14 mr-2"
                      />
                    ) : (
                      <img src={heart_dark} alt="heart" className="w-14 mr-2" />
                    )}
                    Favorites
                  </Link>
                </li>}
              </ul>
            </nav>
          </div>
          <div className="flex items-center w-full gap-4 self-end">
            <div
              onClick={handleChangeTheme}
              className="rounded-lg cursor-pointer p-4"
              style={{
                backgroundColor: lightMode ? light.background : dark.background,
              }}
            >
              {lightMode && (
                <motion.img
                  initial={{ scale: 0, rotate: 360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 360 }}
                  src={sun}
                  alt="light mode"
                  className="w-6"
                />
              )}{" "}
              {!lightMode && (
                <motion.img
                  initial={{ scale: 0, rotate: 360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 360 }}
                  src={moon}
                  alt="dark mode"
                  className="w-6"
                />
              )}
            </div>
            {/* <div
              onClick={() => {
                setShowLogoutModal(true);
              }}
              className="rounded-lg text-red-600 cursor-pointer p-3 w-full"
              style={{
                backgroundColor: lightMode ? "#fadedc" : dark.background,
              }}
            >
              Logout
            </div> */}
          </div>
        </div>
      </div>
      {showNewCategoryModal && (
        <NewCategoryModal setShowNewCategoryModal={setShowNewCategoryModal} />
      )}
      {/* {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )} */}
    </>
  );
};

export default SideMenu;
