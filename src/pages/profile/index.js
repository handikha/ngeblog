import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  changePhoneNumber,
  changeUsername,
  keepLogin,
} from "../../store/slices/auth/slices";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import RenderCards from "../../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import ModalChangeUserName from "./modal.change.username";
import ModalChangePhoneNumber from "./modal.change.phonenumber";
import ComponentProfile from "./component.profile";
import { deleteArticle, getArticles } from "../../store/slices/blogs/slices";

export default function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const reNewPasswordRef = useRef(null);
  const newUsernameRef = useRef(null);
  const newPhoneNumberRef = useRef(null);

  const newUsernameValue = newUsernameRef.current?.value;
  const newPhoneNumberValue = newPhoneNumberRef.current?.value;

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const {
    profile,
    isChangeUsernameLoading,
    isChangePhoneNumberLoading,
    isChangePasswordLoading,
    articles,
    isVerified,
    error,
    success,
    myArticles,
    isArticlesLoading,
  } = useSelector((state) => {
    return {
      profile: state.auth,
      isChangeUsernameLoading: state.auth.isChangeUsernameLoading,
      isChangePhoneNumberLoading: state.auth.isChangePhoneNumberLoading,
      isChangePasswordLoading: state.auth.isChangePasswordLoading,
      isVerified: state.auth.isVerified,
      isArticlesLoading: state.blogs.isArticlesLoading,
      articles: state.blogs.articles,
      myArticles: state.blogs.myArticles,
      error: state.auth.error,
      success: state.auth.success,
    };
  });

  // HANDLE SNEAK PEAK PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // HANDLE SHOW MODAL
  const [showModal, setShowModal] = useState({ display: false, type: "" });
  const handleOpenModal = ({ display, type }) => {
    setShowModal({ display, type });
    document.body.style.overflow = "hidden";
  };

  // HANDLE CLOSE MODAL
  const handleCloseModal = () => {
    setShowModal({ display: false, type: "" });
    document.body.style.overflow = "auto";
    setShowPassword(false);
    setIsEmailSent(false);
    setFormStep(1);
  };

  // HANDLE STEP FORM
  const handleStepForm = (type) => {
    const newUsername = newUsernameRef.current?.value;
    const newPhoneNumber = newPhoneNumberRef.current?.value;

    if (type === "next") {
      if (newUsername === profile.username) {
        alert("Please input new username!");
        return;
      }

      if (newPhoneNumber === profile.phone) {
        alert("Please input new phone number!");
        return;
      }

      setFormStep((prevState) => prevState + 1);
    }

    if (type === "prev") {
      if (formStep > 0) setFormStep((prevState) => prevState - 1);
    }
  };

  // HANDLE SHOW CONTENT
  const [showContent, setShowContent] = useState(null);
  const handleShowContent = (content) => {
    setShowContent(content);
  };

  // HANDLE CHANGE USERNAME
  const onButtonChangeUsername = () => {
    dispatch(
      changeUsername({
        currentUsername: profile.username,
        newUsername: newUsernameValue,
      })
    );

    setIsEmailSent(true);
  };

  // HANDLE CHANGE PHONE NUMBER
  const onButtonChangePhoneNumber = () => {
    dispatch(
      changePhoneNumber({
        currentPhone: profile.phone,
        newPhone: newPhoneNumberValue,
      })
    );

    setIsEmailSent(true);
  };

  // HANDLE CHANGE PASSWORD
  const handleChangePasswordButton = () => {
    const confirmed = window.confirm(
      "Are you sure you want to change the password?"
    );

    if (confirmed) {
      dispatch(
        changePassword({
          currentPassword: passwordRef.current.value,
          password: newPasswordRef.current.value,
          confirmPassword: reNewPasswordRef.current.value,
        })
      );
    }
  };

  // HANDLE DELETE BUTTON
  const onButtonDelete = (id) => {
    const confirm = window.confirm("Are you sure want to delete this article?");
    if (confirm) {
      dispatch(deleteArticle(id));
      dispatch(
        getArticles({
          id_cat: "",
          page: 1,
          sort: "ASC",
        })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(keepLogin());
    dispatch(
      getArticles({
        id_cat: "",
        page: 1,
        sort: "ASC",
      })
    );

    const handleKeyDownEvent = (event) => {
      if (event.key === "Escape") {
        if (
          isChangeUsernameLoading ||
          isChangePasswordLoading ||
          isChangePhoneNumberLoading
        ) {
          return;
        }
        handleCloseModal();
      }

      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, []);

  return (
    <div className="container px-4 py-24 text-dark">
      <div className="grid grid-cols-3 gap-x-10">
        <div className=" flex h-fit flex-col items-center rounded-xl bg-lighter p-8 shadow-md lg:col-span-1">
          <h3>{profile.username}</h3>

          <ComponentProfile
            handleOpenModal={handleOpenModal}
            handleShowContent={handleShowContent}
            profile={profile}
            showContent={showContent}
          />
        </div>
        <div className="mt-8 grid h-fit w-full gap-y-10 sm:col-span-2 sm:grid-cols-2 sm:gap-6 lg:mt-0">
          {isArticlesLoading ? (
            <div className="col-span-full flex h-screen w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {showContent === "likedArticles" && (
                <>
                  <h3 className="col-span-2">Liked Articles</h3>
                  <RenderCards articles={articles} />
                </>
              )}

              {(showContent === "myArticles" || showContent === null) && (
                <>
                  <h3 className="col-span-2">Your Articles</h3>
                  <div className="grid h-fit w-full gap-y-10 sm:col-span-2 sm:grid-cols-2 sm:gap-6">
                    <RenderCards
                      articles={myArticles}
                      onButtonDelete={onButtonDelete}
                      username={profile.username}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* NOT VERIFIED MODAL */}
      {showModal && !isVerified && (
        <Modal showModal={true}>
          <form action="" className="w-full text-sm">
            <p>Please verify your account</p>
            <div className="mt-4 flex justify-end gap-4">
              <Button
                title="Close"
                onClick={handleCloseModal}
                isPrimary
                isButton
              />
            </div>
          </form>
        </Modal>
      )}

      {/* CHANGE USERNAME MODAL */}
      {showModal.type === "changeUsername" && isVerified && (
        <ModalChangeUserName
          refUsername={newUsernameRef}
          username={profile.username}
          isChangeUsernameLoading={isChangeUsernameLoading}
          isEmailSent={isEmailSent}
          handleCloseModal={handleCloseModal}
          onButtonChangeUsername={onButtonChangeUsername}
          onButtonNext={() => handleStepForm("next")}
          onButtonPrev={() => handleStepForm("prev")}
          currentStep={formStep}
          error={error}
          success={success}
        />
      )}

      {/* CHANGE PHONE NUMBER MODAL */}
      {showModal.type === "changePhoneNumber" && isVerified && (
        <ModalChangePhoneNumber
          refPhoneNumber={newPhoneNumberRef}
          phone={profile.phone}
          isChangePhoneNumberLoading={isChangePhoneNumberLoading}
          isEmailSent={isEmailSent}
          handleCloseModal={handleCloseModal}
          onButtonChangePhoneNumber={onButtonChangePhoneNumber}
          onButtonNext={() => handleStepForm("next")}
          onButtonPrev={() => handleStepForm("prev")}
          currentStep={formStep}
          error={error}
          success={success}
        />
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showModal.type === "changePassword" && isVerified && (
        <Modal showModal={true}>
          Change Password
          <form className="w-full text-sm">
            {/* CURRENT PASSWORD */}
            <div className="relative">
              <input
                ref={passwordRef}
                required
                type={showPassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="password"
              />
              <label htmlFor="password" className="placeholder">
                Current Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showPassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={handleShowPassword}
              >
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>
            </div>

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                ref={newPasswordRef}
                required
                type={showPassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="newPassword"
              />
              <label htmlFor="newPassword" className="placeholder">
                New Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showPassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={handleShowPassword}
              >
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>
            </div>

            {/* RE NEW PASSWORD */}
            <div className="relative">
              <input
                ref={reNewPasswordRef}
                required
                type={showPassword ? "text" : "password"}
                className="mt-4 bg-lighter"
                id="reNewPassword"
              />
              <label htmlFor="reNewPassword" className="placeholder">
                Re-New Password
              </label>
              <span
                className={`absolute right-1 top-[18px] cursor-pointer p-2 text-lg ${
                  showPassword ? "text-primary" : "text-light-gray"
                } `}
                onClick={handleShowPassword}
              >
                {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
              </span>
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <Button
                title="Close"
                className="font-medium hover:text-primary"
                onClick={handleCloseModal}
              />
              <Button
                type="button"
                onClick={handleChangePasswordButton}
                title="Change Password"
                isButton
                isPrimary
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
