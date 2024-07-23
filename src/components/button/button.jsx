import Image from "next/image"

import plusIcon from "../../../public/plusIcon.svg"

const Button = ({ text = "Example" }) => {
  return (
    <button className="bg-transparent border-none text-black cursor-pointer">
      <div className="flex gap-1 bg-[#F8FAFC] p-2 text-black rounded-md text-sm">
        <Image src={plusIcon} width={14} height={14} alt="Plus icon" />
        <span>
          {text}
        </span>
      </div>
    </button>
  )
}

export default Button