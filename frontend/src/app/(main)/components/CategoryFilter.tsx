"use client";
import React from "react";

const mockCategories = [
  { name: "All", categoryId: "all" },
  { name: "Formal", categoryId: "formal" },
  { name: "Casual", categoryId: "casual" },
  { name: "Sport", categoryId: "sport" },
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col pt-[32px] px-[48px]">
      <p className="text-[30px] text-white font-[600] pl-[40px] pb-[36px]">
        Categories
      </p>
      <div className="flex gap-[8px] flex-wrap">
        {mockCategories.map((category) => (
          <button
            key={category.categoryId}
            onClick={() => onSelectCategory(category.categoryId)}
            className={`flex h-[34px] justify-center items-center bg-white rounded-full text-[15px] font-[400] px-[20px] hover:bg-[#EF4444] hover:text-white transition ${
              selectedCategory === category.categoryId
                ? "bg-[#EF4444] text-white"
                : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
