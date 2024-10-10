import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [appChoice, setAppChoice] = useState(null);
  const [result, setResult] = useState('');

  const choices = ['Pedra', 'Papel', 'Tesoura'];
  
  // Função para realizar a jogada do app
  const getAppChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  // Função para calcular o vencedor
  const calculateResult = (user, app) => {
    if (user === app) {
      return 'Empate!';
    } else if (
      (user === 'Pedra' && app === 'Tesoura') ||
      (user === 'Tesoura' && app === 'Papel') ||
      (user === 'Papel' && app === 'Pedra')
    ) {
      return 'Você ganhou!';
    } else {
      return 'Você perdeu!';
    }
  };

  // Função para lidar com a escolha do usuário
  const onPressChoice = (choice) => {
    const appMove = getAppChoice();
    setUserChoice(choice);
    setAppChoice(appMove);
    const gameResult = calculateResult(choice, appMove);
    setResult(gameResult);
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    setUserChoice(null);
    setAppChoice(null);
    setResult('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel e Tesoura</Text>

      <View style={styles.choicesContainer}>
        <TouchableOpacity onPress={() => onPressChoice('Pedra')}>
          <Image source={require('./assets/pedra.png')} style={styles.choiceImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressChoice('Papel')}>
          <Image source={require('./assets/papel.png')} style={styles.choiceImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressChoice('Tesoura')}>
          <Image source={require('./assets/tesoura.png')} style={styles.choiceImage} />
        </TouchableOpacity>
      </View>

      {userChoice && appChoice && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Você escolheu: {userChoice}</Text>
          <Text style={styles.resultText}>O app escolheu: {appChoice}</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Jogar Novamente" onPress={resetGame} />
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
  choiceImage: {
    width: 100,
    height: 100,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
