import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

type FormValues = {
  firstName: String;
  lastName: String;
  cpf: String;
  email: String;
  phone: Number;
  cep: String;
  address: String;
  addressNumber: String;
  complement?: String;
  neighborhood: String;
  city: String;
  state: String;
  country: String;
}

const App = ({}: AppProps) => {
  const { register, handleSubmit, setValue, setFocus} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  const checkCEP = (event: { target: { value: any; }; }) => {

    const cep = event.target.value?.replace(/[^0-9]/g, '');
    console.log(cep);

    if (cep?.length !== 8) {
      alert('CEP errado! Digite novamente');
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      setValue('address', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.uf);
      setFocus('addressNumber');
    });
  };

  return (
    <div className='App'>
      <h1>Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Nome</label>
        <input {...register('firstName')} />
        <label>Sobrenome</label>
        <input {...register('lastName')} />
        <label>CPF</label>
        <input {...register('cpf')}  />
        <label>E-mail</label>
        <input {...register('email')} />
        <label>Telefone</label>
        <input {...register('phone')} />
        <label>CEP</label>
        <input {...register('cep')} onBlur={checkCEP}/>
        <label>Endereço</label>
        <input {...register('address')} />
        <label>Número</label>
        <input {...register('addressNumber')} />
        <label>Complemento</label>
        <input {...register('complement')} />
        <label>Bairro</label>
        <input {...register('neighborhood')} />
        <label>Cidade</label>
        <input {...register('city')} />
        <label>Estado</label>
        <input {...register('state')} />
        <label>País</label>
        <input { ...register('country') } />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default App;
