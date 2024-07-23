"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

import alertIcon from "../../public/alertIcon.svg";
import copyIcon from "../../public/copyIcon.svg";

import NavigationButton from "@/components/navigationButton";
import Card from "@/components/card";
import Modal from "@/components/modal";
import Button from "@/components/button";

const Home = () => {
  const [investigation, setInvestigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value.link);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("investigacoes")
          .select("*");

        if (error) {
          throw error;
        }

        if (data) {
          setInvestigation(data);
        }
      } catch (error) {
        console.error("Erro ao carregar:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex w-full h-[calc(100vh-74px)] items-center justify-center">
        <p>Carregando...</p>
      </main>
    );
  }

  const openModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div>
      {investigation.length < 1 ? (
        <main className="flex w-full h-[calc(100vh-74px)] items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image src={alertIcon} height={68} width={68} alt="alert icon" />
            <p className="text-2xl font-semibold mt-6 mb-3">
              Você não tem investigações criadas
            </p>
            <p className="text-base mb-6">
              Criar uma investigação com o HI SPY é simples. Em alguns passos
              sua investigação estará criada.
            </p>
            <NavigationButton
              destiny="newInvestigation"
              text="Nova investigação"
            />
          </div>
        </main>
      ) : (
        <main className="w-full px-52 mt-10">
          <div className="flex w-full justify-between">
            <span className="text-2xl font-semibold">Ivestigações</span>
            <NavigationButton
              destiny="newInvestigation"
              text="Nova investigação"
            />
          </div>
          <div className="mt-8 flex flex-col gap-4 overflow-y-scroll max-h-[500px] pr-2">
            {investigation.map((item, key) => {
              return <Card key={key} data={item} onOpenModal={openModal} />;
            })}
          </div>
        </main>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedData && (
          <div className="bg-[#030711] py-5 px-6 mt-9 rounded-md shadow-lg border border-custom-border">
            <div className="flex flex-col gap-[6px]">
              <p className="text-base font-bold">Link de captura</p>
              <p className="text-sm">
                Com ele você obterá apenas o IP do alvo. A geolocalização não é
                precisa.
              </p>
            </div>
            <div className="flex gap-2 w-full pt-4">
              <p className="flex-grow border py-[6px] px-3 bg-[#09090B] rounded-md border-custom-border overflow-hidden overflow-ellipsis whitespace-nowrap text-center">
                {selectedData.link}
              </p>
              <Button
                img={copyIcon}
                text="Copiar link"
                onclick={() => handleCopy(selectedData)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
