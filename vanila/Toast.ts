interface IToast {
  position?: string
}

interface ToastOptions {
  position?: string
  text: string
}

export default class Toast implements IToast {
  #toastEl: HTMLDivElement
  #autoCloseTimeout: NodeJS.Timeout | null = null

  constructor(options: ToastOptions) {
    this.#toastEl = document.createElement("div")
    this.#toastEl.classList.add("toast")

    Object.entries(options).forEach(([key, value]) => {
      this[key] = value
    })
  }

  set position(value: string) {
    const container =
      document.querySelector(`.toast-container[data-position="${value}"]`) ||
      createContainer(value)
    container.append(this.#toastEl)
  }

  set text(value: string) {
    this.#toastEl.textContent = value
  }

  set autoClose(value: boolean | number) {
    if (typeof value === "boolean" && !value) return
    if (typeof value !== "number") return

    if (this.#autoCloseTimeout) clearTimeout(this.#autoCloseTimeout)
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value)
  }

  remove() {
    const container = this.#toastEl.parentElement
    this.#toastEl.remove()
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
