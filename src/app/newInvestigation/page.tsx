import FormComponent from "./components/Form"

const NewInvestigation = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto h-[calc(100vh-74px)] justify-center">
      <span className="mb-8 start text-2xl font-semibold">
        Nova investigação
      </span>
      <FormComponent />
    </div>
  )
}

export default NewInvestigation