"use client";
import Link from 'next/link';
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import alertIcon from "@/assets/alertIcon.svg";
import copyIcon from "@/assets/copyIcon.svg";
import plusIcon from "@/assets/plusIcon.svg";
import { getAllInvestigationData, Investigation } from '@/services/getAllInvestigaionData';
import { Card, Modal, Button } from "@/components";
import CardSkeleton from '@/components/SkeletonCard';

const Home: FC = () => {
  const [investigation, setInvestigation] = useState<Investigation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<Investigation | null>(null);

  const handleCopy = (value: Investigation) => {
    if (value) {
      navigator.clipboard.writeText(value.link);
    };
  }

  const fetchData = async () => {
    const data = await getAllInvestigationData();
    setInvestigation(data)
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col px-52 gap-4 w-full h-[calc(100vh-74px)] items-center justify-center">
        <div className="flex w-full justify-between mb-8">
          <span className="text-2xl font-semibold">
            Investigações
          </span>
          <Button
            type="PRIMARY"
            text="Aguarde..."
            disabled={true}
          />
        </div>
        {[...Array(5)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </main>);
  }

  const openModal = (data: Investigation) => {
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
            <Link href="/newInvestigation">
              <Button
                type="PRIMARY"
                text="Nova investigação"
                img={plusIcon}
              />
            </Link>
          </div>
        </main>
      ) : (
        <main className="w-full px-52 mt-10">
          <div className="flex w-full justify-between">
            <span className="text-2xl font-semibold">
              Investigações
            </span>
            <Link href="/newInvestigation">
              <Button
                type="PRIMARY"
                text="Nova investigação"
                img={plusIcon}
              />
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-4 overflow-y-scroll h-[70vh] pr-2">
            {investigation.map((item, key) => {
              return (
                <Card
                  key={key}
                  data={item}
                  handleOpenModal={openModal}
                />
              );
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
                type="PRIMARY"
                text="Copiar link"
                onclick={() => handleCopy(selectedData as Investigation)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
