import Image from "next/image"

import logo from "../../../public/logo.svg"
import HeaderButton from "./components/headerButton"
import Link from "next/link"

const Header = () => {
  return (
    <div className="flex items-center bg-[#030711] h-[74px] pl-8 border-b-2 border-[#1D283A]">
      <Link href={"/"}>
        <Image src={logo} height={50} width={50} alt="HiSpy logo" />
      </Link>
      <HeaderButton text="Investigações" />
    </div>
  )
}

export default Header