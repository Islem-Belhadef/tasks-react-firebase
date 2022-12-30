// React & Router
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import SideMenu from "../components/SideMenu";

const Profile = () => {
  const { currentUser, isLoading } = useAuth();
  const { lightMode, light, dark } = useTheme();

  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

  const getUserInfo = () => {
    //
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    //
  };

  useEffect(() => {}, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div
      className="md:flex md:h-screen"
      style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
    >
      <SideMenu />
      <div
        className="w-full m-2 rounded-2xl"
        style={{
          backgroundColor: lightMode ? light.background : dark.background,
        }}
      >
        <div className="flex flex-col justify-center w-2/3 m-auto h-full">
          <h1 className="text-5xl font-body font-bold" style={{ color: lightMode ? light.header : dark.header }}>
            Edit profile
          </h1>
          <img
            src={currentUser.photoURL}
            alt="profile picture"
            className="rounded-full w-28 h-28 mt-8 mb-4"
          />
          <form className="flex flex-col items-center gap-6" onSubmit={(e) => {handleUpdateProfile(e)}}>
            <label
              htmlFor="first-name"
              className="font-medium text-lg flex flex-col gap-2 w-full"
              style={{ color: lightMode ? "#FFFFFF" : dark.text }}
            >
              Name
              <input
                type="text"
                name="name"
                id="name"
                className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                style={{ backgroundColor: lightMode ? light.card : dark.card, color: lightMode ? light.text : dark.text }}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label
              htmlFor="email"
              className="font-medium text-lg flex flex-col gap-2 w-full"
              style={{ color: lightMode ? "#FFFFFF" : dark.text }}
            >
              Email Address
              <input
                type="email"
                name="email"
                id="email"
                className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                style={{ backgroundColor: lightMode ? light.card : dark.card, color: lightMode ? light.text : dark.text }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label
              htmlFor="password"
              className="font-medium text-lg flex flex-col gap-2 w-full"
              style={{ color: lightMode ? "#FFFFFF" : dark.text }}
            >
              Password
              <input
                type="password"
                name="password"
                id="password"
                className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                style={{ backgroundColor: lightMode ? light.card : dark.card, color: lightMode ? light.text : dark.text }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <div className="flex justify-center items-center gap-12 pt-6">
              <button
                type="reset"
                className="py-3 w-40 border border-solid border-white rounded-lg text-lg font-medium"
                style={{ color: lightMode ? "#FFFFFF" : dark.text }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-3 w-40 rounded-lg text-white text-lg font-medium"
                style={{ backgroundColor: lightMode ? light.primary : dark.btn}}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
