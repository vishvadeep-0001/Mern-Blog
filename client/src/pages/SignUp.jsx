import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Yogesh's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is demo project. you can signup with your email and password.
            or with Gmail Account
          </p>
        </div>
        {/* Right Side */}
        <div className="ml-5">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="username">Your Username</Label>
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="email">Your Email</Label>
              <TextInput type="text" placeholder="email" id="email" />
            </div>
            <div>
              <Label value="Your Password"> Your Password</Label>
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button
              className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              type="submit"
            >
              SignUp
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/" className="text-blue-500">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
