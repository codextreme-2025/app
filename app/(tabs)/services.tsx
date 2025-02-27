import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'

 // Add helper function for random colors
 const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const getDescription = (text : string) => {
  switch (text) {
    case "Registrar":
      return "Registrar services"
    case "Finance":
      return "Finance services"
    case "Administration":
      return "Administration services"
    case "Wellness":
      return "Wellness services"
    default:
      return "No description available"
  }
}

const boxes = ["Registrar", "Finance", "Administration", "Wellness"];

export default class services extends Component {
   
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Available Campus Services</Text>

      {/* Flex row container */}
      <View style={styles.row}>
        {boxes.map((text, index) => (
          <View 
            key={index} 
            style={[styles.box]}
          >
            <Text style={styles.text}>{text}</Text>
            {/* small description */}
            <Text style={styles.textLg}>{getDescription(text)}</Text>
          </View>
        ))}
      </View>   
  

      <View style={styles.bottomSearchContainer}>
        <TextInput
          style={styles.bottomSearchInput}
          placeholder="Werekeje he?"
          placeholderTextColor="#666"
        />
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    width: '100%',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  box: {
    width:'100%',
    height: 80,
    padding: 20, 
    borderRadius: 10, 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    borderWidth: 1, 
    borderColor: '#e5e7eb',
    backgroundColor: '#cbd5e1',
    opacity: 0.4,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  textLg: {
    fontSize: 12,
  },
  searchContainer: {
    width: '100%',
    padding: 10,
    marginTop: 20,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bottomSearchContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bottomSearchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});

