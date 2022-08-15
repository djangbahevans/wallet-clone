import styles from "./Navbar.module.css";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { Button } from "../Button";
import avatar from "../../assets/images/avatar.svg";
import { useAuth } from "../../contexts";

const links = [{
  name: "Dashboard",
  to: "/dashboard",
  exact: true,
},
{
  name: "Accounts",
  to: "/accounts",
  exact: true,
},
{
  name: "Records",
  to: "/records",
  exact: true,
},
{
  name: "Analytics",
  to: "/analytics",
  exact: true,
},
{
  name: "Imports",
  to: "/imports",
  exact: true,
},
{
  name: "Wallet Life",
  to: "/wallet-life",
  exact: true,
}] as const;


export const Navbar = () => {
  const { user } = useAuth()

  const handleActiveNavLink: NavLinkProps["className"] = ({ isActive }) => {
    if (isActive) {
      return styles.active
    }
  }

  return (
    <div className={styles["nav-container"]}>
      <div className={styles.container} >
        <Link to="/dashboard">
          <div className={styles["home-nav"]} />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {
              links.map(({ name, to, exact }) => (
                <li key={name} className={styles.nav__item}>
                  <NavLink to={to} end={exact} className={handleActiveNavLink}>
                    {name}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
        <div className={styles["nav-right"]}>
          <Button className={styles["nav-button"]} label="＋&nbsp;Record" />
          <div className={styles.account_details}>
            <div className={styles.account_container}>
              <div className={styles.account_image}>
                <div><img src={avatar} alt="User avatar" /></div>
              </div>
              <div className={styles.account_data}>
                <span className={styles.account_name}>{user?.first_name} {user?.last_name}</span>
                <span className={styles.account_type}>Premium</span>
              </div>
              <span className={`material-icons ${styles.dropdown_icon}`}>
                arrow_drop_down
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
