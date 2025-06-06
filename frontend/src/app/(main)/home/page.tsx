"use client"

import { useState } from "react"
import Navigation from "../components/Navigation"
import Header from "../components/Header"
import { Carousel } from "../components/Carousel"





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
        
        </div>
       
        </div>
      
      </main>
    </div>
  )
}
