import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function TabOneScreen() {
  // Add helper function for random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Create array of numbers for boxes
  const boxes = ["My Classes", "Dining halls", "Study Spaces", "Campus Service"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Navigate</Text>

      {/* Flex row container */}
      <View style={styles.row}>
        {boxes.map((text, index) => (
          <View 
            key={index} 
            style={[styles.box, { backgroundColor: getRandomColor() }]}
          >
            <Text style={styles.text}>{text}</Text>
          </View>
        ))}
      </View>   
      
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#666"
        />
      </View> */}

      <View style={styles.bottomSearchContainer}>
        <TextInput
          style={styles.bottomSearchInput}
          placeholder="Werekeje he?"
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
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
    fontSize: 30,
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
    width:'40%',
    height: 100,
    padding: 20, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    borderWidth: 1, 
    borderColor: '#e5e7eb',
    opacity: 0.4,
  },
  text: {
    fontSize: 18,
    fontWeight: '200',
    color: 'black',
  },
  textLg: {
    fontSize: 18,
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
