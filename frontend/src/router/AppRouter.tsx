import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components"
import { PageWrapper } from "../components/NavPageWrapper/NavPageWrapper"
import { DashboardPage, LoginPage, ResetPasswordPage, SignupPage } from "../pages"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><PageWrapper /></PrivateRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
