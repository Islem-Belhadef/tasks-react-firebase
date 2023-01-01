import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const LogoutModal = ({ setShowLogoutModal }) => {
  const { lightMode, light, dark } = useTheme();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div
      className="h-screen w-screen bg flex items-center justify-center fixed z-40"
      style={{ backgroundColor: "#000000e1" }}
    >
      <motion.div
        className="p-6 rounded-lg fixed z-50 w-11/12 sm:w-fit"
        style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <h3
          className="sm:text-lg md:text-xl font-medium mb-6"
          style={{ color: lightMode ? light.text : dark.text }}
        >
          Are you sure you want to logout ?
        </h3>
        <form
          onSubmit={(e) => {
            handleLogout(e);
          }}
          className="flex flex-col gap-6"
          autoComplete="off"
        >
          <div className="flex gap-6 justify-center">
            <button
              onClick={() => {
                setShowLogoutModal(false);
              }}
              className="py-3 w-40 border border-solid rounded-lg sm:text-lg font-medium"
              style={{
                color: lightMode ? light.primary : dark.text,
                borderColor: lightMode ? light.primary : dark.text,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 w-40 rounded-lg text-white bg-red-500 sm:text-lg font-medium"
            >
              Logout
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LogoutModal;
