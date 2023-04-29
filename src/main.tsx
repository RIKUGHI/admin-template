import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Navigation } from "./components/organisms"
import "./index.css"

const Dashboard = lazy(() => import("./pages/Dashboard.tsx"))
const Error = lazy(() => import("./pages/Error.tsx"))

const AdminLayout = () => {
  return (
    <div className="bb flex h-screen overflow-hidden">
      <Navigation />
      <div className="flex-1 bg-green-200">
        <Outlet />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("raphael") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<h1 className="m-auto block">Loading...</h1>}>
                {/* <Dashboard /> */}
                wew
              </Suspense>
            }
          />
          <Route
            path="/a"
            element={
              <Suspense fallback={<h1 className="m-auto block">Loading...</h1>}>
                a
              </Suspense>
            }
          />
          <Route
            path="/b"
            element={
              <Suspense fallback={<h1 className="m-auto block">Loading...</h1>}>
                b
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<h1 className="m-auto block">Loading...</h1>}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
