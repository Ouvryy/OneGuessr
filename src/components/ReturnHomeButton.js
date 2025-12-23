import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSound } from "../context/SoundContext"; 

export default function ReturnHomeButton() {
  const navigate = useNavigate();
  const { playSound } = useSound(); 

  return (
    <button
      onClick={() => {
        playSound('/sounds/sound_effect/button-click-289742.mp3');
        navigate("/");
      }}
      onMouseEnter={() => playSound('/sounds/sound_effect/zipclick.mp3', 0.4)}
      
      className="
        fixed top-4 left-4 z-50
        px-4 py-2 rounded-xl shadow-md font-semibold
        flex items-center gap-2
        border-2 transition-all duration-300 hover:scale-105 
        bg-[#CC213B] border-[#CC213B] text-white
        dark:bg-[#E6B96F] dark:border-[#E6B96F] dark:text-white
      "
    >
      <ArrowLeft size={20} />
    </button>
  );
}