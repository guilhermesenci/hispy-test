const InputText = ({ label = "example", placeholder, footerLabel, name, value, onChange, error }) => {
  return (
    <div className="flex flex-col w-full gap-[6px]">
      <span className="text-sm">{label}</span>
      <input
        className="text-white rounded-md bg-[#09090B] p-2 w-full border border-custom-border"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <span className="text-xs text-[#A1A1AA]">{footerLabel}</span>
    </div>
  )
}

export default InputText