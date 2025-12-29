//

import { ArrowLeft } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";

const AddEquipments = () => {
  const { user } = useContext(AuthContext);
  // console.log(user?.email);

  const [rating, setRating] = useState(0);
  // console.log(rating);

  const handleAddEquipment = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const category = event.target.category.value;
    const price = event.target.price.value;

    const description = event.target.description.value;
    const customization = event.target.customization.value;
    const processingTime = event.target.processingTime.value;
    const quentity = event.target.quentity.value;
    const photo = event.target.photo.value;
    const email = user?.email;
    const equipmentItems = {
      name,
      category,
      price,
      description,
      customization,
      processingTime,
      quentity,
      photo,
      rating,
      email,
    };

    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(equipmentItems),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "success",
            text: "Sports Equipment Added Successfully",
            icon: "success",
          });
        }
        console.log(data);
      });
  };

  return (
    <div>
      <div className="md:w-330 mx-auto mt-40 ">
        {/* .raleway .rancho  */}

        <div className="w-full ">
          <Link
            to="/"
            className="inline-flex  gap-4 items-center mb-12.5 hover:bg-[#D2B48C] py-4 rounded-xl pr-2.5"
          >
            <span className="h-6 w-6">
              <ArrowLeft></ArrowLeft>
            </span>
            <h3 className="text-[#374151] rancho text-3xl ">Back to home</h3>
          </Link>

          <div className="bg-[#F4F3F0] px-2 lg:px-0">
            <div>
              <h2 className="py-16 rancho text-[45px] text-[#374151] text-center">
                Add New Coffee
              </h2>
              <p className="text-center max-w-4xl mx-auto text-[18px] text-[#1B1A1A70] raleway mb-6">
                It is a long established fact that a reader will be distraceted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using Content
                here.
              </p>
            </div>
            <form
              action=""
              onSubmit={handleAddEquipment}
              className="max-w-5xl mx-auto pb-18"
            >
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6 raleway ">
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80] " htmlFor="name">
                    Item Name
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60] raleway"
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Item Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80] " htmlFor="name">
                    category Name
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="text"
                    name="category"
                    id=""
                    placeholder="Enter category Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80]" htmlFor="name">
                    Price
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="text"
                    name="price"
                    id=""
                    placeholder="Enter Price"
                    required
                  />
                </div>

                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80]" htmlFor="name">
                    Customization
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="text"
                    name="customization"
                    id=""
                    placeholder="Bat With Extra Grip, Hit Paper Etc"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80]" htmlFor="name">
                    Description
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="text"
                    name="description"
                    id=""
                    placeholder="Enter Description"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80]" htmlFor="name">
                    processing Time
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="number"
                    name="processingTime"
                    id=""
                    placeholder="Enter Processing Time"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <label className="text-xl text-[#1B1A1A80]" htmlFor="name">
                    Stock Status
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]"
                    type="number"
                    name="quentity"
                    id=""
                    placeholder="Enter Avilable Product Quentity"
                    required
                  />
                </div>
                <div className="flex flex-col gap-4 ">
                  <h5 className="text-xl text-[#1B1A1A80]">Rating</h5>
                  <div className="p-3  rounded-sm bg-[#FFFFFF] text-[#1B1A1A60]">
                    {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                      <span
                        key={star}
                        style={{
                          cursor: "pointer",
                          color: star <= rating ? "gold" : "gray",
                        }}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-4 mt-6 ">
                  <label
                    className="text-xl text-[#1B1A1A80] raleway"
                    htmlFor="name"
                  >
                    Photo
                  </label>

                  <input
                    className="p-3 rounded-sm bg-[#FFFFFF] text-[#1B1A1A60] raleway"
                    type="text"
                    name="photo"
                    id=""
                    placeholder="Enter photo URL"
                    required
                  />

                  <input
                    className="rancho text-2xl text-[#331A15] bg-[#D2B48C] py-3.25 rounded-sm"
                    type="submit"
                    value="Add Equipment Cart"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEquipments;
