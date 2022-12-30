const Overlay = ({ closeFunciton, child }) => {
  return (
    <div
    onClick={() => {closeFunciton(false)}}
      className="h-screen w-screen bg flex items-center justify-center fixed"
      style={{ backgroundColor: "#000000e1" }}
    >
        {child}
    </div>
  );
};

export default Overlay;
