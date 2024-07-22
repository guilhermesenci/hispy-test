import "@/app/globals.css"

const HeaderButton = ({text = "Example"}) => {
  return (
    <div className="flex items-center h-full w-fit ml-8 relative header-container">
      <span
        className="font-bold text-sm text-selected"
        tabIndex="0"
      >
        {text}
      </span>
      <div className="border-bottom"></div>
    </div>
  )
}

export default HeaderButton