import { createContext, useContext, useEffect, useState } from "react";

import { firestore } from "../config/FirebaseClient";
import {
  doc,
  collection,
  addDoc,
  setDoc,
  orderBy,
  deleteDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
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
  const [favTasks, setFavTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  const getTasks = () => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "users", currentUser.uid, "tasks"),
          orderBy("datetime", "desc")
        ),
        (querySnapshot) => {
          setTasks([]);
          querySnapshot.forEach((doc) => {
            setTasks((prev) => [...prev, doc]);
          });
        }
      );

      return unsubscribe;
    }
  };

  const getFavoriteTasks = () => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "users", currentUser.uid, "tasks"),
          where('favorite', '==', true),
          orderBy("datetime", "desc")
        ),
        (querySnapshot) => {
          setFavTasks([]);
          querySnapshot.forEach((doc) => {
            setFavTasks((prev) => [...prev, doc]);
          });
        }
      );

      return unsubscribe;
    }
  };

  const addTask = (body, datetime, category) => {
    addDoc(collection(firestore, "users", currentUser.uid, "tasks"), {
      body: body,
      datetime: datetime,
      favorite: false,
      done: false,
      category: category,
    })
      .then((res) => {
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const updateTask = (task, done, category, favorite) => {
    console.log(done, category, favorite);
    setDoc(doc(firestore, "users", currentUser.uid, "tasks", task.id), {
      body: task.data().body,
      datetime: task.data().datetime,
      category: category===null ? task.data().category : category,
      done: done===null ? task.data().done : done,
      favorite: favorite===null ? task.data().favorite : favorite,
    })
      .then((res) => {
        console.log("document updated");
      })
      .catch((error) => {
        setError(error.code);
        console.log(error.code);
      });
  };

  const deleteTask = (taskID) => {
    deleteDoc(doc(firestore, "users", currentUser.uid, "tasks", taskID))
      .then((res) => {
        console.log("task deleted");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const getCategories = () => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(firestore, "users", currentUser.uid, "categories"),
        (querySnapshot) => {
          setCategories([]);
          querySnapshot.forEach((doc) => {
            setCategories((prev) => [...prev, doc.data()]);
          });
        }
      );

      return unsubscribe;
    }
  };

  const addCategory = (name, color) => {
    setDoc(doc(firestore, "users", currentUser.uid, "categories", name), {
      name: name,
      color: color,
    })
      .then((res) => {
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const deleteCategory = () => {
    //
  };

  useEffect(() => {
    getCategories();
    getTasks();
    getFavoriteTasks();
  }, [currentUser]);

  const value = {
    isLoading,
    error,
    tasks,
    categories,
    favTasks,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    deleteCategory,
  };

  return (
    <TasksContext.Provider value={value}>
      {!isLoading && children}
    </TasksContext.Provider>
  );
};
