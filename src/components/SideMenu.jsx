// Router
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Assets
import tasks from "../assets/icons/tasks.svg";
import settings from "../assets/icons/settings.svg";
import categories from "../assets/icons/categories.svg";
import heart from "../assets/icons/heart.svg";
import arrow_down from "../assets/icons/arrow_down.svg";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import user from "../assets/icons/user.svg";

const SideMenu = (props) => {
  const { logout } = useAuth();
  const { lightMode, setLightMode, light, dark} = useTheme();

  const showCategories = () => {
    //
  };

  const changeTheme = () => {
    setLightMode(!lightMode);
    window.localStorage.setItem("lightMode", lightMode);
    console.log(lightMode);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="md:w-1/3 min-w-fit text-center">
      <div className="m-8">
        <div className="logo font-header text-2xl font-bold" style={{color: lightMode ? light.background : dark.text}}>
          Tasks
        </div>
        <Link
          to="/profile"
          className={lightMode ? "flex items-center my-6 px-4 py-2 rounded-md hover:bg-gray-100" : "flex items-center my-6 px-4 py-2 rounded-md hover:bg-gray-800" }
        >
          <img
            src="https://storage.googleapis.com/socialcdn/2022/12/222567636/2983756285401342088.jpg"
            alt="pfp"
            className="w-12 rounded-full mr-4"
          />
          <h4 className="font-header text-xl" style={{color: lightMode ? light.text : dark.text}}>Islem Belhadef</h4>
        </Link>
        <nav id="nav">
          <ul>
            <li className={lightMode ? "my-2 hover:bg-gray-100 rounded-md" : "my-2 hover:bg-zinc-900 rounded-md"}>
              <Link
                to="/tasks"
                className="flex items-center font-header text-xl"
                style={{color: lightMode ? light.text : dark.text}}
              >
                <img src={tasks} alt="tasks" className="w-14 mr-2" />
                All tasks
              </Link>
            </li>
            <li
              className={lightMode ? "my-2 hover:bg-gray-100 rounded-md  flex items-center justify-between cursor-pointer" : "my-2 hover:bg-zinc-900 rounded-md  flex items-center justify-between cursor-pointer"}
              onClick={showCategories}
            >
              <div className="flex items-center font-header text-xl" style={{color: lightMode ? light.text : dark.text}}>
                <img src={categories} alt="categories" className="w-14 mr-2" />
                Categories
              </div>
              <img src={arrow_down} alt="arrow down" className="w-8" />
            </li>
            <li className={lightMode ? "my-2 hover:bg-gray-100 rounded-md" : "my-2 hover:bg-zinc-900 rounded-md"}>
              <Link to="#" className="flex items-center font-header text-xl " style={{color: lightMode ? light.text : dark.text}}>
                <img src={heart} alt="heart" className="w-14 mr-2" />
                Favorites
              </Link>
            </li>
            <li className={lightMode ? "my-2 hover:bg-gray-100 rounded-md" : "my-2 hover:bg-zinc-900 rounded-md"}>
              <Link to="#" className="flex items-center font-header text-xl" style={{color: lightMode ? light.text : dark.text}}>
                <img src={settings} alt="settings" className="w-14 mr-2" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div onClick={changeTheme} className="fixed bottom-4 left-4 rounded-lg w-fit cursor-pointer  p-3" style={{backgroundColor: lightMode ? light.background : dark.background}}>
          {lightMode && <img src={sun} alt="light mode" className="w-6" />}
          {!lightMode && <img src={moon} alt="dark mode" className="w-6" />}
        </div>
        <div
          onClick={(e) => {handleLogout(e)}}
          className="fixed bottom-4 left-20 rounded-lg bg-red-100 border border-red-500 w-fit cursor-pointer  p-3"
        >
          <img src={user} alt="log out" className="h-6" />
          <p className="absolute bottom-6 left-8 text-red-600 font-semibold">
            -
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
