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
  where,
  getDocs,
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
          where("favorite", "==", true),
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
      .then((res) => {})
      .catch((error) => {
        setError(error.code);
      });
  };

  const updateTask = (task, done, category, favorite) => {
    setDoc(doc(firestore, "users", currentUser.uid, "tasks", task.id), {
      body: task.data().body,
      datetime: task.data().datetime,
      category: category === null ? task.data().category : category,
      done: done === null ? task.data().done : done,
      favorite: favorite === null ? task.data().favorite : favorite,
    })
      .then((res) => {})
      .catch((error) => {
        setError(error.code);
      });
  };

  const deleteTask = (taskID) => {
    deleteDoc(doc(firestore, "users", currentUser.uid, "tasks", taskID))
      .then((res) => {})
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

  const updateCategory = (oldName, newName, color) => {
    console.log(oldName, newName, color);

    if (oldName === newName) {
      setDoc(doc(firestore, "users", currentUser.uid, "categories", newName), {
        name: newName,
        color: color,
      })
        .then((res) => {
          console.log("category color updated successfully");
        })
        .catch((error) => {
          console.log("error when category color updated");
        });
    }
    else {
      setDoc(doc(firestore, "users", currentUser.uid, "categories", newName), {
        name: newName,
        color: color,
      })
        .then(() => {
          getDocs(
            query(
              collection(firestore, "users", currentUser.uid, "tasks"),
              where("category", "==", oldName)
            )
          )
            .then((querySnapshot) => {
              const taskDocs = [];
              querySnapshot.forEach((doc) => {
                taskDocs.push(doc);
              });
              taskDocs.forEach((task) => {
                setDoc(
                  doc(firestore, "users", currentUser.uid, "tasks", task.id),
                  {
                    body: task.data().body,
                    category: newName,
                    done: task.data().done,
                    favorite: task.data().favorite,
                    datetime: task.data().datetime,
                  }
                );
              });
              deleteDoc(
                doc(firestore, "users", currentUser.uid, "categories", oldName)
              );
            })
            .catch((err) => {
              setError(err);
            });
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const addCategory = (name, color) => {
    setDoc(doc(firestore, "users", currentUser.uid, "categories", name), {
      name: name,
      color: color,
    })
      .then((res) => {})
      .catch((error) => {
        setError(error.code);
      });
  };

  const deleteCategory = (name) => {

    getDocs(
      query(
        collection(firestore, "users", currentUser.uid, "tasks"),
        where("category", "==", name)
      )
    )
      .then((querySnapshot) => {
        const taskDocs = [];
        querySnapshot.forEach((doc) => {
          taskDocs.push(doc);
        });
        taskDocs.forEach((task) => {
          setDoc(
            doc(firestore, "users", currentUser.uid, "tasks", task.id),
            {
              body: task.data().body,
              category: "",
              done: task.data().done,
              favorite: task.data().favorite,
              datetime: task.data().datetime,
            }
          );
        });
        deleteDoc(
          doc(firestore, "users", currentUser.uid, "categories", name)
        );
      })
      .catch((err) => {
        setError(err);
      });
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
    updateCategory,
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
