// React & Router
import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

// Libraries
import { motion } from "framer-motion";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTasks } from "../contexts/TasksContext";

// Components
import SideMenu from "../components/SideMenu";
import TaskCard from "../components/TaskCard";

// Assets
import arrow_down_dark from "../assets/icons/arrow_down_dark.svg";

// Firebase
import {
  doc,
  getDoc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../config/FirebaseClient";
import MobileNav from "../components/MobileNav";

const Category = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const { lightMode, light, dark } = useTheme();
  const { addTask, updateCategory, deleteCategory } = useTasks();

  const { name } = useParams();

  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categoryTasks, setCategoryTasks] = useState([]);

  const [oldLabel, setOldLabel] = useState();

  const [showCategorySettings, setShowCategorySettings] = useState(false);
  const [label, setLabel] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    getDoc(doc(firestore, "users", currentUser.uid, "categories", name))
      .then((doc) => {
        setCategory(doc.data());
        setLabel(doc.data().name);
        setOldLabel(doc.data().name);
        setColor(doc.data().color);
      })
      .catch((error) => {});

    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "users", currentUser.uid, "tasks"),
        where("category", "==", name),
        orderBy("datetime", "desc")
      ),
      (querySnapshot) => {
        setCategoryTasks([]);
        querySnapshot.forEach((doc) => {
          setCategoryTasks((prev) => [...prev, doc]);
        });
      }
    );

    return unsubscribe;
  }, [name]);

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

  const [datetime, setDatetime] = useState(now);

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(body, datetime, category.name);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    updateCategory(oldLabel, label, color);
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
    deleteCategory(oldLabel);
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="md:flex md:h-screen"
      style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
    >
      <SideMenu page="category" />
      <MobileNav />
      <div
        className="w-full md:m-2 rounded-2xl md:overflow-y-auto"
        style={{
          backgroundColor: lightMode ? light.background : dark.background,
        }}
      >
        <div className=" flex flex-col items-center w-11/12 m-auto">
          <h1
            className="text-3xl md:text-5xl font-body font-bold mt-20 mb-10"
            style={{ color: lightMode ? light.header : dark.header }}
          >
            What are your <span style={{ color: category.color }}>{name}</span>{" "}
            tasks for today {currentUser.displayName}?
          </h1>
          <form
            className="w-full flex justify-center"
            onSubmit={(e) => {
              handleAddTask(e);
            }}
            autoComplete="off"
          >
            <div
              className="rounded-xl p-3 lg:flex lg:items-center w-3/4"
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
                <div
                  className="rounded-lg ml-3 py-2 px-4 font-medium"
                  style={{
                    color: light.text,
                    backgroundColor: category.color,
                  }}
                >
                  {category.name}
                </div>
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
          <div className="h-16"></div>
          {categoryTasks.length === 0 && (
            <div>
              <h3 className="text-xl font-body font-semibold w-full mt-4 text-white">
                You don't have any {name} tasks 👏
              </h3>
            </div>
          )}
          {categoryTasks.map((task, i) => (
            <motion.div
              key={task.id}
              className="w-full"
              initial={{ y: -i * 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <TaskCard task={task} />
            </motion.div>
          ))}
          <div
            className="my-10 w-full flex gap-2 items-center cursor-pointer"
            onClick={() => {
              setShowCategorySettings(!showCategorySettings);
            }}
          >
            <h3 className="text-lg font-body" style={{ color: dark.text }}>
              Show category settings
            </h3>
            {!showCategorySettings && (
              <motion.img
                inital={{ rotate: 180 }}
                animate={{ rotate: 360 }}
                src={arrow_down_dark}
                alt="arrow"
              />
            )}
            {showCategorySettings && (
              <motion.img
                inital={{ rotate: 360 }}
                animate={{ rotate: 180 }}
                src={arrow_down_dark}
                alt="arrow"
              />
            )}
          </div>
          {showCategorySettings && (
            <motion.div
              inital={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="mb-8 p-4 rounded-lg w-11/12 sm:w-fit"
              style={{ backgroundColor: lightMode ? light.card : dark.card }}
            >
              <form
                onSubmit={(e) => {
                  handleUpdateCategory(e);
                  navigate("/");
                }}
                className="flex flex-col gap-6"
                autoComplete="off"
              >
                <label
                  htmlFor="name"
                  className="flex items-center gap-4"
                  style={{ color: lightMode ? light.text : dark.text }}
                >
                  Category label
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    maxLength="20"
                    placeholder="Category.."
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    className="py-2 px-4 rounded-lg focus:outline-none font-normal w-full sm:w-fit"
                    style={{
                      backgroundColor: lightMode ? light.btn : dark.btn,
                      color: lightMode ? light.text : dark.text,
                    }}
                  />
                </label>
                <label
                  htmlFor="color"
                  className="flex items-center gap-4"
                  style={{ color: lightMode ? light.text : dark.text }}
                >
                  Category color
                  <input
                    type="color"
                    name="color"
                    id="color"
                    required
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    className="rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: lightMode ? light.btn : dark.btn,
                      color: lightMode ? light.text : dark.text,
                    }}
                  />
                </label>
                <div className="flex gap-6">
                  <button
                    onClick={(e) => {
                      handleDeleteCategory(e);
                      navigate("/");
                    }}
                    type="submit"
                    className="py-3 w-40 rounded-lg text-white bg-red-500 sm:text-lg font-medium"
                  >
                    Delete Category
                  </button>
                  <button
                    type="submit"
                    className="py-3 w-40 rounded-lg text-white sm:text-lg font-medium"
                    style={{ backgroundColor: light.primary }}
                  >
                    Update Category
                  </button>
                </div>
                <small style={{ color: "gray" }}>
                  Deleting the category won't delete the tasks with this
                  category
                </small>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
