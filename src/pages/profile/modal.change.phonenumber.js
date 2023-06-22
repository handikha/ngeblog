import React, { useRef, useState } from "react";
import Spinner from "../../components/spinner";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

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
}) {
  return (
    <Modal showModal={true}>
      <p>Change Phone Number</p>

      {currentStep === 1 && (
        <form className="w-full pt-4 text-sm">
          <div className="relative">
            <input
              ref={refPhoneNumber}
              defaultValue={isEmailSent ? "" : phone}
              required
              type="text"
              className="mt-4 bg-lighter"
              id="changePhone"
            />
            <label htmlFor="changePhone" className="placeholder">
              Change Phone
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              title="Cancel"
              className="font-medium hover:text-primary"
              onClick={handleCloseModal}
              isButton
            />
            <Button
              type="button"
              onClick={onButtonNext}
              title="Next"
              isButton
              isPrimary
            />
          </div>
        </form>
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
