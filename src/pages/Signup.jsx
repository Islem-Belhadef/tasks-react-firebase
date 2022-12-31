// React & Router
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import ErrorModal from "../components/ErrorModal";
import LoadingAnimation from "../components/LoadingAnimation";

const Signup = () => {
  const { lightMode, light, dark } = useTheme();
  const {
    signup,
    isLoading,
    error,
    loginWithGoogle,
  } = useAuth();

  const firstPage = useRef();
  const secondPage = useRef();
  const pfp = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleGoBack = (e) => {
    e.preventDefault();
    firstPage.current.style.display = "block";
    secondPage.current.style.display = "none";
  };

  const handleContinue = (e) => {
    e.preventDefault();
    firstPage.current.style.display = "none";
    secondPage.current.style.display = "block";
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password, name, pfp, profilePicture);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: lightMode ? light.background : dark.wall }}
    >
      <>
        <div
          ref={firstPage}
          className="rounded-xl py-8 px-12"
          style={{ backgroundColor: lightMode ? light.wall : dark.background }}
        >
          <h2
            className="font-header text-2xl font-semibold mb-1"
            style={{ color: lightMode ? light.text : dark.text }}
          >
            Welcome
          </h2>
          <p className="font-body text-gray-400 text-sm">
            Sign up to start noting and arranging your tasks
          </p>
          <Link
            to="/login"
            className="font-body text-sm"
            style={{ color: light.primary }}
          >
            I already have an account
          </Link>
          <form
            className="mt-8"
            onSubmit={(e) => {
              handleContinue(e);
            }}
          >
            <div className="flex flex-col gap-4 ">
              {error && <ErrorModal error={error} />}
              <label
                htmlFor="email"
                className={
                  lightMode
                    ? "font-medium text-gray-500 flex flex-col gap-2"
                    : "font-medium text-gray-400 flex flex-col gap-2"
                }
              >
                Email Address
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.btn : dark.btn,
                    color: lightMode ? light.text : dark.text,
                  }}
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="email"
                className={
                  lightMode
                    ? "font-medium text-gray-500 flex flex-col gap-2"
                    : "font-medium text-gray-400 flex flex-col gap-2"
                }
              >
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.btn : dark.btn,
                    color: lightMode ? light.text : dark.text,
                  }}
                  minLength="6"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <button
                type="submit"
                className="py-3 w-full rounded-lg text-white text-lg font-medium"
                style={{ backgroundColor: light.primary }}
              >
                Create account
              </button>
              <button
                onClick={loginWithGoogle}
                className="py-3 w-full border border-solid rounded-lg text-lg font-medium"
                style={{ borderColor: light.primary, color: light.primary }}
              >
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
        <div
          ref={secondPage}
          className="hidden rounded-xl py-8 px-12"
          style={{ backgroundColor: lightMode ? light.wall : dark.background }}
        >
          <h2
            className="font-header text-2xl font-semibold mb-1"
            style={{ color: lightMode ? light.text : dark.text }}
          >
            Almost there
          </h2>
          <p className="font-body text-gray-400 text-sm">
            Please fill out these fields to finish setting up your account
          </p>
          <form className="mt-8" onSubmit={handleSignup}>
            <div className="flex flex-col gap-4 ">
              {error && <ErrorModal error={error} />}
              <label
                htmlFor="pfp"
                className={lightMode? "font-medium text-gray-500 flex items-center justify-between gap-4": "font-medium text-gray-400 flex items-center justify-between gap-4"}
              >
                Profile picture
                <input
                  type="file"
                  name="pfp"
                  id="pfp"
                  ref={pfp}
                  onChange={(e) => {
                    setProfilePicture(e.target.files[0]);
                  }}
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.btn : dark.btn,
                    color: lightMode ? light.text : dark.text,
                  }}
                />
              </label>
              <label
                htmlFor="email"
                className={
                  lightMode
                    ? "font-medium text-gray-500 flex flex-col gap-2"
                    : "font-medium text-gray-400 flex flex-col gap-2"
                }
              >
                Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="20"
                  className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                  style={{
                    backgroundColor: lightMode ? light.btn : dark.btn,
                    color: lightMode ? light.text : dark.text,
                  }}
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              {!isLoading && (
                <button
                  type="submit"
                  className="py-3 w-full rounded-lg text-white text-lg font-medium"
                  style={{ backgroundColor: light.primary }}
                >
                  Create account
                </button>
              )}
              {isLoading && (
                <button
                  type="submit"
                  disabled
                  className="py-3 w-full rounded-lg text-white text-lg font-medium"
                  style={{backgroundColor: light.background}}
                >
                  <LoadingAnimation />
                </button>
              )}
              <button
                onClick={(e) => {
                  handleGoBack(e);
                }}
                className="py-3 w-full border border-solid rounded-lg text-lg font-medium"
                style={{ borderColor: light.primary, color: light.primary }}
              >
                Go back
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default Signup;
