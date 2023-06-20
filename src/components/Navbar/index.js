import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useLocation } from "react-router-dom";
import ToTop from "../ToTop";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateImageProfile } from "../../store/slices/auth/slices";

export default function Navbar() {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    // {
    //   title: "About Us",
    //   path: "/about-us",
    // },
  ];

  const location = useLocation();
  const dispatch = useDispatch();

  const { id, imgProfile } = useSelector((state) => {
    return { id: state.auth?.id, imgProfile: state.auth?.imgProfile };
  });

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const [profileClicked, setProfileClicked] = useState(false);
  const handleProfileButton = (event) => {
    event?.stopPropagation();
    setProfileClicked(!profileClicked);
  };

  const handleOutsideClick = (event) => {
    const profileMenu = document.getElementById("profile-menu");

    if (profileMenu && !profileMenu.contains(event.target)) {
      setProfileClicked(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header>
      <nav
        className={`fixed z-10 w-full bg-lighter ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container font-poppins text-dark ">
          <div className="navbar flex items-center justify-between p-4 ">
            <div className="navbar-brand">
              <h3 className="text-2xl font-bold">Ngeblog.</h3>
            </div>
            <div className="nav-menu relative hidden items-center gap-10 font-medium sm:flex">
              {links.map((link, index) => (
                <Button
                  key={index}
                  title={link.title}
                  path={link.path}
                  type="link"
                  className={`nav-item ${getNavLinkClass(link.path)} `}
                />
              ))}

              {/* Log In Button */}
              {id ? (
                <div
                  className="rounded-full border-2 border-primary hover:cursor-pointer"
                  onClick={handleProfileButton}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-lighter">
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + imgProfile}
                      // src="https://source.unsplash.com/50x50?cat"
                      alt=""
                      className="h-full w-full border-red-400 object-cover"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    path="/login"
                    title="Login"
                    type="link"
                    className={`nav-item`}
                  />

                  <Button
                    title="Get Started"
                    isPrimary
                    isButton
                    type="link"
                    path="/register"
                  />
                </>
              )}

              {id ? (
                <div
                  id="profile-menu"
                  className={`profile-menu absolute right-2 top-12 h-fit w-64 origin-top-right divide-y-[1px] divide-light rounded-lg bg-lightest p-4 font-normal text-dark shadow-lg duration-200 ${
                    profileClicked
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-0 opacity-0"
                  }`}
                >
                  <Button
                    title="Profile"
                    type="link"
                    path="/profile"
                    className="block py-3 duration-200 hover:pl-2 hover:text-primary"
                    onClick={handleProfileButton}
                  />

                  {/* <Button
                    title="Change Profile Picture"
                    type="link"
                    path="#"
                    className="block py-3 duration-200 hover:pl-2 hover:text-primary"
                  />

                  <Button
                    title="Change Password"
                    type="link"
                    path="#"
                    className="block py-3 duration-200 hover:pl-2 hover:text-primary"
                  /> */}

                  <Button
                    title="Log Out"
                    type="link"
                    path="/"
                    className="block py-3 duration-200 hover:pl-2 hover:text-primary"
                    onClick={() => {
                      dispatch(logout());
                      handleProfileButton();
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <ToTop
          className={`duration-200 ${
            isScrolled ? "visible -translate-y-full" : "invisible"
          }`}
        />
      </nav>
    </header>
  );
}
