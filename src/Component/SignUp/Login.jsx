//
import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { logInUser, logOutUser, user } = useContext(AuthContext);

  // logOUt
  const handleLogOut = () => {
    if (!user) return;
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Account LogOut successfully",
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  // logIn process and server site a

  const handleLogIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = event.target.email.value;
    const password = event.target.password.value;

    logInUser(email, password)
      .then((result) => {
        console.log(result.user);
        const lastSignInTime = result.user.metadata.lastSignInTime;
        // console.log(lastLogInAt);
        const newUser = { email, lastSignInTime };

        fetch("https://sports-store-server-ivory.vercel.app/users", {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.modifiedCount) {
              Swal.fire({
                title: "Success!",
                text: "Account LogIn successfully",
                icon: "success",
              });
            }
            form.reset();
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogIn} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleLogOut}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            LogOut
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to="/resister" className="text-blue-600 hover:underline">
            Resister
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
