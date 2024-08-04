import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Teste = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Conteúdo longo para rolagem */}
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i} style={styles.scrollText}>
            Item {i + 1}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.fixedElement}>
        <Text style={styles.fixedText}>Elemento Fixo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 20,
    marginVertical: 10,
  },
  fixedElement: {
    position: 'absolute',
    bottom: 20, // distância da parte inferior da tela
    right: 20,  // distância do lado direito da tela
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // garante que o elemento fixo esteja acima de outros
  },
  fixedText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Teste;