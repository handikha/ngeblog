import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import bgimage from "../../assets/image.svg";
import Button from "../../components/Button";
import { updateImageProfile } from "../../store/slices/auth/slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FormUploadImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isUploadImageLoading, imgProfile } = useSelector((state) => {
    return { isUploadImageLoading: state.auth.isUploadImageLoading };
  });
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1000000) {
      alert("file too large. Max 1 MB");
      return;
    }
    setFile(selectedFile);

    // show prev image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImage(null);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    noClick: true,
    noKeyboard: true,
  });

  const onButtonUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(updateImageProfile(formData));
    setFile(null);
    setPreviewImage(null);
    // window.location.reload();
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center px-4 pb-12 pt-28">
      <p className="mb-2 text-center text-lg font-semibold text-dark md:text-xl">
        Upload your image
      </p>
      <p className="mb-2 text-center text-xs font-thin text-slate-400">
        File should be Jpeg, Png...
      </p>
      <div
        {...getRootProps({
          className: `w-1/2 h-fit flex items-center justify-center flex-col p-4 border-2 border-dark border-dashed rounded-md ${
            isDragActive ? "bg-teal-200/20" : null
          }`,
        })}
      >
        <input {...getInputProps({ name: "image" })} />

        {previewImage ? (
          <>
            <img src={previewImage} className="w-64" />
            <p className="md:text-md mt-4 text-center text-sm text-slate-400">
              {file === null ? (
                <span>Drag & Drop your image here</span>
              ) : (
                <span>{file.name}</span>
              )}
            </p>
            <Button
              onClick={removeImage}
              title="Cancel"
              isButton
              isSecondary
              className="mt-2"
            />
          </>
        ) : (
          <img src={bgimage} className="max-w-1/3 mx-auto mt-10" />
        )}
      </div>

      {file === null ? (
        <>
          <p className="text-md mb-2 mt-2 text-center font-normal text-slate-400">
            Or
          </p>

          <Button
            onClick={open}
            title="Choose a file"
            isButton
            isPrimary
            isLoading={isUploadImageLoading}
            isDisabled={isUploadImageLoading}
          />
        </>
      ) : (
        <Button
          onClick={onButtonUpload}
          title="Upload Image"
          isButton
          isPrimary
          className="mt-2"
        />
      )}
    </div>
  );
}
