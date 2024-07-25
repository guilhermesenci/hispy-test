"use client";
import Image from "next/image"
import { useRouter } from 'next/navigation';

import plusIcon from "@/assets/plusIcon.svg"
import { FC } from "react";

interface NavigationButtonProps {
  text: string,
  destiny: string
}

const NavigationButton: FC<NavigationButtonProps> = ({ text, destiny }) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(destiny);
  };

  return (
    <button
      onClick={handleNavigation}
      className="bg-transparent border-none text-black cursor-pointer">
      <div className="flex gap-1 bg-[#F8FAFC] p-2 text-black rounded-md text-sm hover:bg-[#9e9d9d] transition-all">
        <Image src={plusIcon} width={14} height={14} alt="Plus icon" />
        <span>
          {text}
        </span>
      </div>
    </button>
  )
}

export default NavigationButton