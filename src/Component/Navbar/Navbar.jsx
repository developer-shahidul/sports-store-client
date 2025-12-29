// -->
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const routes = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Sports Equipmet", path: "/equipments" },
    { id: 3, name: "Add Equipment", path: "/AddEquipents" },
    { id: 4, name: "My List", path: "/equipmetList" },
    { id: 5, name: "Login", path: "/Login" },
    { id: 5, name: "resister", path: "/resister" },
  ];
  return (
    <nav
      className="py-6 flex top-0 left-0  fixed w-full justify-between items-center px-1 md:px-6 gap-4 
    backdrop-blur-3xl bg-black/60 opacity-100 z-50"
    >
      <div className="flex gap-4 justify-center items-center">
        <div onClick={() => setOpen(!open)}>
          {open ? (
            <img className=" w-18.75 h-22.5" src={logo} alt="tea logo" />
          ) : (
            <img className=" w-18.75 h-22.5" src={logo} alt="tea logo" />
          )}
          <ul
            className={`md:hidden absolute duration-1000 left-4 p-4 rounded-2xl bg-amber-500 ${
              open ? "top-34" : "-top-68"
            }`}
          >
            {routes.map((route, index) => (
              <div
                className="p-2 hover:bg-amber-400 rounded-xl"
                key={`${route.id}-${index}`}
                route={route}
              >
                <li>{route.name}</li>
              </div>
            ))}
          </ul>
        </div>

        <h2 className="rancho text-white md:text-6xl text-3xl">
          Sports Equipment
        </h2>
      </div>
      <div className="hidden lg:flex">
        <ul className="raleway text-white text-3xl flex items-center justify-center  gap-4">
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400 "
              to={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400  "
              to={"/equipments"}
            >
              Sports Equipmet
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400   "
              to={"/AddEquipments"}
            >
              Add Equipment
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400   "
              to={"/equipmetList"}
            >
              My List
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400"
              to={"/Login"}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline  hover:decoration-gray-400"
              to={"/resister"}
            >
              Resister
            </Link>
          </li>
        </ul>
      </div>

      <div className="h-12 w-12 rounded-full border-amber-400 border-2">
        <img src={logo} className="object-cover" alt="img" />
      </div>
    </nav>
  );
};

export default Navbar;
