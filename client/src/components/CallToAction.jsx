import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div
      className="flex
      flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center"
    >
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript ?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 Javascript Projects
        </p>
        <Button className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 rounded-tl-xl rounded-bl-none">
          <a
            href="https://www/100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            100 Javascript Projects
          </a>
        </Button>
      </div>

      <div className="p-7 flex-2">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
