import { Link } from "react-router";
import img404 from "../../404/404.gif";
import { ArrowLeft } from "lucide-react";
const Error = () => {
  return (
    <div className="lg:px-41.25">
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex  gap-4 items-center my-12.5 hover:bg-[#D2B48C] py-4 rounded-xl pr-2.5"
        >
          <span className="h-6 w-6">
            <ArrowLeft></ArrowLeft>
          </span>
          <h3 className="text-[#374151] rancho text-3xl ">Back to home</h3>
        </Link>
      </div>
      <div>
        <img className="w-full md:h-202" src={img404} alt="404-img" />
      </div>
    </div>
  );
};

export default Error;
