import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components"
import { PageWrapper } from "../components/NavPageWrapper/NavPageWrapper"
import { AccountsPage, AnalyticsPage, DashboardPage, ImportsPage, LoginPage, RecordsPage, ResetPasswordPage, SignupPage, WalletLifePage } from "../pages"
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
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/imports" element={<ImportsPage />} />
          <Route path="/wallet-life" element={<WalletLifePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
