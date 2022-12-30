import { useState } from "react";
import { useTasks } from "../contexts/TasksContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

const NewCategoryModal = ({ setShowNewCategoryModal }) => {
  const { lightMode, light, dark } = useTheme();
  const { addCategory } = useTasks();

  const [name, setName] = useState("");
  const [color, setColor] = useState("#EEEEEE");

  const handleCreateCategory = (e) => {
    e.preventDefault();

    addCategory(name.toLowerCase(), color);
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
        <form
          onSubmit={(e) => {
            handleCreateCategory(e);
          }}
          className="flex flex-col gap-6"
        >
          <label htmlFor="name" className="flex items-center gap-4">
            Category label
            <input
              type="text"
              name="name"
              id="name"
              required
              maxLength="20"
              placeholder="Category.."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="py-2 px-4 rounded-lg focus:outline-none font-normal"
              style={{
                backgroundColor: lightMode ? light.btn : dark.btn,
                color: lightMode ? light.text : dark.text,
              }}
            />
          </label>
          <label htmlFor="color" className="flex items-center gap-4">
            Category color
            <input
              type="color"
              name="color"
              id="color"
              required
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              className="rounded-lg focus:outline-none"
              style={{
                backgroundColor: lightMode ? light.btn : dark.btn,
                color: lightMode ? light.text : dark.text,
              }}
            />
          </label>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setShowNewCategoryModal(false);
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
              className="py-3 w-40 rounded-lg text-white text-lg font-medium"
              style={{ backgroundColor: light.primary }}
            >
              Add Category
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewCategoryModal;
