import React from 'react';
import * as S from './styles';

function Card({ nome, gasto, importancia }) {
  return (
    <S.IssueItem>
      <span>{nome}</span>
      <span>{gasto}</span>
      <span>{importancia}</span>
    </S.IssueItem>
  );
}

export default Card;
