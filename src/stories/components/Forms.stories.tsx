import type { Meta, StoryObj } from "@storybook/react"
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextArea,
} from "../../components/molecules"

const Form = () => {
  return <form></form>
}

const meta: Meta = {
  title: "Components/Forms",
  component: Form,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export const Input: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        <FormInput name="Last name" className="col-span-2" />
        <FormInput name="First name" className="col-span-2" error />
        <FormInput required name="Last name" className="col-span-2" />
        <FormInput required name="First name" className="col-span-2" error />
      </div>
    )
  },
}

export const TextArea: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        <FormTextArea name="Test about" className="col-span-2" />
        <FormTextArea name="Test about" className="col-span-2" error />
        <FormTextArea required name="Test about" className="col-span-2" />
        <FormTextArea required name="Test about" className="col-span-2" error />
      </div>
    )
  },
}

export const Select: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        <FormSelect name="Options" className="col-span-2" />
        <FormSelect name="Options" className="col-span-2" error />
        <FormSelect required name="Options" className="col-span-2" />
        <FormSelect required name="Options" className="col-span-2" error />
      </div>
    )
  },
}

export const Checkbox: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-4 gap-2">
        <FormCheckbox name="Options" className="col-span-2" />
        <FormCheckbox name="Options" className="col-span-2" error />
        <FormCheckbox required name="Options" className="col-span-2" />
        <FormCheckbox required name="Options" className="col-span-2" error />
      </div>
    )
  },
}
