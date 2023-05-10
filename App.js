import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import images from './images';
export default function App() {
  return (
    <View style={styles.container}>
      <Text> testtttttttttt </Text>
      <div>
      <div className="board">
          .
      </div>


      </div>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c181b1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
