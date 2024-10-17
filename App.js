import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [usuarioEscolha, descolhaUser] = useState(null);
  const [appEscolha, descolhaIA] = useState(null);
  const [resultado, dResultado] = useState('');

  const choices = ['Pedra', 'Papel', 'Tesoura'];
  
  // funçao para realizar a jogada
  const jogadaIA = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // calcular o vencedor
  const calculaResultado = (usuario, app) => {
    if (usuario === app) {
      return 'Empate!';
    } else if (
      (usuario === 'Pedra' && app === 'Tesoura') ||
      (usuario === 'Tesoura' && app === 'Papel') ||
      (usuario === 'Papel' && app === 'Pedra')
    ) {
      return 'Você ganhou!';
    } else {
      return 'Você perdeu!';
    }
  };

  // Função para lidar com a escolha do usuário
  const onPressChoice = (escolha) => {
    const jogadaIA2 = jogadaIA();
    descolhaUser(escolha);
    descolhaIA(jogadaIA2);
    const resultadoJogo = calculaResultado(escolha, jogadaIA2);
    dResultado(resultadoJogo);
  };

  // reiniciar o jogo
  const resetarGame = () => {
    descolhaUser(null);
    descolhaIA(null);
    dResultado('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel e Tesoura</Text>

      <View style={styles.choicesContainer}>
        <TouchableOpacity onPress={() => onPressChoice('Pedra')}>
          <Image source={require('./assets/pedra.png')} style={styles.escolhaImagem} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressChoice('Papel')}>
          <Image source={require('./assets/papel.png')} style={styles.escolhaImagem} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressChoice('Tesoura')}>
          <Image source={require('./assets/tesoura.png')} style={styles.escolhaImagem} />
        </TouchableOpacity>
      </View>

      {usuarioEscolha && appEscolha && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultadoTexto}>Você escolheu: {usuarioEscolha}</Text>
          <Text style={styles.resultadoTexto}>O app escolheu: {appEscolha}</Text>
          <Text style={styles.resultadoTexto}>{resultado}</Text>
        </View>
      )}

      <View style={styles.botao}>
        <Button title="Jogar Novamente" onPress={resetarGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  escolhaImagem: {
    width: 100,
    height: 100,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultadoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  botao: {
    marginTop: 30,
  },
});
