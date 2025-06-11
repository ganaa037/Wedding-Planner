import React from "react";
import { Plus } from "lucide-react";

interface CardProps {
  image: string;
  name: string;
  price: number;
  about: string;
  id: string;
  isDay: boolean;
}

export const Card: React.FC<CardProps> = ({
  image,
  name,
  price,
  about,
  id,
  isDay,
}) => {
  return (
    <div
      className={`h-[500px] w-[300px] rounded-[20px] ${
        isDay ? "bg-white" : "bg-gray-800"
      } shadow-md overflow-hidden transition-colors duration-300`}
    >
      <div className="relative h-[400px]">
        <img src={image} className="w-full h-full object-cover" alt={name} />
        <button className="w-[44px] h-[44px] flex items-center justify-center rounded-full absolute right-5 bottom-5 bg-white hover:bg-gray-200 transition">
          <Plus
            className={`w-[16px] h-[16px] ${
              isDay ? "text-yellow-400" : "text-purple-400"
            }`}
          />
        </button>
      </div>
      <div className="flex flex-col px-[20px] gap-[2px] py-[10px]">
        <div className="flex justify-between items-center">
          <span className={`text-[20px] font-semibold ${isDay ? "text-black" : "text-white"}`}>
            {name}
          </span>
          <span className={`text-[18px] font-semibold ${isDay ? "text-black" : "text-white"}`}>
            ${price}
          </span>
        </div>
        <p className={`text-[13px] font-normal ${isDay ? "text-black" : "text-white"}`}>
          {about}
        </p>
      </div>
    </div>
  );
};
