import { FC, PropsWithChildren, forwardRef } from "react"
import { FaTimes } from "react-icons/fa"

export interface DialogProps {
  style: string
  onHide: () => void
}

// const Common: FC<PropsWithChildren<DialogProps>> = ({
//   children,
//   style,
//   onHide,
// }) => {
//   return (
//     <div className="flex justify-center px-4">
//       <div
//         className={`${style} w-[700px] rounded-md bg-white p-6 shadow-md transition-all duration-300`}
//       >
//         <div className="flex items-center justify-between">
//           <span className="text-xl font-bold text-green-600">Title</span>
//           <button className="bg-white" onClick={onHide}>
//             <FaTimes className="text-lg text-gray-600" />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   )
// }

const Common = forwardRef<HTMLDivElement, PropsWithChildren<DialogProps>>(
  ({ children, style, onHide }, ref) => {
    return (
      <div className="flex justify-center px-4">
        <div
          ref={ref}
          className={`${style} w-[700px] rounded-md bg-white p-6 shadow-md transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">Title</span>
            <button className="bg-white" onClick={onHide}>
              <FaTimes className="text-lg text-gray-600" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  }
)

export default Common
