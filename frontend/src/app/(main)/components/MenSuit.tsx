"use client";

import React, { useState } from "react";
import { Card } from "./Card";


interface Props {
  isDay: boolean;
  selectedCategory: string;
}

const mockClothes = [
  {
    id: "1",
    name: "Black Tuxedo",
    price: 250,
    about: "Perfect for formal events.",
    image: "/mock/tuxedo.jpg",
    category: "formal",
  },
  {
    id: "2",
    name: "White Polo Shirt",
    price: 40,
    about: "Great for casual wear.",
    image: "/mock/polo.jpg",
    category: "casual",
  },
  {
    id: "3",
    name: "Track Suit",
    price: 70,
    about: "Comfortable for training.",
    image: "/mock/tracksuit.jpg",
    category: "sport",
  },
  {
    id: "4",
    name: "Grey Suit",
    price: 200,
    about: "Elegant and modern.",
    image: "/mock/greysuit.jpg",
    category: "formal",
  },
];

export const MenSuit: React.FC<Props> = ({ isDay, selectedCategory }) => {
  const [selectedClothes, setSelectedClothes] = useState<typeof mockClothes[0] | null>(null);

  const filteredClothes =
    selectedCategory === "all"
      ? mockClothes
      : mockClothes.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full px-6 py-10">
      <p className={`text-[30px] font-semibold mb-6 ${isDay ? "text-black" : "text-white"}`}>
        Men's Clothes
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[36px]">
        {filteredClothes.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            about={item.about}
            isDay={isDay}
            onClick={() => setSelectedClothes(item)}
          />
        ))}
      </div>

      {selectedClothes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
         
        </div>
      )}
    </div>
  );
};
