"use client"
import React, { useState } from 'react';
import Image from 'next/image';

import supabase from '../../../../lib/supabaseClient';

import InputText from '@/components/inputText';
import TextArea from '@/components/textArea';
import Button from '@/components/button';
import Modal from '@/components/modal';

import successIcon from "../../../../../public/successIcon.svg"
import copyIcon from "../../../../../public/copyIcon.svg"

const Form = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    link: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nome) errors.name = 'Nome é requerido';
    if (!formData.link) errors.message = 'Link de redirecionamento é obrigatório';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('Enviando...');
    try {
      const { data, error } = await supabase
        .from('investigacoes')
        .insert([
          { nome: formData.nome, descricao: formData.descricao, link: formData.link }
        ]);

      if (error) {
        throw error
      };

      setIsModalOpen(true);
      setFormStatus("")
      setModalMessage(formData.link)
      setFormData({
        nome: '',
        descricao: '',
        link: '',
      });
    } catch (error) {
      setFormStatus('Falha no envio.');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(modalMessage);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-5">
        <InputText
          label="Como quer chamar a sua investigação"
          placeholder="Dê um nome a sua invesitgação"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          error={formErrors.nome}
        />
        <TextArea
          label="Qual o objetivo dessa investigação?"
          infoLabel="(opcional)"
          placeholder="Descreva rapidamente o objetivo dessa investigação"
          name="descricao"
          onChange={handleChange}
          value={formData.descricao}
        />
        <InputText
          label="Como quer chamar a sua investigação"
          placeholder="Dê um nome a sua invesitgação"
          footerLabel="Depois de clicar no Link de Captura, o alvo será direcionado para a URL acima."
          name="link"
          value={formData.link}
          onChange={handleChange}
          error={formErrors.link}
        />
        <div className='flex flex-row-reverse pt-5 w-full'>
          <Button text="Criar investigação" />
        </div>
        {formStatus && <p className="mt-4 text-sm">{formStatus}</p>}
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <Image src={successIcon} height={68} width={68} alt="Success icon" className='mx-auto mb-6' />
        <div className="text-center mb-10">
          <p className="text-2xl font-semibold mb-3">Investigação criada com sucesso!</p>
          <p className="mt-2 font-normal text-base">Copie o link e envie para o seu alvo.</p>
        </div>
        <div className="bg-[#030711] py-5 px-6 mt-9 rounded-md shadow-lg border border-custom-border">
          <div className='flex flex-col gap-[6px]'>
            <p className='text-base font-bold'>
              Link de captura
            </p>
            <p className='text-sm'>
              Com ele você obterá apenas o IP do alvo. A geolocalização não é precisa.
            </p>
          </div>
          <div className='flex gap-2 w-full pt-4'>
            <p className='flex-grow border py-[6px] px-3 bg-[#09090B] rounded-md border-custom-border overflow-hidden overflow-ellipsis whitespace-nowrap text-center'>
              {modalMessage}
            </p>
            <Button img={copyIcon} text="Copiar link" onclick={handleCopy} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Form;
