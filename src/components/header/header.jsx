import Image from "next/image"

import logo from "../../../public/logo.svg"
import HeaderButton from "./components/headerButton"

const Header = () => {
  return (
    <div className="flex items-center bg-[#030711] h-[74px] pl-8 border-b-2 border-[#1D283A]">
      <Image src={logo} height={50} width={50} alt="HiSpy logo" />
      <HeaderButton text="Investigações" />
    </div>
  )
}

export default Header