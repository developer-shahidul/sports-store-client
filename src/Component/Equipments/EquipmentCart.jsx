//

import { Eye, Heart, Pen, Pointer, Trash } from "lucide-react";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";

const EquipmentCart = ({ equipment, equipments, setEquipments }) => {
  const [rating, setRating] = useState(false);
  const { _id, name, price, photo, quentity, likes } = equipment;
  const { user } = useContext(AuthContext);
  // console.log(user);

  // HertCount

  const [hert, setHert] = useState(() => {
    if (user?.email && Array.isArray(equipment.likedBy)) {
      return equipment.likedBy.includes(user.email);
    }
    return false;
  });

  // bar bar load hole check korar jonno

  const handleHertCount = (id) => {
    if (!user?.email) {
      return Swal.fire("pleace login first");
    }
    const body = { email: user.email };

    fetch(`http://localhost:3000/items/like/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setHert(data.liked);
        console.log(data);
      });
  };
  // console.log(hert);

  //   console.log(equipment);

  // Error page dekhanur jonno
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // console.log("delete", id);
    if (!user?.email) {
      return Swal.fire("pleace login first");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/items/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remaining = equipments.filter(
              (deletId) => deletId._id !== _id
            );
            setEquipments(remaining);

            navigate("/login", { replace: true }); // ✅ redirect to error page
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div className="rounded-xl w-67.5 relative z-10 text-center justify-self-center">
      <div className="absolute right-1 top-8">
        <Link to={`/details/${_id}`}>
          <button className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2">
            <Eye></Eye>
          </button>
        </Link>
        <Link to={`/update/${_id}`}>
          <button className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2">
            <Pen></Pen>
          </button>
        </Link>

        <button
          onClick={() => handleDelete(_id)}
          className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2 cursor-pointer "
        >
          <Trash></Trash>
        </button>
        {/* {hert.likes} */}
        <p>{likes}</p>
        <button
          onClick={() => handleHertCount(_id)}
          className="h-8.5 w-8.5  bg-white text-black rounded-full flex justify-center items-center cursor-pointer"
        >
          <Heart
            className={`${hert > 0 ? "fill-red-500" : "fill-none"}`}
          ></Heart>
        </button>
      </div>
      <div className="bg-[#F5F5F5]   rounded-xl mb-6 overflow-hidden">
        <div className=" py-8.75   px-10 rounded-xl">
          <div className="w-47.5 h-45">
            <img
              className="h-full w-full object-contain"
              src={photo}
              alt="product img"
            />
          </div>
        </div>

        <Link to={`/equipmetList/${_id}`}>
          <button className="px-4 py-2 w-full  text-center bg-[#000000] text-white">
            Add to Cart
          </button>
        </Link>
      </div>
      <div className="text-left">
        <h4 className="text-base font-medium raleway mb-2">{name}</h4>
        <div className=" rancho text-base font-medium flex gap-3">
          <p className="text-[#DB4444]">
            <span>$</span>
            {price}
          </p>
          <p className="text-black/50 line-through">
            <span>$</span>
            <span> {price}</span>
          </p>
        </div>
        <div>
          {[1, 2, 3, 4, 5, 6, 7].map((star) => (
            <span
              key={star}
              style={{
                cursor: Pointer,
                fontSize: 25,
                color: star <= rating ? "gold" : "gray",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
          <span className="text-xl">({quentity})</span>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCart;
