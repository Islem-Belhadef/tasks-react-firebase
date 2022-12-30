import { createContext, useContext, useEffect, useState } from "react";

import { firestore } from "../config/FirebaseClient";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  orderBy,
  deleteDoc,
  onSnapshot,
  query,
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
  const [categories, setCategories] = useState([]);

  const getTasks = () => {
    if (currentUser) {
      setTasks([]);
      // getDocs(
      //   collection(firestore, "users", currentUser.uid, "tasks"),
      //   orderBy("datetime")
      // )
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       setTasks((prev) => [...prev, doc]);
      //     });
      //   })
      //   .catch((error) => {
      //     setError(error.code);
      //     console.log(error);
      //   });

      const unsubscribe = onSnapshot(
        query(collection(firestore, "users", currentUser.uid, "tasks"),
        orderBy("desc")),
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

  const getCategories = () => {
    if (currentUser) {
      // setCategories([]);
      // getDocs(collection(firestore, "users", currentUser.uid, "categories"))
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       setCategories((prev) => [...prev, doc.data()]);
      //     });
      //   })
      //   .catch((error) => {
      //     setError(error.code);
      //     console.log(error);
      //   });

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

  const addTask = (body, datetime, category) => {
    setIsLoading(true);
    addDoc(collection(firestore, "users", currentUser.uid, "tasks"), {
      body: body,
      datetime: datetime,
      favorite: false,
      done: false,
      category: category,
    })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setIsLoading(false);
      });
  };

  const deleteTask = (taskID) => {
    setIsLoading(true);
    deleteDoc(doc(firestore, "users", currentUser.uid, "tasks", taskID))
      .then((res) => {
        console.log("task deleted");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setIsLoading(false);
      });
  };

  const addCategory = (name, color) => {
    setIsLoading(true);
    setDoc(doc(firestore, "users", currentUser.uid, "categories", name), {
      name: name,
      color: color,
    })
      .then((res) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.code);
        setIsLoading(false);
      });
  };

  const deleteCategory = () => {
    //
  };

  const updateTask = (task, done, category, favorite) => {
    console.log(done, category, favorite);
    setIsLoading(true);
    setDoc(doc(firestore, "users", currentUser.uid, "tasks", task.id), {
      body: task.data().body,
      datetime: task.data().datetime,
      category: category,
      done: done,
      favorite: favorite,
    })
      .then((res) => {
        setIsLoading(false);
        console.log("document updated");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.code);
        console.log(error.code);
      });
  };

  useEffect(() => {
    getCategories();
    getTasks();
  }, []);

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
    <TasksContext.Provider value={value}>
      {!isLoading && children}
    </TasksContext.Provider>
  );
};
