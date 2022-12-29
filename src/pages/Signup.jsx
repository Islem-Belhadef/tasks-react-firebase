// React & Router
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import ErrorModal from "../components/ErrorModal";
import LoadingAnimation from "../components/LoadingAnimation";

const Signup = () => {
  const navigate = useNavigate();

  const { signup, isLoading, setIsLoading, error, setError, currentUser, loginWithGoogle } = useAuth();

  const firstPage = useRef();
  const secondPage = useRef();
  const pfp = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

    signup(email, password,pfp, profilePicture);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary">
      <>
        <div ref={firstPage} className="rounded-xl py-8 px-12 bg-bg">
          <h2 className="font-header text-2xl text-text font-semibold mb-1">
            Welcome
          </h2>
          <p className="font-body text-gray-400 text-sm">
            Sign up to start noting and arranging your tasks
          </p>
          <Link to="/login" className="font-body text-accent text-sm">I already have an account</Link>
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
                className="font-medium text-gray-500 flex flex-col gap-2"
              >
                Email Address
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="email"
                className="font-medium text-gray-500 flex flex-col gap-2"
              >
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
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
                className="py-3 w-full bg-accent rounded-lg text-white text-lg font-medium"
              >
                Create account
              </button>
              <button
                onClick={loginWithGoogle}
                className="py-3 w-full border border-solid border-accent rounded-lg text-accent text-lg font-medium"
              >
                Sign up with Google
              </button>
            </div>
          </form>
        </div>
        <div ref={secondPage} className="hidden rounded-xl py-8 px-12 bg-bg">
          <h2 className="font-header text-2xl text-text font-semibold mb-1">
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
                className="font-medium text-gray-500 flex items-center justify-between gap-4"
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
                  className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                />
              </label>
              <label
                htmlFor="email"
                className="font-medium text-gray-500 flex flex-col gap-2"
              >
                Firstname
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label
                htmlFor="email"
                className="font-medium text-gray-500 flex flex-col gap-2"
              >
                Lastname
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              {!isLoading && (
                <button
                  type="submit"
                  className="py-3 w-full bg-accent rounded-lg text-white text-lg font-medium"
                >
                  Create account
                </button>
              )}
              {isLoading && (
                <button
                  type="submit"
                  disabled
                  className="py-3 w-full bg-primary rounded-lg text-white text-lg font-medium"
                >
                  <LoadingAnimation />
                </button>
              )}
              <button
                onClick={(e) => {
                  handleGoBack(e);
                }}
                className="py-3 w-full border border-solid border-accent rounded-lg text-accent text-lg font-medium"
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
