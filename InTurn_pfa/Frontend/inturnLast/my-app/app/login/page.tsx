"use client";
import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"student" | "company">("student");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? "http://localhost:3001/api/auth/login"
        : "http://localhost:3001/api/auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { ...formData, userType };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (data.token) {
        document.cookie = `authToken=${data.token}; path=/; max-age=86400`; // 1 day
        router.push("/");
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => setIsLogin(!isLogin);

  return (
    <div
      className={`${styles.loginContainer} ${!isLogin ? styles.active : ""}`}
    >
      {/* Form Container */}
      <div
        className={`${styles.formContainer} ${
          isLogin ? styles.signIn : styles.signUp
        }`}
      >
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h1 className={styles.loginTitle}>
            {isLogin ? "Welcome Back!" : "Create Account"}
            <span className={styles.titleUnderline}></span>
          </h1>

          {!isLogin && (
            <>
              <div className={styles.userType}>
                <div
                  className={styles.typeToggle}
                  style={{
                    transform: `translateX(${
                      userType === "student" ? "0" : "100%"
                    })`,
                  }}
                />
                <button
                  type="button"
                  className={`${styles.userTypeButton} ${
                    userType === "student" ? styles.activeType : ""
                  }`}
                  onClick={() => setUserType("student")}
                >
                  <i className={`fas fa-graduation-cap ${styles.buttonIcon}`} />{" "}
                  Student
                </button>
                <button
                  type="button"
                  className={`${styles.userTypeButton} ${
                    userType === "company" ? styles.activeType : ""
                  }`}
                  onClick={() => setUserType("company")}
                >
                  <i className={`fas fa-building ${styles.buttonIcon}`} />{" "}
                  Company
                </button>
              </div>

              {userType === "student" ? (
                <div className={styles.nameGroup}>
                  <div className={styles.inputGroup}>
                    <i className={`fas fa-user ${styles.inputIcon}`} />
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <i className={`fas fa-users ${styles.inputIcon}`} />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={styles.formInput}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.inputGroup}>
                  <i className={`fas fa-building ${styles.inputIcon}`} />
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                  />
                </div>
              )}
            </>
          )}

          <div className={styles.inputGroup}>
            <i className={`fas fa-envelope ${styles.inputIcon}`} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.inputGroup}>
            <i className={`fas fa-lock ${styles.inputIcon}`} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className={styles.formInput}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              />
            </button>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-circle" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loading}>
                <i className="fas fa-spinner fa-spin" /> Processing...
              </span>
            ) : (
              <>
                <i
                  className={`fas ${
                    isLogin ? "fa-sign-in-alt" : "fa-user-plus"
                  } ${styles.buttonIcon}`}
                />
                {isLogin ? "Sign In" : "Sign Up"}
              </>
            )}
          </button>

          <div className={styles.alternativeAuth}>
            <span className={styles.divider}>or continue with</span>
            <div className={styles.socialIcons}>
              {[
                { provider: "google", icon: "fa-google" },
                { provider: "apple", icon: "fa-apple" },
                { provider: "facebook", icon: "fa-facebook-f" },
              ].map(({ provider, icon }) => (
                <button
                  key={provider}
                  type="button"
                  className={`${styles.socialButton} ${styles[provider]}`}
                >
                  <i className={`fab ${icon}`} />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.mobileToggle}>
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              className={styles.mobileToggleButton}
              onClick={toggleAuthMode}
            >
              <i
                className={`fas ${
                  isLogin ? "fa-user-plus" : "fa-sign-in-alt"
                } ${styles.buttonIcon}`}
              />
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className={styles.togglePanel}>
        <div className={styles.panelContent}>
          <div className={styles.panelIllustration}>
            <i
              className={`fas ${isLogin ? "fa-user-plus" : "fa-sign-in-alt"}`}
            />
          </div>
          <div className={styles.panelText}>
            <h2>{isLogin ? "Join Our Community" : "Welcome Back!"}</h2>
            <p>
              {isLogin
                ? "Register today to unlock exclusive features and opportunities tailored for you"
                : "Sign in to access your personalized dashboard and continue your journey"}
            </p>
            <ul className={styles.featuresList}>
              {isLogin ? (
                <>
                  <li>
                    <i className="fas fa-check-circle" /> Access to all features
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Personalized dashboard
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Exclusive
                    opportunities
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <i className="fas fa-check-circle" /> Track your progress
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Manage your account
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Connect with others
                  </li>
                </>
              )}
            </ul>
          </div>
          <button onClick={toggleAuthMode} className={styles.panelToggleButton}>
            <i
              className={`fas ${isLogin ? "fa-user-plus" : "fa-sign-in-alt"} ${
                styles.buttonIcon
              }`}
            />
            {isLogin ? "Register Now" : "Sign In Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
