import { createContext, useContext, useEffect, useState } from "react";

import { firestore } from "../config/FirebaseClient";
import { doc, getDoc, collection, getDocs, addDoc, orderBy } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const TasksContext = createContext();

export const useTasks = () => {
  return useContext(TasksContext);
};

export const TasksProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const getTasks = () => {
    setTasks([]);
    getDocs(collection(firestore, "users", currentUser.uid, "tasks"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setTasks((prev) => [...prev, doc.data()]);
        });
        // console.log(tasks);      
      })
      .catch((error) => {
        setError(error.code);
        console.log(error);
      });
  };

  const getCategories = () => {
    setCategories([]);
    getDocs(collection(firestore, "users", currentUser.uid, "categories"), orderBy("datetime"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setCategories((prev) => [...prev, doc.data()]);
        });
        // console.log(tasks);      
      })
      .catch((error) => {
        setError(error.code);
        console.log(error);
      });
  };

  const addTask = (body, datetime, category) => {
    addDoc(collection(firestore, "users", currentUser.uid, "tasks"), {
        body: body,
        datetime: datetime,
        favorite: false,
        done: false,
        category: category
      })
      .then((res)=>{})
      .catch((error)=>{});
  };

  const updateTask = () => {
    //
  };

  const deleteTask = () => {
    //
  };

  const addCategory = () => {
    //
  };

  const deleteCategory = () => {
    //
  };

  useEffect(()=>{
    getCategories();
    getTasks();
  },[]);

  const value = {
    isLoading,
    error,
    tasks,
    categories,
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    deleteCategory,
  };

  return (
    <TasksContext.Provider value={value}>{!isLoading && children}</TasksContext.Provider>
  );
};
