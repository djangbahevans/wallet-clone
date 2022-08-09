import { useState } from "react";
import validator from "validator";
import boardLogo from "../../assets/images/board-logo.svg";
import facebook from "../../assets/images/facebook.svg";
import google from "../../assets/images/google.svg";
import promoImage from "../../assets/images/promo-image.png";
import { Button, SocialButton, TextField } from "../../components";
import styles from "./SignupPage.module.css";


export const SignupPage = () => {
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    if (validator.isEmpty(email)) {
      return "Email is required.";
    }
    else if (!validator.isEmail(email)) {
      return "Invalid email.";
    }
    return "";
  }

  const validatePassword = (password: string) => {
    if (validator.isEmpty(password)) {
      return "Password is required.";
    }
    else if (!validator.isLength(password, { min: 6, max: undefined })) {
      return "Password has to be at least 6 characters long.";
    }
    return "";
  }

  const handleChange = (name: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    }
    else if (name === "password") {
      setErrors({ ...errors, password: validatePassword(value) });
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (emailValidation || passwordValidation) {
      return setErrors({ email: emailValidation, password: passwordValidation });
    }

    console.log(`Email: ${email} Password: ${password}`);
  }

  return (
    <div className={styles["main-container"]}>
      <div className={styles.left}>
        <a href="/" target="_blank" className={styles.logo}>&nbsp;</a>
        <div className={styles.innerContainer}>
          <h1 className={styles["tag-line"]}>Your Finances<br />in One Place</h1>
          <img src={promoImage} alt="Wallet app running on several devices and platforms" />
          <p>Dive into reports, build budgets, sync with your<br />banks and enjoy automatic categorization.</p>
          <p>
            <a href="/what-is-wallet">
              Learn more about how Wallet works
            </a>
          </p>
        </div>
        <img src={boardLogo} alt="Board logo" />
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper1}>
          <div className={styles.wrapper2}>
            <div className={styles.innerContainer}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles["log-in"]}>Create Wallet account</h1>
                <p>Sign up below to create your Wallet account</p>
                <TextField name="email" label="Email" autoComplete="email" error={errors.email} onChange={handleChange("email")} type="email" autoFocus />
                <TextField name="password" label="Password" autoComplete="current-password" error={errors.password} onChange={handleChange("password")} type="password" />
                <Button label="Sign Up" />
              </form>
              <div className={styles.oauth}>
                <div className={styles.continue}>
                  <hr />
                  <p>or continue with</p>
                  <hr />
                </div>
                <div className={styles["social-buttons"]}>
                  <SocialButton label="Facebook" src={facebook} />
                  <SocialButton label="Google" src={google} />
                </div>
              </div>
              <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <p>
            By signing up or connecting with the services above you agree to our <a href="/">Terms of Service</a> and acknowledge our <a href="/privacy">Privacy Policy</a> describing how we handle your personal data.
          </p>
        </footer>
      </div>
    </div>
  )
}
