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
      className="h-screen w-screen bg flex items-center justify-center fixed z-10"
      style={{ backgroundColor: "#000000e1" }}
    >
      <motion.div
        className="p-6 rounded-lg fixed z-20"
        style={{ backgroundColor: lightMode ? light.wall : dark.wall }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-xl font-medium mb-6" style={{color: lightMode ? light.text : dark.text}}>Proceed to logout ?</h3>
        <form
          onSubmit={(e) => {
            handleLogout(e);
          }}
          className="flex flex-col gap-6"
          autoComplete="off"
        >
          <div className="flex gap-6">
            <button
              onClick={() => {
                setShowLogoutModal(false);
              }}
              className="py-3 w-40 border border-solid rounded-lg text-lg font-medium"
              style={{
                color: lightMode ? light.primary : dark.text,
                borderColor: lightMode ? light.primary : dark.text,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 w-40 rounded-lg text-white bg-red-500 text-lg font-medium"
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
