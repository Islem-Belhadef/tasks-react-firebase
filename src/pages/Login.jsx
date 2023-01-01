// React & Router
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Contexts
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// Components
import ErrorModal from "../components/ErrorModal";
import LoadingAnimation from "../components/LoadingAnimation";

const Login = () => {
  const { lightMode, light, dark } = useTheme();
  const { login, isLoading, error, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    loginWithGoogle();
  };

  const handleForgotPassword = () => {
    //
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: lightMode ? light.background : dark.wall }}
    >
      <div
        className="rounded-xl py-8 px-6 sm:px-12 w-11/12 sm:w-fit"
        style={{ backgroundColor: lightMode ? light.wall : dark.background }}
      >
        <h2
          className="font-header text-2xl font-semibold mb-1"
          style={{ color: lightMode ? light.text : dark.text }}
        >
          Welcome back
        </h2>
        <p className="font-body text-gray-400 text-sm">
          Login to your account to continue noting your tasks
        </p>
        <Link
          to="/signup"
          className="font-body text-sm"
          style={{ color: light.primary }}
        >
          I don't have an account
        </Link>
        <form
          className="mt-8"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="flex flex-col gap-4 ">
            {error && <ErrorModal error={error} />}
            <label
              htmlFor="email"
              className={lightMode? "font-medium text-gray-500 flex flex-col gap-2": "font-medium text-gray-400 flex flex-col gap-2"}
            >
              Email Address
              <input
                type="email"
                name="email"
                id="email"
                required
                className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                style={{backgroundColor: lightMode ? light.btn : dark.btn,color: lightMode ? light.text : dark.text,}}
                value={email}
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
                required
                className="py-2 px-4 rounded-lg focus:outline-none font-normal"
                style={{
                  backgroundColor: lightMode ? light.btn : dark.btn,
                  color: lightMode ? light.text : dark.text,
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="w-full flex justify-end">
            <Link
              to="/login"
              className="text-xs py-2"
              style={{ color: light.primary }}
            >
              Forgot your password?
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            {!isLoading && (
              <button
                type="submit"
                className="py-3 w-full rounded-lg text-white sm:text-lg font-medium"
                style={{ backgroundColor: light.primary }}
              >
                Sign in
              </button>
            )}
            {isLoading && (
              <button
                type="submit"
                disabled
                className="py-3 w-full rounded-lg text-white sm:text-lg font-medium"
                style={{ backgroundColor: light.background }}
              >
                <LoadingAnimation />
              </button>
            )}
            <button
              onClick={handleLoginWithGoogle}
              className="py-3 w-full border border-solid rounded-lg sm:text-lg font-medium"
              style={{ borderColor: light.primary, color: light.primary }}
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
