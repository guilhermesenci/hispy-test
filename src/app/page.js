import Image from "next/image";

import Header from "@/components/header/header";

import alertIcon from "../../public/alertIcon.svg";
import Button from "@/components/button/button";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex w-full h-[calc(100vh-74px)] items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={alertIcon} height={68} width={68} alt="alert icon" />
          <p className="text-2xl font-semibold mt-6 mb-3">Você não tem investigações criadas</p>
          <p className="text-base mb-6">
            Criar uma investigação com o HI SPY é simples. Em alguns passos sua
            investigação estará criada.
          </p>
          <Button text="Nova investigação" />
        </div>
      </main>
    </div>
  );
}
