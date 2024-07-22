import Image from "next/image";

import Header from "@/components/header/header";

import alertIcon from "../../public/alertIcon.svg";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="flex flex-1 flex-col w-full h-full justfy-center align-middle">
        <Image src={alertIcon} height={68} width={68} alt="alert icon" />
        <p>Você não tem investigações criadas</p>
        <p>
          Criar uma investigação com o HI SPY é simples. Em alguns passos sua
          investigação estará criada.
        </p>
      </main>
    </div>
  );
}
