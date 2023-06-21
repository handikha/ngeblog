import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function ComponentProfile({
  profile,
  showContent,
  handleOpenModal,
  handleShowContent,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className=" mt-4 aspect-square w-3/4 overflow-hidden rounded-full ">
        {profile.imgProfile === null ? (
          <div className="flex aspect-square h-fit items-center justify-center bg-primary text-5xl text-white">
            {profile.username.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src={process.env.REACT_APP_IMAGE_URL + profile.imgProfile}
            // src="https://source.unsplash.com/600x600?cat"
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </div>
      <div className=" mt-4 flex w-full flex-col items-start  gap-4 ">
        <Button
          type="button"
          title="Create New Article"
          isButton
          isPrimary
          className="w-full"
          onClick={() => navigate("/create-new-article")}
        />

        <Button
          type="button"
          title="My Articles"
          onClick={() => handleShowContent("myArticles")}
          className={`duration-200  ${
            showContent === null || showContent === "myArticles"
              ? " text-primary"
              : "hover:ml-2 hover:text-primary"
          }`}
        />

        <Button
          type="button"
          title="Liked Articles"
          onClick={() => handleShowContent("likedArticles")}
          className={`duration-200  ${
            showContent === "likedArticles"
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

        <div className="w-full duration-200 hover:scale-105">
          <div className="text-xs text-primary">Username</div>
          <div className="flex justify-between">
            <p className="italic">{profile.username}</p>
            <Button
              type="button"
              title="Change"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changeUsername",
                })
              }
              className="text-xs duration-200 hover:ml-2 hover:text-primary"
            />
          </div>
        </div>

        <div className="w-full duration-200 hover:scale-105">
          <div className="text-xs text-primary">Phone</div>
          <div className="flex justify-between">
            <p className="italic">{profile.phone}</p>
            <Button
              type="button"
              title="Change"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changePhoneNumber",
                })
              }
              className="text-xs duration-200 hover:ml-2 hover:text-primary "
            />
          </div>
        </div>

        <div className="w-full duration-200 hover:scale-105">
          <div className="text-xs text-primary">Email</div>
          <div className="flex justify-between">
            <p className="italic">{profile.email}</p>
            <Button
              type="button"
              title="Change"
              onClick={() =>
                handleOpenModal({
                  display: true,
                  type: "changeEmail",
                })
              }
              className="text-xs duration-200 hover:ml-2 hover:text-primary"
            />
          </div>
        </div>

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
      </div>
    </>
  );
}
