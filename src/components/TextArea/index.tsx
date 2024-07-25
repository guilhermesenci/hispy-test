import { ChangeEvent, FC } from "react"

interface TextAreaProps {
  label: string,
  infoLabel: string,
  placeholder: string,
  name: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  error?: string
}

const TextArea: FC<TextAreaProps> = ({ label, infoLabel, placeholder, name, value, onChange, error }) => {
  return (
    <div className="flex flex-col w-full gap-[6px]">
      <span className="text-sm">
        {label}
        <span className="text-[#7F8EA3]"> {infoLabel}</span>
      </span>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="text-white resize-none rounded-md bg-[#09090B] p-2 w-full border border-custom-border"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  )
}

export default TextArea