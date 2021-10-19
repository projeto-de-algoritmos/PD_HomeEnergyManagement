import { useState, useEffect } from 'react';

function useKnapsack(aparelhos, EnergiaMax) {
  const [pontuacao, setPontuacao] = useState(null);

  function max(a, b) {
    return a > b ? a : b;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const knapSackRec = (Max, aparelhos, quantidade, dinamico) => {
    if (quantidade === 0 || Max === 0) return 0;

    if (dinamico[quantidade][Max] !== -1) return dinamico[quantidade][Max];

    if (aparelhos.peso[quantidade - 1] > Max)
      return (dinamico[quantidade][Max] = knapSackRec(Max, aparelhos, quantidade - 1, dinamico));
    else
      return (dinamico[quantidade][Max] = max(
        aparelhos.valor[quantidade - 1] +
          knapSackRec(Max - aparelhos.peso[quantidade - 1], aparelhos, quantidade - 1, dinamico),
        knapSackRec(Max, aparelhos, quantidade - 1, dinamico)
      ));
  };

  const knapSack = () => {
    console.log('TAMANHO: ', aparelhos?.peso?.length, aparelhos);

    let dinamico = new Array(aparelhos.peso.length + 1);
    for (let i = 0; i < dinamico.length; i++) {
      dinamico[i] = new Array(EnergiaMax + 1);
    }

    for (let i = 0; i < aparelhos.peso.length + 1; i++) for (let j = 0; j < EnergiaMax + 1; j++) dinamico[i][j] = -1;

    setPontuacao(knapSackRec(EnergiaMax, aparelhos, aparelhos.peso.length, dinamico));
    console.log('AAA: ', dinamico);
  };

  useEffect(() => {
    if (!aparelhos || aparelhos?.peso?.length === 0 || aparelhos?.valor?.length === 0 || !EnergiaMax) {
      setPontuacao(null);
      return;
    } else knapSack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aparelhos, EnergiaMax]);

  return pontuacao;
}

export default useKnapsack;
