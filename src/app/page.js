"use client"
import Image from "next/image";
import { useEffect } from 'react';
import supabase from '../lib/supabaseClient';

import alertIcon from "../../public/alertIcon.svg";

import NavigationButton from "@/components/navigationButton";

const investigações = [];

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('investigacoes')
        .select('*');

      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Data:', data);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <main className="flex w-full h-[calc(100vh-74px)] items-center justify-center">
        {investigações ? (
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
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Home;
