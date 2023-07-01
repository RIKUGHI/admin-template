interface ToastOptions {
  text?: string
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
  autoClose?: boolean | number
  closeOnClick?: boolean
  onClose?: () => void
  showProgress?: boolean
  pauseOnHover?: boolean
  pauseOnFocusLoss?: boolean
}

const DEFAULT_OPTIONS: ToastOptions = {
  text: "🔥Wow so easy!🔥",
  position: "top-right",
  autoClose: 1000,
  closeOnClick: true,
  showProgress: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
}

export default class Toast {
  #toastEl: HTMLDivElement
  #autoCloseInterval: number
  #progressInterval: number
  #timeVisible = 0
  #autoClose = 0
  #isPaused = false
  #shouldUnPause: boolean = false
  #onClose: () => void | undefined

  constructor(options: ToastOptions) {
    this.#toastEl = document.createElement("div")
    this.#toastEl.classList.add("toast")
    requestAnimationFrame(() => {
      this.#toastEl.classList.add("show")
    })
    this.update({ ...DEFAULT_OPTIONS, ...options })
  }

  update(options: ToastOptions) {
    Object.entries(options).forEach(([key, value]) => {
      this[key](value)
    })
  }

  private text(value: string) {
    this.#toastEl.textContent = value
  }

  private position(value: string) {
    const currentContainer = this.#toastEl.parentElement
    const container =
      document.querySelector(`.toast-container[data-position="${value}"]`) || createContainer(value)
    container.append(this.#toastEl)

    if (currentContainer && !currentContainer.hasChildNodes()) currentContainer.remove()
  }

  private autoClose(value: boolean | number) {
    if (typeof value === "number") this.#autoClose = value
    this.#timeVisible = 0
    if (typeof value === "boolean" && !value) return

    let lastTime: number | null
    const frameRequest = (time: number) => {
      if (this.#shouldUnPause) {
        lastTime = null
        this.#shouldUnPause = false
      }

      if (lastTime == null) {
        lastTime = time
        this.#autoCloseInterval = requestAnimationFrame(frameRequest)
        return
      }

      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime

        if (this.#timeVisible >= this.#autoClose) {
          this.remove()
          return
        }
      }

      lastTime = time
      this.#autoCloseInterval = requestAnimationFrame(frameRequest)
    }

    this.#autoCloseInterval = requestAnimationFrame(frameRequest)
  }

  private closeOnClick(value) {
    this.#toastEl.classList.toggle("can-close", value)
    if (value) {
      this.#toastEl.addEventListener("click", this.remove.bind(this))
    } else {
      this.#toastEl.removeEventListener("click", this.remove.bind(this))
    }
  }

  private showProgress(value: boolean) {
    if (!value) return

    this.#toastEl.classList.toggle("progress", value)
    this.#toastEl.style.setProperty("--progress", "1")

    const frameRequest = () => {
      if (!this.#isPaused) {
        this.#toastEl.style.setProperty(
          "--progress",
          (1 - this.#timeVisible / this.#autoClose).toString()
        )
      }
      this.#progressInterval = requestAnimationFrame(frameRequest)
    }

    this.#progressInterval = requestAnimationFrame(frameRequest)
  }

  private pauseOnHover(value) {
    if (value) {
      this.#toastEl.addEventListener("mouseover", () => (this.#isPaused = true))
      this.#toastEl.addEventListener("mouseleave", () => (this.#isPaused = false))
    } else {
      this.#toastEl.removeEventListener("mouseover", () => (this.#isPaused = true))
      this.#toastEl.removeEventListener("mouseleave", () => (this.#isPaused = false))
    }
  }

  private pauseOnFocusLoss(value) {
    if (value) {
      document.addEventListener(
        "visibilitychange",
        () => (this.#shouldUnPause = document.visibilityState === "visible")
      )
    } else {
      document.removeEventListener(
        "visibilitychange",
        () => (this.#shouldUnPause = document.visibilityState === "visible")
      )
    }
  }

  private onClose(cb: () => void) {
    this.#onClose = cb
  }

  private remove() {
    cancelAnimationFrame(this.#autoCloseInterval)
    cancelAnimationFrame(this.#progressInterval)

    const container = this.#toastEl.parentElement
    this.#toastEl.classList.remove("show")
    this.#toastEl.addEventListener("transitionend", () => {
      this.#toastEl.remove()
      if (container && !container.hasChildNodes()) container.remove()
    })

    if (typeof this.#onClose === "function") this.#onClose()
  }
}

function createContainer(position: string): HTMLDivElement {
  const container = document.createElement("div")
  container.classList.add("toast-container")
  container.dataset.position = position
  document.body.append(container)
  return container
}
