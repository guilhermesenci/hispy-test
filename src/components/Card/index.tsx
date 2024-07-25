import Image from "next/image"
import { FC } from "react"
import cardIcon from "@/assets/cardIcon.svg"
import shareIcon from "@/assets/shareIcon.svg"

interface Investigation {
  id: number;
  nome: string;
  descricao: string;
  link: string;
  created_at: string;
}

interface CardProps {
  data: Investigation;
  handleOpenModal: (data: Investigation) => void;
}

const Card: FC<CardProps> = ({ data, handleOpenModal }) => {

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex border border-custom-border first:rounded-t-md last:rounded-b-md bg-[#030711] p-5 justify-between">
      <div className="flex">
        <div className="flex w-[400px] overflow-hidden">
          <Image src={cardIcon} width={40} height={40} alt="icon status" />
          <div className="ml-4">
            <p className="text-base font-semibold">
              {data.nome}
            </p>
            <span className="text-sm font-normal text-[#7F8EA3]">
              0 acessos
            </span>
          </div>
          <div>
            <span className="bg-[#166534] px-2 w-fit rounded-3xl text-[#BBF7D0] text-xs ml-6">
              Ativa
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[12px] font-normal text-[#7F8EA3]">
            criada em :
          </span>
          <span className="text-[12px] font-normal text-[#7F8EA3]">
            {formatDate(data.created_at)}
          </span>
        </div>
      </div>
      <div
        onClick={() => handleOpenModal(data)}
        className={`
          flex 
          bg-[#0F1629] 
          py-3 
          px-4 
          gap-1 
          rounded-md 
          shadow-lg border 
          border-custom-border 
          hover:bg-[#7F8EA3] 
          transition-all
          cursor-pointer
          `}
      >
        <Image src={shareIcon} width={16} height={16} alt="icone de compartilhamento" />
        <button
          className="text-sm font-normal text-[#E1E7EF]"
        >
          Link de captura
        </button>
      </div>
    </div>
  )
}

export default Card