import Image from "next/image"
import { buttonVariants } from './buttonVariants';
import { FC, MouseEventHandler } from "react"

interface Button {
  text: string;
  type: 'PRIMARY' | 'SECONDARY';
  img?: string;
  onclick?: MouseEventHandler<HTMLButtonElement> | (() => void);
  disabled?: boolean;
}

const Button: FC<Button> = ({ text, img, onclick, disabled, type = 'PRIMARY' }) => {
  const variantClasses = buttonVariants({ type });

  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={variantClasses}
    >
      {img && <Image src={img} width={12} height={12} alt="incon" />}
      <span className={img ? "ml-1" : ""}>
        {text}
      </span>
    </button>
  )
}

export default Button