import React from "react";
// import { useDispatch, useSelector } from 'react-redux'
import { userLogout, userLogout2 } from "../stores/user/UserActions";
import { useAppDispatch, useAppSelector } from "../stores/store";

type NavBarProps = {
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar = ({ setCollapseShow }: NavBarProps) => {
  const dispatch = useAppDispatch();
  const { auth_user: user } = useAppSelector((state) => state.user);

  const userLogoutApplication = async () => {
    try {
      await dispatch(userLogout());
      window.location.reload();
    } catch (error) {
      await dispatch(userLogout2());
      window.location.reload();
    }
  };
  return (
    <>
      <div className="fixed w-full bg-gray-100">
        <div className="flex  items-center justify-between md:justify-end p-4 md:mr-72 relative">
          <h1 className="hidden md:block mr-auto font-bold font-serif">
            {"Page Name"}
          </h1>

          <span
            className="ml-6 text-black block md:hidden cursor-pointer"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </span>
          <span className="flex items-center">
            <form action="" className="hidden md:block mr-4">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Page"
                className="p-2 w-[230px] rounded-lg border-2 border-gray-400 focus:outline-none"
              />
            </form>

            <div className="relative inline-block text-left">
              <div className="hover:-translate-y-1 hover:scale-110 duration-300">
                <img
                  src={
                    user?.details?.avatar
                      ? (user.details.avatar as string)
                      : "https://via.placeholder.com/15"
                  }
                  onClick={() =>
                    document
                      .getElementById("profileDrawer")!
                      .classList.toggle("hidden")
                  }
                  className="w-[45px] h-[40px] rounded-full cursor-pointer hover:bg-gray-400"
                  alt=""
                />
              </div>

              <div
                id="profileDrawer"
                className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 
                    ring-black ring-opacity-5 focus:outline-none transition-opacity ease-in duration-700 opacity-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <span
                  onClick={() => userLogoutApplication()}
                  className="text-sm py-2 px-4 font-normal block w-full 
                    whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </span>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 
                    hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#pablo"
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-100 "
                >
                  Setting
                </a>
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
