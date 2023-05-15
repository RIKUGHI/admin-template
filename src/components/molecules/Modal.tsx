import clsx from "clsx"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"
import { Centered, Common } from "../atoms/dialog"
import { FaTimes } from "react-icons/fa"

interface Props {
  show: boolean
  type?: "common" | "centered"
  onHide: () => void
}

const Modal: FC<Props> = ({ show, type = "common", onHide }) => {
  const ref = useRef<HTMLDialogElement>(null)

  const defaultCommon = "my-2 sm:my-10 opacity-0"
  const defaultCentered = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"

  const [modal, setModal] = useState("opacity-0")
  const [dialog, setDialog] = useState(
    type == "common" ? defaultCommon : defaultCentered
  )

  useEffect(() => {
    if (show && !ref.current?.open) {
      ref.current?.showModal()

      setModal("opacity-75")
      setDialog(
        type == "common"
          ? "my-4 sm:my-12 opacity-100"
          : "opacity-100 translate-y-0 sm:scale-100"
      )
    }
  }, [show])

  function closeModal() {
    setDialog(type == "common" ? defaultCommon : defaultCentered)
    setModal("opacity-0")
    setTimeout(() => {
      onHide()
    }, 300)
  }

  if (!show) return null

  const Component = type == "common" ? Common : Centered

  return (
    <dialog
      ref={ref}
      className="z-10 outline-none backdrop:bg-transparent"
      data-view="1"
    >
      <div
        id="overlay"
        className={`fixed inset-0 bg-gray-500 ${modal} transition-opacity duration-300`}
      ></div>

      <div className="scrollbar fixed inset-0 z-10 overflow-y-auto">
        <Component dialog={dialog}>
          {/* <CenteredContent /> */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">Title</span>
            <button className="bg-white" onClick={closeModal}>
              <FaTimes className="text-lg" />
            </button>
          </div>
        </Component>
      </div>
    </dialog>
  )
}

export default Modal

const CenteredContent = () => {
  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Deactivate account
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Deactivate
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </>
  )
}
