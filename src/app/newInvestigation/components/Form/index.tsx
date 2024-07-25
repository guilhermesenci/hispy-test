"use client"
import React, { FC, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import supabase from '@/lib/supabaseClient';
import successIcon from "@/assets/successIcon.svg"
import copyIcon from "@/assets/copyIcon.svg"
import { InputText, TextArea, Button, Modal } from '@/components';

interface FormData {
  nome: string;
  descricao: string;
  link: string;
}

const validationSchema = Yup.object({
  nome: Yup.string().required('Nome é requerido'),
  link: Yup.string().url('Link deve ser uma URL válida').required('Link de redirecionamento é obrigatório'),
});

const FormComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleSubmit = async (values: FormData, { setSubmitting, resetForm }: FormikHelpers<FormData>) => {
    try {
      const { error } = await supabase
        .from('investigacoes')
        .insert([
          {
            nome: values.nome,
            descricao: values.descricao,
            link: values.link
          }
        ]);

      if (error) {
        throw error;
      }

      setIsModalOpen(true);
      setModalMessage(values.link);
      resetForm();
    } catch (error) {
      console.error('Falha no envio.', error);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(modalMessage);
  };

  return (
    <>
      <Formik
        initialValues={{ nome: "", descricao: "", link: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form className="max-w-md mx-auto flex flex-col gap-5">
            <InputText
              label="Como quer chamar a sua investigação"
              placeholder="Dê um nome a sua invesitgação"
              name="nome"
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.nome ? (errors.nome as string) : undefined}
            />
            <TextArea
              label="Qual o objetivo dessa investigação?"
              infoLabel="(opcional)"
              placeholder="Descreva rapidamente o objetivo dessa investigação"
              name="descricao"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.descricao}
            />
            <InputText
              label="Para onde deseja redirecionar o alvo?"
              placeholder="Escreva o link para redirecionar o alvo"
              footerLabel="Depois de clicar no Link de Captura, o alvo será direcionado para a URL acima."
              name="link"
              value={values.link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.link ? (errors.link as string) : undefined}
            />
            <div className='flex flex-row-reverse pt-5 w-full'>
              <Button
                type='PRIMARY'
                text="Criar investigação"
                disabled={isSubmitting}
              />
            </div>
            {isSubmitting && <p className="mt-4 text-sm">Enviando...</p>}
          </Form>
        )}
      </Formik>
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
            <Button
              type='PRIMARY'
              img={copyIcon}
              text="Copiar link"
              onclick={handleCopy} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormComponent;
