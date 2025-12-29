import { ArrowLeft } from "lucide-react";
import { useLoaderData, Link } from "react-router";
import { useState } from "react";

const Details = () => {
  const detailsData = useLoaderData() || {};
  const {
    _id,
    name,
    category,
    price,
    description,
    customization,
    processingTime,
    quentity,
    photo,
    rating: loadedRating,
    reviewCount = 150, // default value
  } = detailsData;

  const [rating, setRating] = useState(loadedRating || 4);

  const inStock = quentity > 0;

  return (
    <div className="max-w-5xl mx-auto mt-20 px-4 md:px-0">
      {/* Back Button */}
      <Link to="/equipments">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6">
          <ArrowLeft size={20} /> Back to Equipments
        </button>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <img
            src={photo}
            alt={name}
            className="rounded-xl object-cover max-h-96"
          />
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-semibold">
            Free Delivery
          </span>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
          </div>

          {/* Rating, Review & Stock */}
          <div className="flex items-center gap-3 mt-1">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            {/* Review Count */}
            <span className="text-gray-500 text-sm">
              ({reviewCount} Reviews)
            </span>
            {/* In Stock */}
            <span
              className={`text-sm font-semibold ${
                inStock ? "text-green-500" : "text-red-500"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <p className="text-gray-500 text-sm">{category}</p>
          <p className="text-xl font-semibold text-gray-800">${price}</p>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-1">Description</h4>
            <p className="text-gray-600">{description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-1">Customization</h4>
            <p className="text-gray-600">{customization}</p>
          </div>

          <div className="flex gap-4 text-gray-600 mt-2">
            <p>Quantity: {quentity}</p>
            <p>Processing Time: {processingTime} days</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Buy Now
            </button>
            <Link to={`/equipmetList/${_id}`}>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
