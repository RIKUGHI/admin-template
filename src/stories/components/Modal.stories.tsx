import type { Meta, StoryObj } from "@storybook/react"
import {
  FormInput,
  FormSelect,
  FormTextArea,
  Modal,
} from "../../components/molecules"
import { Button } from "../../components/atoms"
import { useState } from "react"

const meta: Meta<typeof Modal> = {
  title: "Components/Modal ",
  component: Modal,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {},
  render: () => {
    const [show, setShow] = useState(false)

    function handleDialog() {
      setShow(true)
    }

    return (
      <>
        <Button
          name="Open modal"
          style="solid"
          color="blue"
          onClick={handleDialog}
        />
        <Modal title="Example" show={show} onHide={() => setShow(false)}>
          <h1>Hello world</h1>
        </Modal>
      </>
    )
  },
}

export const Centered: Story = {
  args: {},
  render: () => {
    const [show, setShow] = useState(false)

    function handleDialog() {
      setShow(true)
    }

    return (
      <>
        <Button
          name="Open modal"
          style="solid"
          color="blue"
          onClick={handleDialog}
        />
        <Modal
          title="Example"
          show={show}
          type="centered"
          onHide={() => setShow(false)}
        >
          <div className="p-4">
            <h1>Hello world</h1>
            <Button
              name="Close"
              style="solid"
              color="red"
              onClick={() => setShow(false)}
            />
          </div>
        </Modal>
      </>
    )
  },
}
