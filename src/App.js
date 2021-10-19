import Button from './components/Button';
import Input from './components/Input';
import List from './components/IssuesList';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as S from './styles/styles';
import useKnapsack from './hooks/useKnapsack';

function App() {
  const [aparelhos, setAparelhos] = useState({ peso: [], valor: [], nome: [] });
  const [energiaMax, setEnergiaMax] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const pontuacao = useKnapsack(aparelhos, energiaMax);

  console.log(pontuacao);

  // { peso: [], valor: []}

  function onSubmit({ peso, valor, nome }) {
    setAparelhos({
      peso: [...aparelhos?.peso, parseInt(peso, 10)],
      valor: [...aparelhos.valor, parseInt(valor, 10)],
      nome: [...aparelhos.nome, nome],
    });
    reset({ energiaMax });
  }

  return (
    <S.MainContainer>
      <S.Content>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register('nome', {
              // validate: (value) => !aparelhos.some((item) => item.nome === value) || 'Aparelho já existe!',
              required: 'Campo obrigatório!',
            })}
            placeholder="Nome"
            label="Nome"
            type="text"
            error={errors.nome}
            autoComplete="off"
          />

          <Input
            register={register('peso', {
              validate: (value) => value > 0 || 'Gasto Mensal inválido!',
              required: 'Campo obrigatório!',
            })}
            placeholder="Gasto Mensal"
            label="Gasto Mensal"
            type="number"
            step="any"
            error={errors.peso}
          />

          <Input
            register={register('valor', {
              validate: (value) => value > 0 || 'Valor inválido!',
              required: 'Campo obrigatório!',
            })}
            placeholder="Importancia"
            label="Importancia"
            type="number"
            step="any"
            error={errors.importancia}
          />

          <Button>Adicionar</Button>

          <Input
            register={register('energiaMax', {
              validate: (value) => value > 0 || 'Valor inválido!',
            })}
            onChange={({ target: { value } }) => setEnergiaMax(parseInt(value, 10))}
            placeholder="Energia Max"
            label="Energia Max"
            type="number"
            step="any"
            error={errors.energiaMax}
          />
        </S.Form>

        <List aparelhos={aparelhos} deleteIssueCallback={setAparelhos} />

        {/* <List aparelhos={selecionadas} deleteIssueCallback={setAparelhos} percent /> */}
        <div>
          <h2>Pontuação maxima obtida</h2>
          <p>{pontuacao === null ? 'Insira seus aparelhos' : pontuacao}</p>
        </div>
      </S.Content>
    </S.MainContainer>
  );
}

export default App;
