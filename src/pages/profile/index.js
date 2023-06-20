import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePhoneNumber,
  changeUsername,
  keepLogin,
} from "../../store/slices/auth/slices";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import {
  HiCheckCircle,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import RenderCards from "../../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import ModalChangeUserName from "./modal.change.username";
import ModalChangePhoneNumber from "./modal.change.phonenumber";

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
    isKeepLoginLoading,
    isChangeUsernameLoading,
    isChangePhoneNumberLoading,
    articles,
    isVerified,
    error,
    success,
  } = useSelector((state) => {
    return {
      profile: state.auth,
      isKeepLoginLoading: state.auth.isKeepLoginLoading,
      isChangeUsernameLoading: state.auth.isChangeUsernameLoading,
      isChangePhoneNumberLoading: state.auth.isChangePhoneNumberLoading,
      articles: state.blogs.articles,
      isLoading: state.blogs.isLoading,
      isVerified: state.auth.isVerified,
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

  // HANDLE SHOW LIKED ARTICLES
  const [showLikedArticles, setShowLikedArticles] = useState(false);
  const handleShowLikedArticle = (isShowed) => {
    setShowLikedArticles(isShowed);
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

  useEffect(() => {
    dispatch(keepLogin());

    const handleKeyDownEvent = (event) => {
      if (event.key === "Escape") {
        if (isChangeUsernameLoading) {
          return;
        }
        handleCloseModal();
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
        <div className=" col-span-3 flex h-fit flex-col items-center rounded-xl bg-lighter p-8 shadow-md lg:col-span-1">
          <h3>{profile.username}</h3>

          <div className=" mt-4 aspect-square w-3/4 overflow-hidden rounded-full ">
            <img
              src={process.env.REACT_APP_IMAGE_URL + profile.imgProfile}
              // src="https://source.unsplash.com/600x600?cat"
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className=" mt-4 flex w-full flex-col items-start  gap-4 ">
            <Button
              type="button"
              title="Create New Post"
              // onClick={handleShowModal}
              isButton
              isPrimary
              className="w-full"
            />

            <Button
              type="button"
              title="My Articles"
              onClick={() => handleShowLikedArticle(false)}
              className={`duration-200  ${
                !showLikedArticles
                  ? " text-primary"
                  : "hover:ml-2 hover:text-primary"
              }`}
            />

            <Button
              type="button"
              title="Liked Articles"
              onClick={() => handleShowLikedArticle(true)}
              className={`duration-200  ${
                showLikedArticles
                  ? " text-primary"
                  : "hover:ml-2 hover:text-primary"
              }`}
            />

            <Button
              type="button"
              title="Change Profile Picture"
              onClick={() => navigate("/profile/upload-image")}
              className="duration-200 hover:ml-2 hover:text-primary"
            />

            <Button
              type="button"
              title="Change Username"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changeUsername",
                })
              }
              className="duration-200 hover:ml-2 hover:text-primary"
            />

            <Button
              type="button"
              title="Change Password"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changePassword",
                })
              }
              className="duration-200 hover:ml-2 hover:text-primary "
            />

            <Button
              type="button"
              title="Change Phone Number"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changePhoneNumber",
                })
              }
              className="duration-200 hover:ml-2 hover:text-primary "
            />

            <Button
              type="button"
              title="Change Email"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changeEmail",
                })
              }
              className="duration-200 hover:ml-2 hover:text-primary "
            />
          </div>
        </div>
        <div className="mt-8 grid h-fit w-full gap-y-10 sm:grid-cols-2 sm:gap-6 lg:col-span-2 lg:mt-0">
          {showLikedArticles ? (
            <>
              <h3 className="col-span-2">Liked Articles</h3>
              <RenderCards articles={articles} />
            </>
          ) : (
            <>
              <h3 className="col-span-2">Your Articles</h3>
              <div>Content Here</div>
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
        // <Modal showModal={true}>
        //   <p>Change Phone Number</p>
        //   {isChangePhoneNumberLoading ? (
        //     <div className="flex w-full items-center justify-center py-4">
        //       <Spinner />
        //     </div>
        //   ) : (
        //     <form action="" className="w-full pt-4 text-sm">
        //       {/* CURRENT PASSWORD */}
        //       {isEmailSent ? (
        //         <div className="flex w-full flex-col items-center justify-center">
        //           <HiCheckCircle className="text-5xl text-primary" />
        //           <p className="mt-2 text-base">Email sent!</p>
        //         </div>
        //       ) : (
        //         <div className="relative">
        //           <input
        //             ref={newPhoneNumberRef}
        //             defaultValue={isEmailSent ? "" : profile.phone}
        //             required
        //             type="text"
        //             className="mt-4 bg-lighter"
        //             id="password"
        //           />
        //           <label htmlFor="password" className="placeholder">
        //             Change Phone Number
        //           </label>
        //         </div>
        //       )}
        //       <div className="mt-6 flex justify-end gap-4">
        //         <Button
        //           title="Close"
        //           className="font-medium hover:text-primary"
        //           onClick={handleCloseModal}
        //           isButton
        //         />
        //         {!isEmailSent && (
        //           <Button
        //             type="button"
        //             onClick={onButtonChangePhoneNumber}
        //             title="Change Phone Number"
        //             isButton
        //             isPrimary
        //             isDisabled={isChangePhoneNumberLoading}
        //             isLoading={isChangePhoneNumberLoading}
        //           />
        //         )}
        //       </div>
        //     </form>
        //   )}
        // </Modal>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showModal.type === "changePassword" && isVerified && (
        <Modal showModal={true}>
          Change Password
          <form action="" className="w-full text-sm">
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
                type="submit"
                // onClick={() => {
                //   navigate("/login");
                //   handleCloseModal();
                // }}
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
