import React, { useRef, useState } from "react";
import Spinner from "../../components/spinner";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { Formik } from "formik";
import {
  changeEmailValidationSchema,
  changePhoneNumberValidationSchema,
  changeUsernameValidationSchema,
} from "../../store/slices/auth/validation";

export default function ModalChangeEmail({
  isChangeEmailLoading,
  isEmailSent,
  handleCloseModal,
  onButtonChangeEmail,
  onButtonNext,
  onButtonPrev,
  currentStep,
  refCurrentEmail,
  refNewEmail,
  error,
  success,
  formikChangeEmailRef,
}) {
  return (
    <Modal showModal={true}>
      <p>Change Email</p>

      {currentStep === 1 && (
        <Formik
          innerRef={formikChangeEmailRef}
          initialValues={{ currentEmail: "", newEmail: "" }}
          validationSchema={changeEmailValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="w-full pt-4 text-sm">
              <div className="relative">
                <input
                  ref={refCurrentEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  value={values.currentEmail}
                  type="email"
                  className="mt-4 bg-lighter"
                  id="currentEmail"
                  name="currentEmail"
                />
                <label htmlFor="currentEmail" className="placeholder">
                  Current Email
                </label>
              </div>

              <div className="relative">
                <input
                  ref={refNewEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  value={values.newEmail}
                  type="email"
                  className="mt-4 bg-lighter"
                  id="newEmail"
                  name="newEmail"
                />
                <label htmlFor="newEmail" className="placeholder">
                  New Email
                </label>
              </div>

              <div className="px-5">
                <span className=" text-xs text-red-500">
                  {errors.currentEmail || errors.newEmail}
                </span>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button
                  title="Cancel"
                  className="font-medium hover:text-primary"
                  onClick={handleCloseModal}
                  isButton
                />
                {!errors.currentEmail || !errors.newEmail ? (
                  <Button
                    type="button"
                    onClick={onButtonNext}
                    title="Next"
                    isButton
                    isPrimary
                  />
                ) : null}
              </div>
            </form>
          )}
        </Formik>
      )}

      {currentStep === 2 && (
        <div className="w-full pt-4 text-sm">
          {isChangeEmailLoading ? (
            <div className="flex w-full items-center justify-center">
              <Spinner />
            </div>
          ) : isEmailSent && success ? (
            <>
              <div className="flex w-full flex-col items-center justify-center">
                <HiCheckCircle className="text-5xl text-primary" />
                <p className="mt-2 text-base">{success}</p>
                <div className="mt-6 flex justify-end gap-4">
                  <Button
                    title="Close"
                    onClick={() => {
                      handleCloseModal();
                      window.location.reload();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === "Escape") {
                        handleCloseModal();
                        window.location.reload();
                      }
                    }}
                    isButton
                    isPrimary
                  />
                </div>
              </div>
            </>
          ) : isEmailSent && error ? (
            <>
              <div className="flex w-full flex-col items-center justify-center">
                <HiXCircle className="text-5xl text-red-500" />
                <p className="mt-2 text-base">{error}</p>
                <div className="mt-6 flex justify-end gap-4">
                  <Button
                    title="Close"
                    onClick={() => {
                      handleCloseModal();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === "Escape") {
                        handleCloseModal();
                      }
                    }}
                    isButton
                    isPrimary
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                Are you sure want to change your email to{" "}
                <span className="font-medium">
                  {refNewEmail.current?.value}
                </span>
                ?
              </p>

              <div className="mt-6 flex justify-end gap-4">
                <Button
                  title="Prev"
                  className="font-medium hover:text-primary"
                  onClick={onButtonPrev}
                  isButton
                />

                <Button
                  type="button"
                  onClick={onButtonChangeEmail}
                  title="Change Email"
                  isButton
                  isPrimary
                />
              </div>
            </>
          )}
        </div>
      )}
    </Modal>
  );
}
