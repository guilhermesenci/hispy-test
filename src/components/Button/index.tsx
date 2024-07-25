import Image from "next/image"
import { FC } from "react"

interface Button {
  text: string;
  img?: string;
  onclick?: () => void;
  disabled?: boolean;
}

const Button: FC<Button> = ({ text, img, onclick, disabled }) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`
        flex 
        w-auto 
        items-center 
        rounded-md 
        text-sm 
        border-none 
        py-2 px-4 
        bg-[#F8FAFC] 
        text-black cursor-pointer 
        hover:bg-[#9e9d9d] 
        transition-all
        `}
    >
      {img && <Image src={img} width={12} height={12} alt="incon" />}
      <span className={img ? "ml-1" : ""}>
        {text}
      </span>
    </button>
  )
}

export default Button