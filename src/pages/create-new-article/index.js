import { Formik } from "formik";
import bgimage from "../../assets/image.svg";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/slices/categories/slices";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";
import { createNewArticleValidationSchema } from "../../store/slices/auth/validation";

export default function CreateNewArticle() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => {
    return {
      categories: state.categories.data,
    };
  });

  const handleSubmitButton = () => {
    console.log("ok");
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1000000) {
      alert("file too large. Max 1 MB");
      return;
    }
    setFile(selectedFile);

    console.log(selectedFile);

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
    maxSize: 1000000,
    accept: { "image/*": [".jpg", ".png", ".jpeg"] },
    noClick: true,
    noKeyboard: true,
  });

  // console.log(categories);

  const formData = new FormData();  

  return (
    <div className="container flex justify-center px-4 py-24">
      <Formik
        initialValues={{
          title: "",
          CategoryId: "",
          keywords: "",
          country: "",
          url: "",
          content: "",
          imageUrl: "",
        }}
        validate={(values) => {
          try {
            createNewArticleValidationSchema.validateSync(values);
            return {};
          } catch (error) {
            return { message: error?.message };
          }
        }}
        validationSchema={createNewArticleValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
          errors,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit} className="w-3/4  pt-4 text-sm">
            {/* INPUT TITLE */}
            <div className="relative">
              <label htmlFor="title" className="pl-4 text-sm">
                Title
              </label>
              <input
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="text"
                className="mt-1 bg-lighter"
                id="title"
                name="title"
                autoFocus
              />
            </div>

            {/* INPUT CATEGORY */}
            <div className="relative mt-4">
              <label htmlFor="category" className="pl-4 text-sm">
                Category
              </label>
              <input
                value={values.CategoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="text"
                name="CategoryId"
                className="mt-1 bg-lighter"
                id="category"
              />
            </div>

            {/* INPUT KEYWORDS */}
            <div className="relative col-span-1 mt-4">
              <label htmlFor="keywords" className="pl-4 text-sm">
                Keywords
              </label>
              <input
                value={values.keywords}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="text"
                className="mt-1 bg-lighter"
                id="keywords"
                name="keywords"
              />
            </div>

            {/* INPUT COUNTRY */}
            <div className="relative mt-4">
              <label htmlFor="country" className="pl-4 text-sm">
                Country
              </label>
              <input
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="text"
                className="mt-1 bg-lighter"
                id="country"
                name="country"
              />
            </div>

            {/* INPUT URL */}
            <div className="relative mt-4">
              <label htmlFor="url" className="pl-4 text-sm">
                URL
              </label>
              <input
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                className="mt-1 bg-lighter"
                id="url"
              />
            </div>

            {/* INPUT CONTENT */}
            <div className="relative mt-4">
              <label htmlFor="content" className="pl-4 text-sm">
                Content
              </label>
              <textarea
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type="text"
                name="content"
                className="mt-1 w-full rounded-2xl bg-lighter shadow-lg"
                id="content"
              />
            </div>

            {/* INPUT IMAGE */}
            <div className="mt-4 flex h-fit w-full flex-col items-center justify-center rounded-xl bg-lighter px-4 pb-12 pt-28 shadow-md">
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
                    // isLoading={isUploadImageLoading}
                    // isDisabled={isUploadImageLoading}
                  />
                </>
              ) : (
                <Button
                  // onClick={onButtonUpload}
                  title="Upload Image"
                  isButton
                  isPrimary
                  className="mt-2"
                />
              )}
            </div>

            {/* <div className="form-row ">
              <label>Picture</label>
              <div
                className={`alert alert-error ${file?.code ? "" : "hidden"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{file?.code}</span>
              </div>
              <div
                className={`file-input-bordered file-input-md flex h-auto border-2 py-5 ${
                  file && file.name === null && touched.picture
                    ? "input-error"
                    : "border-cyan-800"
                }  w-full break-all rounded-md`}
              >
                <input {...getInputProps({ name: "image" })} />
                <a
                  onClick={open}
                  className="link link-hover ml-2 w-auto flex-grow rounded-lg text-[12pt] font-semibold text-amber-950"
                >
                  {file?.name ? file.name : "Choose a file"}
                </a>
                <button
                  className={`btn btn-square btn-outline p-0 ${
                    file === "null" || file?.code ? "hidden" : ""
                  }`}
                  // onClick={onButtonCancelUpload}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {file && file.name == null && touched.picture ? (
                <span className="error">Picture is required</span>
              ) : null}
            </div> */}

            <Button isButton isSecondary title="Cancel" />
            <Button isButton isPrimary type="submit" title="Create Article" />
          </form>
        )}
      </Formik>
    </div>
  );
}
