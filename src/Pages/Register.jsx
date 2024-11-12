import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendSignInLinkToEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.init";

const Register = () => {
  const [user, setUser] = useState(null);
  const [showPass, setShowPass] = useState(true);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  // Email and Password Sign in

  const emailProvider = getAuth();

  const handleSubmit = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;

    e.preventDefault();
    console.log("Email and password Login");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        sendEmailVerification(auth.currentUser);

        alert("Sign In Successful");
        setUser(result.user);
      })
      .catch((error) => {
        alert(error.message);
        setUser(null);
      });
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {
    console.log("Google Sign in click");
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        alert("Sign In Successful");
        console.log(res.user);
        setUser(res.user);
      })
      .catch((error) => {
        alert(error);
        setUser(null);
      });
  };

  // Google Sign Out
  const signOutGoogle = () => {
    signOut(auth).then((result) => {
      alert("Sign out Successful");
      setUser(null);
    });
  };

  // Github SignIn
  const githubProvider = new GithubAuthProvider();

  const handleSignInWithGithub = () => {
    console.log("Sign in with Github");
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result);
        setUser(result.user);
      })
      .catch((error) => {
        console.log("Error", error);
        setUser(null);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <p>User Name : {user && user.displayName}</p>
          <p>User Email : {user && user.email}</p>
          <p>
            User Photo : <img src={user && user.photoURL} alt="" />
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={!showPass ? "text" : "password"}
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <span
                onMouseEnter={showPassword}
                onMouseLeave={showPassword}
                className="btn btn-xs absolute top-[60%] right-3"
              >
                {showPass ? <FaRegEyeSlash /> : <FaEye />}
              </span>
            </div>
            {!user && (
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            )}
          </form>

          <div className="pb-12 mx-auto flex flex-col gap-2">
            {user ? (
              <button onClick={signOutGoogle}> Sign Out</button>
            ) : (
              <div className=" flex flex-col gap-3 font-bold text-white text-xl">
                <button
                  className="bg-green-500 px-8 py-4 rounded-lg font-bold text-white text-xl"
                  onClick={handleSignInWithGoogle}
                >
                  Sign In With Google
                </button>
                <button
                  className="bg-green-500 px-8 py-4 rounded-lg font-bold text-white text-xl"
                  onClick={handleSignInWithGithub}
                >
                  Sign In With Github
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
