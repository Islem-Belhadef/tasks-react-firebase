// React & Router
import { useState } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import SideMenu from "../components/SideMenu";
import MobileNav from "../components/MobileNav";
import LogoutModal from "../components/LogoutModal";

const Profile = () => {
  const { currentUser } = useAuth();
  const { lightMode, light, dark } = useTheme();

  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
      <div
        className="flex flex-col md:flex-row h-screen"
        style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
      >
        <SideMenu />
        <MobileNav />
        <div
          className="w-full md:m-2 rounded-xl md:rounded-2xl h-full"
          style={{
            backgroundColor: lightMode ? light.background : dark.background,
          }}
        >
          <div className="flex flex-col justify-center w-5/6 sm:w-2/3 m-auto h-full">
            <h1
              className="text-5xl font-body font-bold"
              style={{ color: lightMode ? light.header : dark.header }}
            >
              profile
            </h1>
            <img
              src={currentUser.photoURL}
              alt="profile picture"
              className="rounded-full w-28 h-28 mt-8 mb-4"
            />
            <form
              className="flex flex-col items-center gap-6"
              onSubmit={(e) => {
                handleUpdateProfile(e);
              }}
            >
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
                  disabled
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.card : dark.card,
                    color: lightMode ? light.text : dark.text,
                  }}
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
                  disabled
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.card : dark.card,
                    color: lightMode ? light.text : dark.text,
                  }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </form>
            <button
              className="mt-10 py-2 px-16 bg-red-500 text-white rounded-lg w-fit self-center"
              onClick={() => {
                setShowLogoutModal(true);
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal}/>
      )}
      </div>
  );
};

export default Profile;
