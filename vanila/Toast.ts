interface ToastOptions {
  text?: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  autoClose?: boolean | number
  onClose?: () => void
}

const DEFAULT_OPTIONS: ToastOptions = {
  text: "Hello",
  position: "top-left",
  autoClose: 5000,
}

export default class Toast {
  #toastEl: HTMLDivElement
  #autoCloseTimeout: NodeJS.Timeout | null = null

  constructor(options: ToastOptions) {
    this.#toastEl = document.createElement("div")
    this.#toastEl.classList.add("toast")
    this.update({ ...DEFAULT_OPTIONS, ...options })
  }

  set position(value: string) {
    const currentContainer = this.#toastEl.parentElement
    const container =
      document.querySelector(`.toast-container[data-position="${value}"]`) ||
      createContainer(value)
    container.append(this.#toastEl)

    if (currentContainer && !currentContainer.hasChildNodes())
      currentContainer.remove()
  }

  set text(value: string) {
    this.#toastEl.textContent = value
  }

  set autoClose(value: boolean | number) {
    if (typeof value === "boolean" && !value) return
    if (typeof value !== "number") return

    if (this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout)
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value)
  }

  // set onClose(value) {
  //   this.onClose = value
  // }

  update(options: ToastOptions) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  remove() {
    const container = this.#toastEl.parentElement
    this.#toastEl.remove()
    this.onClose()
    if (container && !container.hasChildNodes()) container.remove()
  }
}

function createContainer(position: string): HTMLDivElement {
  const container = document.createElement("div")
  container.classList.add("toast-container")
  container.dataset.position = position
  document.body.append(container)
  return container
}
