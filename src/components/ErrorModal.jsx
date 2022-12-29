import { useRef } from "react";
import { motion } from "framer-motion";

import caution from "../assets/icons/caution.svg";

const ErrorModal = (props) => {

  const modal = useRef();

//   setTimeout(() => {
//     modal.current.style.display = "none";
//   }, 3000);

  const error = props.error;

  return (
    <motion.div
      ref={modal}
      initial={{scale: 0}}
      animate={{scale: 1}}
      className="flex items-center gap-4 rounded-md border-2 border-red-500 bg-red-50 text-red-600 font-body font-medium py-4 px-8"
    >
      <img src={caution} alt="caution" className="w-6" />
      {error}
    </motion.div>
  );
};

export default ErrorModal;
