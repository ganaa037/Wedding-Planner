"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"
import { Carousel } from "../components/Carousel"
import { Card } from "../components/Card"





export default function Home() {
  const [isDay, setIsDay] = useState(true)

  const handleToggleTheme = () => {
    setIsDay((prev) => !prev)
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${isDay ? "bg-[#fefcf6]" : "bg-[#0a0a0f]"}`}>
      <Navigation isDay={isDay} onToggleTheme={handleToggleTheme} />

      <main className="min-h-[80vh] ">
        <Header isDay={isDay} />

     <div className="flex justify-center">
        <div className={`py-10 px-6 transition-colors duration-700  ${isDay ? "text-gray-800" : "text-gray-200"}`}>
         
         
        
           <Carousel isDay={isDay}/>
           <Card image="https://via.placeholder.com/300x382"
          name="Sample Suit"
          price={200}
          about="Elegant black formal wear"
          id="1"
          isDay={isDay} />
        
        </div>
       
        </div>
      
      </main>
    </div>
  )
}
