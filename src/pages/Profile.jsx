// React & Router
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import SideMenu from "../components/SideMenu";

const Profile = () => {

  const { currentUser, isLoading } = useAuth()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

  const getUserInfo = () => {
    // 
  }

  const updateProfile = () => {
    //
  };

  useEffect(() => {
    
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />; 
  }

  return (
    <div className="md:flex bg-white md:h-screen">
      <SideMenu />
      <div className="bg-primary w-full m-2 rounded-2xl">
        <div className="flex flex-col justify-center w-2/3 m-auto h-full">
          <h1 className="text-5xl text-white font-body font-bold">
            Edit profile
          </h1>
          <div className="rounded-full w-28 h-28 mt-8 mb-4 bg-black">
            {/*  */}
          </div>
          <form className="flex flex-col gap-6">
            <div className="flex justify-between gap-24">
              <label
                htmlFor="first-name"
                className="font-medium text-white text-lg flex flex-col gap-2 w-full"
              >
                Firstname
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="py-2 px-4 rounded-lg focus:outline-none focus:bg-gray-100 text-text font-normal"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="last-name"
                className="font-medium text-white text-lg flex flex-col gap-2 w-full"
              >
                Lastname
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="py-2 px-4 rounded-lg focus:outline-none focus:bg-gray-100 text-text font-normal"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </div>
            <label
              htmlFor="email"
              className="font-medium text-white text-lg flex flex-col gap-2"
            >
              Email Address
              <input
                type="email"
                name="email"
                id="email"
                className="py-2 px-4 rounded-lg focus:outline-none focus:bg-gray-100 text-text font-normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label
              htmlFor="password"
              className="font-medium text-white text-lg flex flex-col gap-2"
            >
              Password
              <input
                type="password"
                name="password"
                id="password"
                className="py-2 px-4 rounded-lg focus:outline-none focus:bg-gray-100 text-text font-normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <div className="flex justify-center items-center gap-12 pt-6">
              <button type="reset" className="py-3 w-40 border border-solid border-white rounded-lg text-white text-lg font-medium">Cancel</button>
              <button type="submit" className="py-3 w-40 bg-accent rounded-lg text-white text-lg font-medium">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
