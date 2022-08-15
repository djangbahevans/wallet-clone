import { Navbar } from "../Navbar"
import {Outlet} from "react-router-dom"
import styles from "./NavPageWrapper.module.css"


export const PageWrapper = () => {
  return (
    <>
      <Navbar />
      <div className={styles.toolbar} />
      <Outlet />
    </>
  )
}
