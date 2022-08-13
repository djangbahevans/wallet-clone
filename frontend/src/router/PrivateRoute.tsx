import { Navigate } from "react-router-dom"
import { Loading } from "../components"
import { useAuth } from "../contexts"

interface IPrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { user, loading } = useAuth()

  if (loading)
    return (
      <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
        <Loading style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }} />
      </div>
    )
  else
    return (user) ? children : <Navigate to="/login" />
}
