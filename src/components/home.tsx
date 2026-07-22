import { useState, useEffect } from "react";
import "./home.css";
import { Outlet, Link, useLocation } from "react-router-dom";

export const Home = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const updateLayout = () => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        setOpen(true);
      } else {
        setOpen(location.pathname !== "/");
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, [location.pathname]);

  if (open) {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-1/10 w-full flex items-center px-8 bg-emerald-900">
          {/* Left Navigation */}
          <nav className="flex flex-row gap-10 text-md text-black w-full h-full font-extrabold max-md:font-light max-md:text-s">
            <Link
              to="/login"
              className="w-1/10 h-full hover:bg-teal-100 p-5 max-md:w-24"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="w-1/10 h-full hover:bg-teal-100 p-5 max-md:w-24"
            >
              Signup
            </Link>

            <Link
              to="/profile"
              className="w-1/10 h-full hover:bg-teal-100 p-5 max-md:w-24"
            >
              ToDo
            </Link>
          </nav>
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="topper flex items-center px-8">
        {/* Left Navigation */}
        <nav className="w-48 flex flex-col gap-4 text-xl text-black">
          <Link
            to="/login"
            className="hover:bg-teal-100 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:bg-teal-100 rounded-lg"
          >
            Signup
          </Link>

          <Link
            to="/profile"
            className="hover:bg-teal-100 rounded-lg"
          >
            ToDo
          </Link>
        </nav>

        {/* Hero Text */}
        <header className="flex-1 flex justify-center items-center">
          <div className="text-center w-1/5">
            <span className="extra">KEEP YOUR </span>
            <span className="text-black">SHIT ON </span>
            <span className="extra">TRACK!</span>
          </div>
        </header>
      </div>

      <main className="mane flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};