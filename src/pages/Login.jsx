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
  const navigate = useNavigate();

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
    <div className="h-screen w-full flex items-center justify-center bg-primary">
      <div className="rounded-xl py-8 px-12 bg-bg">
        <h2 className="font-header text-2xl text-text font-semibold mb-1">
          Welcome back
        </h2>
        <p className="font-body text-gray-400 text-sm">
          Login to your account to continue noting your tasks
        </p>
        <Link to="/signup" className="font-body text-accent text-sm">
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
              className="font-medium text-gray-500 flex flex-col gap-2"
            >
              Email Address
              <input
                type="email"
                name="email"
                id="email"
                required
                className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                value={email}
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
                required
                className="py-2 px-4 bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-200 text-text font-normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="w-full flex justify-end">
            <Link to="/login" className="text-xs text-accent py-2">
              Forgot your password?
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            {!isLoading && (
              <button
                type="submit"
                className="py-3 w-full bg-accent rounded-lg text-white text-lg font-medium"
              >
                Sign in
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
              onClick={handleLoginWithGoogle}
              className="py-3 w-full border border-solid border-accent rounded-lg text-accent text-lg font-medium"
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
