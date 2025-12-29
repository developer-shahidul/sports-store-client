import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Eye, Heart, Pen, Trash } from "lucide-react";

const MyEquipList = () => {
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  // console.log(items);

  const [hert, setHert] = useState(false);

  // console.log(typeof hert);

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
        if (data.liked) {
          setHert(data.liked);
        }
        console.log(data);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:3000/items/user/${encodeURIComponent(user.email)}`
      )
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.log(err));
    }
  }, [user]); // user change হলে fetch হবে

  // Error page dekhanur jonno
  const navigate = useNavigate();

  const handleDelete = (id) => {
    // console.log("delete", id);
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
            const remaining = items.filter((deletId) => deletId._id !== id);
            setItems(remaining);

            navigate("/error", { replace: true }); // ✅ redirect to error page
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className="max-w-330 mx-auto px-2 lg:px-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-40">
      {items.map((item) => (
        <div key={item._id}>
          <div className="rounded-xl w-67.5 relative z-10 text-center justify-self-center ">
            <div className="absolute right-1 top-8">
              <Link to={`/details/${item._id}`}>
                <button className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2">
                  <Eye></Eye>
                </button>
              </Link>
              <Link to={`/update/${item._id}`}>
                <button className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2">
                  <Pen></Pen>
                </button>
              </Link>

              <button
                onClick={() => handleDelete(item._id)}
                className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center mb-2 cursor-pointer "
              >
                <Trash></Trash>
              </button>

              <p>{item.likes}</p>

              <button
                onClick={() => handleHertCount(item._id)}
                className="h-8.5 w-8.5 bg-white text-black rounded-full flex justify-center items-center cursor-pointer"
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
                    className="h-full w-full object-fill "
                    src={item.photo}
                    alt="product img"
                  />
                </div>
              </div>
              <Link to={`/equipmetList/${item._id}`}>
                <button className="px-4 py-2 w-full  text-center bg-[#000000] text-white   ">
                  Add to Cart
                </button>
              </Link>
            </div>
            <div className="text-left">
              <h4 className="text-base font-medium raleway mb-2">
                {item.name}
              </h4>
              <div className=" rancho text-base font-medium flex gap-3">
                <p className="text-[#DB4444]">
                  <span>$</span>
                  {item.price}
                </p>
                <p className="text-black/50 line-through">
                  <span>$</span>
                  <span> {item.price}</span>
                </p>
              </div>
              <div>
                {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                  <span
                    key={star}
                    style={{
                      cursor: "pointer",
                      fontSize: 25,
                      color: star <= rating ? "gold" : "gray",
                    }}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
                <span className="text-xl">({item.quentity})</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEquipList;
