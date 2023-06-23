import { Formik } from "formik";
import bgimage from "../../assets/image.svg";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/slices/categories/slices";
import Button from "../../components/Button";
import { useDropzone } from "react-dropzone";
import { createNewArticleValidationSchema } from "../../store/slices/auth/validation";
import Modal from "../../components/Modal";
import { createNewArticle, getArticles } from "../../store/slices/blogs/slices";
import Spinner from "../../components/spinner";
import { HiCheckCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function CreateNewArticle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikRef = useRef();

  const { categories, isLoading, isUploaded, success } = useSelector(
    (state) => {
      return {
        categories: state.categories.data,
        isLoading: state.blogs.isLoading,
        isUploaded: state.blogs.isUploaded,
        success: state.blogs.success,
      };
    }
  );

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 1000000) {
      alert("file too large. Max 1 MB");
      return;
    }
    setFile(selectedFile);

    // console.log(selectedFile);

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

  const formData = new FormData();

  const handleSubmitButton = () => {
    if (formikRef.current.isValid && file) {
      setShowModal(true);
      return;
    }

    setWarning(true);

    setTimeout(() => {
      setWarning(false);
    }, 300);
  };

  const handlePublishArticle = () => {
    if (formikRef.current) {
      const values = formikRef.current.values;

      formData.append("data", JSON.stringify(values));
      formData.append("file", file);
    }

    dispatch(createNewArticle(formData));
    dispatch(
      getArticles({
        id_cat: "",
        page: 1,
        sort: "DESC",
      })
    );

    formikRef.current.resetForm();
    setFile(null);
    setPreviewImage(null);
    // setShowModal(false);
  };

  const handleCancelPublishArticle = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    navigate("/profile");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="container flex justify-center px-4 py-24">
      <Formik
        innerRef={formikRef}
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
          // console.log(values);
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
              <label htmlFor="category" className="block pl-4 text-sm">
                Category
              </label>
              <select
                id="category"
                name="CategoryId"
                onChange={handleChange}
                // onChange={(event) =>
                //   handleChange(event) && handleChangeCategory(event, values)
                // }
                onBlur={handleBlur}
                required
                className="mt-1 w-1/2 rounded-full bg-lighter p-2 shadow-md"
                value={values.CategoryId}
              >
                <option value="" className="text-light-gray">
                  Select Category
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
                  className: `w-1/2 h-fit flex items-center duration-300 justify-center flex-col p-4 border-2 border-dark border-dashed rounded-md ${
                    isDragActive ? "bg-teal-200/20" : null
                  } ${warning && "bg-red-200"}`,
                })}
              >
                <input {...getInputProps({ name: "image", required: true })} />

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
                      title="Remove"
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
              ) : null}
            </div>
            <div className="mt-4 flex justify-end gap-4">
              <Button isButton isSecondary title="Cancel" />
              <Button
                isButton
                isPrimary
                type="submit"
                title="Create Article"
                onClick={() => handleSubmitButton()}
              />
            </div>
          </form>
        )}
      </Formik>

      {showModal && formikRef.current.values && (
        <Modal showModal={showModal}>
          {isLoading && (
            <div className="flex w-full justify-center">
              <Spinner />
            </div>
          )}

          {isUploaded && !isLoading && (
            <div className="flex w-full flex-col items-center justify-center">
              <HiCheckCircle className="text-5xl text-primary" />
              <p className="mt-2 text-base">{success}</p>
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  title="Close"
                  onClick={() => {
                    handleCloseModal();
                    // window.location.reload();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === "Escape") {
                      handleCloseModal();
                      // window.location.reload();
                    }
                  }}
                  isButton
                  isPrimary
                />
              </div>
            </div>
          )}

          {!isLoading && !isUploaded && (
            <>
              <p>Are you sure to publish this article?</p>
              <div className="mt-4 flex justify-end gap-4">
                <Button
                  isButton
                  isSecondary
                  title="Cancel"
                  onClick={handleCancelPublishArticle}
                />
                <Button
                  isButton
                  isPrimary
                  title="Sure"
                  onClick={() => handlePublishArticle()}
                />
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
