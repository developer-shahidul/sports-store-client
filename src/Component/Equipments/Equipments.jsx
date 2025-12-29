////
import { Link, useLoaderData } from "react-router";
import { ArrowUpDown, ShoppingCart } from "lucide-react";
import { useState } from "react";
import EquipmentCart from "./EquipmentCart";
// { equipmentData }equipmentData
const Equipments = () => {
  const useLoadE = useLoaderData();

  const [equipments, setEquipments] = useState(useLoadE);
  const [sort, setSort] = useState(false);
  // console.log(equipments);

  const handleSortName = () => {
    const sorted = [...equipments].sort((a, b) => a.name.localeCompare(b.name));
    setEquipments(sorted);
    setSort(false);
  };
  const handleSortPrice = () => {
    const sorted = [...equipments].sort((a, b) => a.price - b.price);
    setEquipments(sorted);
    setSort(false);
  };

  return (
    <div>
      <div className="mt-40  md:w-full ">
        <div className="max-w-330 mx-auto text-center">
          <div className="mb-12">
            <h6 className="text-xl raleway text-[#1B1A1A] mb-2">
              --- Sip & Savor ---
            </h6>
            <h2 className="rancho text-[55px]  text-[#331A15] mb-4">
              Our Popular Products
            </h2>
            <Link to="/addEquipments">
              <button className="px-5.5 py-2.25 bg-[#F5F4F1] border-2 hover:bg-[#E3B577] inline-flex items-center gap-2.5 flex-row rounded-[5px]">
                <span className="rancho text-2xl text-white ">
                  Add Equipment
                </span>
                <ShoppingCart />
              </button>
            </Link>

            <div className="text-right relative" onClick={() => setSort(!sort)}>
              <div className="hover:bg-gray-300 p-4 inline-flex rounded-xl">
                {sort ? <ArrowUpDown /> : <ArrowUpDown></ArrowUpDown>}
              </div>
              <ul
                className={` absolute top-14 right-0  bg-gray-300 text-left p-2 z-20  rounded-md ${
                  sort ? "flex flex-col" : "hidden"
                }`}
              >
                <li
                  onClick={handleSortName}
                  className=" hover:bg-[#F5F5F5] p-1 rounded-sm"
                >
                  sort by name
                </li>
                <li
                  onClick={handleSortPrice}
                  className=" hover:bg-[#F5F5F5] p-1 rounded-sm"
                >
                  sort by price
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-2 lg:px-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
            {equipments?.map((equipment) => (
              <EquipmentCart
                equipment={equipment}
                equipments={equipments}
                setEquipments={setEquipments}
                key={equipment._id}
              ></EquipmentCart>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipments;
