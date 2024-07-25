import { tv } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex w-auto items-center rounded-md text-sm transition-all',
  variants: {
    type: {
      PRIMARY: 'bg-[#F8FAFC] text-black py-2 px-4 border-none hover:bg-[#9e9d9d]',
      SECONDARY: 'bg-[#0F1629] py-3 px-4 gap-1 shadow-lg border border-custom-border hover:bg-[#7F8EA3]',
    },
  },
  defaultVariants: {
    type: 'PRIMARY',
  },
});
