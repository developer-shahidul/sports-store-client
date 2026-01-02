// import React from "react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";

const Resister = () => {
  const { createSignInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const createHandleUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const createUser = { name, email };
    // console.log(createUser);

    createSignInUser(email, password)
      .then((result) => {
        console.log(result.user);
        const createAt = result.user.metadata.creationTime;
        // console.log(createAt);
        const newUser = { name, email, createAt };
        fetch("https://sports-store-server-ivory.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Account created successfully",
                icon: "success",
              }).then(() => {
                navigate("/login", { replace: true });
              });
            }
          });
        form.reset();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={createHandleUser} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="input input-bordered w-full"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:underline">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Resister;
