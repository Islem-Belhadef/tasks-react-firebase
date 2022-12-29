import SideMenu from "../components/SideMenu";

const HomeLayout = () => {
  return (
    <div className="md:flex bg-white md:h-screen">
      <SideMenu />
      <div className="bg-primary w-full m-2 rounded-2xl"></div>
    </div>
  );
};

export default HomeLayout;
