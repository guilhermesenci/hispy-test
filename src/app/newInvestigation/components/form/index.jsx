"use client"
import React, { useState } from 'react';

import supabase from '../../../../lib/supabaseClient';

import InputText from '@/components/inputText';
import TextArea from '@/components/textArea';
import Button from '@/components/button';
import Modal from '@/components/modal';

const Form = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    link: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('');

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

      if (error) { throw error };

      setFormStatus('Enviado com sucesso!');
      setFormData({
        nome: '',
        descricao: '',
        link: '',
      });
    } catch (error) {
      setFormStatus('Falha no envio.');
    }
  };

  return (
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
  );
};

export default Form;
