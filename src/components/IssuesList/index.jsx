import React from 'react';
import IssueItem from '../IssueItem';
import * as S from './styles';

function List({ aparelhos, deleteIssueCallback, percent = false }) {
  return (
    <S.ListContainer>
      <S.Header>
        <span>Nome</span>
        <span>Gasto Mensal</span>
        <span>#</span>
      </S.Header>
      <S.List>
        {aparelhos.nome.map((item, i) => (
          <IssueItem
            key={item.nome}
            nome={aparelhos.nome[i]}
            gasto={aparelhos.peso[i]}
            importancia={aparelhos.valor[i]}
          />
        ))}
      </S.List>
    </S.ListContainer>
  );
}

export default List;
