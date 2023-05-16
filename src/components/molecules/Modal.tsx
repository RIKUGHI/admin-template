import {
  FC,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react"
import { Centered, Common } from "../atoms/dialog"

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
  const modalRef = useRef<HTMLDialogElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const defaultCommon = "my-0 sm:my-6 opacity-0"
  const defaultCentered = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"

  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState("opacity-0")
  const [dialog, setDialog] = useState(
    type == "common" ? defaultCommon : defaultCentered
  )

  useEffect(() => {
    if (show && !modalRef.current?.open) {
      setOpen(true)
      modalRef.current?.showModal()

      setTimeout(() => {
        setModal("opacity-75")
        setDialog(
          type == "common"
            ? "my-4 sm:my-12 opacity-100"
            : "opacity-100 translate-y-0 sm:scale-100"
        )
      }, 0)
    }

    if (!show && modalRef.current?.show) closeModal(false)
  }, [show, open])

  /**
   * Handling close modal
   *
   * @param boolean inside - used to decide the modal will be closed by either an internal or external state
   * @return {void}
   */
  function closeModal(inside = true) {
    setDialog(type == "common" ? defaultCommon : defaultCentered)
    setModal("opacity-0")
    setTimeout(() => {
      modalRef.current?.close()
      inside ? onHide() : setOpen(false)
    }, 300)
  }

  function handleOutside(e: MouseEvent) {
    if (modalRef.current && dialogRef.current) {
      const dialogDimensions = dialogRef.current.getBoundingClientRect()

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        closeModal()
      }
    }
  }

  if (!open) return null

  const Component = type == "common" ? Common : Centered

  return (
    <dialog
      ref={modalRef}
      className="z-10 outline-none backdrop:bg-transparent"
      onClick={handleOutside}
    >
      <div
        className={`fixed inset-0 bg-gray-500 ${modal} transition-opacity duration-300`}
      ></div>

      <div className="scrollbar fixed inset-0 z-10 overflow-y-auto">
        <Component ref={dialogRef} style={dialog} onHide={closeModal}>
          {children}
        </Component>
      </div>
    </dialog>
  )
}

export default Modal
