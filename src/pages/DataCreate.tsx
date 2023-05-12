import { FaChevronRight } from "react-icons/fa"
import { ManagementLayout } from "../components/organisms"
import {
  BreadcrumbLink,
  Button,
  Input,
  Select,
  TextArea,
} from "../components/atoms"
import { Breadcrumbs, FormInput, FormTextArea } from "../components/molecules"
import { ChangeEvent, useState } from "react"
import FormSelect from "../components/molecules/forms/FormSelect"

export default function DataCreate() {
  return (
    <ManagementLayout>
      <Breadcrumbs links={["Data", "Create"]} />
      <div className="m-auto max-w-[700px] rounded-md bg-white p-5 shadow-md">
        <form>
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
      </div>
    </ManagementLayout>
  )
}
