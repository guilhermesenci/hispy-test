import Image from "next/image"

const Button = ({ text, img, onclick }) => {
  return (
    <button
      onClick={onclick}
      className="flex w-auto items-center rounded-md text-sm border-none py-2 px-4 bg-[#F8FAFC] text-black cursor-pointer hover:bg-[#9e9d9d] transition-all"
    >
      {img && <Image src={img} width={12} height={12} alt="incon" />}
      <span className={img ? "ml-1" : ""}>
        {text}
      </span>
    </button>
  )
}

export default Button