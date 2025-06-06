import React from "react";
import { Plus } from "lucide-react";


interface CardProps {
  image: string;
  name: string;
  price: number;
  ingredients: string;
  id: string;
  onClick?: () => void;
}

export const Cards: React.FC<CardProps> = ({
  image,
  name,
  price,
  ingredients,
  onClick,
}) => {
  return (
    <div className="h-[350px] w-[250px] bg-black">
      <div className="flex flex-col p-[16px] gap-[14px]">
        <div className="relative">
          <img
            src={image}
            className="w-full h-[210px] object-cover rounded-[10px]"
            alt={name}
          />
          <button
            className="w-[44px] right-5 bottom-5 h-[44px] flex hover:bg-gray-200 transition bg-white items-center justify-center rounded-full absolute"
            onClick={onClick}
          >
            <Plus className="text-[#ef4444] w-[16px] h-[16px]" />
          </button>
        </div>
        <div className="flex flex-col gap-[3px]">
          <div className="flex justify-between items-center">
            <a className="text-[20px] font-[600] text-[#EF4444]">{name}</a>
            <a className="text-[18px] font-[600] text-black">${price}</a>
          </div>
          <a className="text-[13px] font-[400] text-black">{ingredients}</a>
        </div>
      </div>
    </div>
  );
};
