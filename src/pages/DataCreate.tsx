import { DialogHTMLAttributes, useRef } from "react"
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
} from "../components/molecules"
import { ManagementLayout } from "../components/organisms"

export default function DataCreate() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  function handleDialog() {
    dialogRef.current?.showModal()
  }

  function outside(e) {
    if (dialogRef.current) {
      const dialogDimensions = dialogRef.current.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialogRef.current.close()
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
          name="Open modal"
          style="solid"
          color="blue"
          onClick={handleDialog}
        />
        <dialog
          ref={dialogRef}
          className="z-10 rounded-md bg-white p-2 backdrop:bg-black/50"
          onClick={outside}
        >
          Test modal
        </dialog>
      </div>
    </ManagementLayout>
  )
}
