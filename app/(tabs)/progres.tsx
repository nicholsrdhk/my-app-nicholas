// app/(tabs)/progres.tsx
import { ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { CourseProgresCard } from '../../components/CourseProgresCard';
import { resetProgress } from '@/store/reducer/progressSlice';

export default function ProgresTab() {
  const dispatch = useDispatch();

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Apakah kamu yakin ingin mengulang dari awal?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya', onPress: () => dispatch(resetProgress()) },
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Progress Belajar</Text>
        <CourseProgresCard />
        <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
