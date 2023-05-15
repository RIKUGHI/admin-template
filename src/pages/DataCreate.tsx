import { MouseEvent, useRef, useState } from "react"
import {
  Button,
  InputFloatingLabel,
  TextAreaFloatingLabel,
} from "../components/atoms"
import {
  Breadcrumb,
  FormInput,
  FormSelect,
  FormTextArea,
  Modal,
} from "../components/molecules"
import { ManagementLayout } from "../components/organisms"

export default function DataCreate() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [show, setShow] = useState(false)
  const [showCentered, setShowCentered] = useState(false)

  function handleDialog() {
    dialogRef.current?.showModal()
    setShow(true)
  }

  function handleOutside(e: MouseEvent) {
    if (dialogRef.current) {
      const dialogDimensions = dialogRef.current.getBoundingClientRect()

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialogRef.current.close()
        setShow(false)
      }
    }
  }

  return (
    <ManagementLayout>
      <Breadcrumb>
        <Breadcrumb.Item href="/data">Data</Breadcrumb.Item>
        <Breadcrumb.Item active>Create</Breadcrumb.Item>
      </Breadcrumb>

      <div className="m-auto max-w-[700px] rounded-md bg-white p-5 shadow-md">
        <form>
          <InputFloatingLabel />
          <TextAreaFloatingLabel />
          <div className="grid grid-cols-6 gap-2">
            <FormTextArea name="Test about" className="col-span-3" />
            <FormTextArea name="Test about" className="col-span-3" error />
            <FormInput name="Last name" className="col-span-3" />
            <FormInput name="First name" className="col-span-3" error />
            <FormSelect name="Options" className="col-span-3" />
            <FormSelect name="Options" className="col-span-3" error />
          </div>

          <div className="mt-2 flex justify-end space-x-2">
            <Button name="Cancel" color="red" />
            <Button name="Save" style="solid" color="primary" />
          </div>
        </form>
        <Button
          name="Open general modal"
          style="solid"
          color="blue"
          onClick={handleDialog}
        />
        <Button
          name="Open centered modal"
          style="solid"
          color="blue"
          onClick={() => setShowCentered(true)}
        />
        <Modal title="Example" show={show} onHide={() => setShow(false)}>
          <form>
            <div className="my-4 grid grid-cols-6 gap-2 border-y py-4">
              <FormTextArea name="Test about" className="col-span-3" />
              <FormTextArea name="Test about" className="col-span-3" error />
              <FormInput name="Last name" className="col-span-3" />
              <FormInput name="First name" className="col-span-3" error />
              <FormSelect name="Options" className="col-span-3" />
              <FormSelect name="Options" className="col-span-3" error />
            </div>
            <div className="mt-2 flex justify-end space-x-2">
              <Button name="Cancel" onClick={() => setShow(false)} />
              <Button name="Save" style="solid" color="primary" />
            </div>
          </form>
        </Modal>
        <Modal
          title="Example 2"
          show={showCentered}
          type="centered"
          onHide={() => setShowCentered(false)}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
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
              onClick={() => setShowCentered(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </ManagementLayout>
  )
}
