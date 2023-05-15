import clsx from "clsx"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"
import { Centered, Common } from "../atoms/dialog"
import { FaTimes } from "react-icons/fa"
import { FormInput, FormSelect, FormTextArea } from "."
import { Button } from "../atoms"

interface Props {
  title: string
  show: boolean
  type?: "common" | "centered"
  onHide: () => void
}

const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  show,
  type = "common",
  onHide,
}) => {
  const ref = useRef<HTMLDialogElement>(null)

  const defaultCommon = "my-0 sm:my-6 opacity-0"
  const defaultCentered = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"

  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState("opacity-0")
  const [dialog, setDialog] = useState(
    type == "common" ? defaultCommon : defaultCentered
  )

  useEffect(() => {
    if (show && !ref.current?.open) {
      setOpen(true)
      ref.current?.showModal()

      setTimeout(() => {
        setModal("opacity-75")
        setDialog(
          type == "common"
            ? "my-4 sm:my-12 opacity-100"
            : "opacity-100 translate-y-0 sm:scale-100"
        )
      }, 0)
    }

    // handle show by outer function
    if (!show && ref.current?.show) {
      setDialog(type == "common" ? defaultCommon : defaultCentered)
      setModal("opacity-0")
      setTimeout(() => {
        setOpen(false)
      }, 300)
    }
  }, [show, open])

  function closeModal() {
    setDialog(type == "common" ? defaultCommon : defaultCentered)
    setModal("opacity-0")
    setTimeout(() => {
      onHide()
    }, 300)
  }

  if (!open) return null

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
        <Component style={dialog} onHide={closeModal}>
          {children}
        </Component>
      </div>
    </dialog>
  )
}

export default Modal
