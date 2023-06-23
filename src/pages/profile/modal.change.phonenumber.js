import React, { useRef, useState } from "react";
import Spinner from "../../components/spinner";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { Formik } from "formik";
import {
  changePhoneNumberValidationSchema,
  changeUsernameValidationSchema,
} from "../../store/slices/auth/validation";

export default function ModalChangePhoneNumber({
  isChangePhoneNumberLoading,
  isEmailSent,
  phone,
  handleCloseModal,
  onButtonChangePhoneNumber,
  onButtonNext,
  onButtonPrev,
  currentStep,
  refPhoneNumber,
  error,
  success,
  formikChangePhoneNumberRef,
}) {
  return (
    <Modal showModal={true}>
      <p>Change Phone Number</p>

      {currentStep === 1 && (
        <Formik
          innerRef={formikChangePhoneNumberRef}
          initialValues={{ phone: phone }}
          validationSchema={changePhoneNumberValidationSchema}
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
                  ref={refPhoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  value={values.phone}
                  type="text"
                  className="mt-4 bg-lighter"
                  id="phone"
                  name="phone"
                />
                <label htmlFor="phone" className="placeholder">
                  Change Phone Number
                </label>
              </div>

              <div className="px-5">
                <span className=" text-xs text-red-500">{errors.phone}</span>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button
                  title="Cancel"
                  className="font-medium hover:text-primary"
                  onClick={handleCloseModal}
                  isButton
                />
                {!errors.phone && (
                  <Button
                    type="button"
                    onClick={onButtonNext}
                    title="Next"
                    isButton
                    isPrimary
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      )}

      {currentStep === 2 && (
        <div className="w-full pt-4 text-sm">
          {isChangePhoneNumberLoading ? (
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
                Are you sure want to change your phone to{" "}
                <span className="font-medium">
                  {refPhoneNumber.current?.value}
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
                  onClick={onButtonChangePhoneNumber}
                  title="Change Phone Number"
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
