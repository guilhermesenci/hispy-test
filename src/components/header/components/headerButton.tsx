import "@/app/globals.css"
import { FC } from "react";

interface HeaderButtonProps {
  text: string;
}

const HeaderButton: FC<HeaderButtonProps> = ({ text }) => {
  return (
    <div className="flex items-center h-full w-fit ml-8 relative header-container">
      <span
        className="font-bold text-sm text-selected"
        tabIndex={0}
      >
        {text}
      </span>
      <div className="border-bottom" />
    </div>
  )
}

export default HeaderButton