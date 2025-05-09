// app/(tabs)/settings.tsx
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSelector } from "react-redux";

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
    <View style={styles.menuLeft}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Feather name="chevron-right" size={24} color="#999" />
  </TouchableOpacity>
);

export default function SettingsTab() {
  const profile = useSelector(state => state.profile);

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
        <Image
          source={{ uri: profile.photo || 'https://i.pinimg.com/736x/36/5f/f8/365ff88deb08444c2f91eaf49ebe553c.jpg' }}
          style={styles.profileImage}
        />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => router.push('/profile')}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu}>
          <MenuItem icon={<Feather name="heart" size={22} color="#4CAF50" />} label="Favourites" />
          <MenuItem icon={<Feather name="download" size={22} color="#2196F3" />} label="Downloads" />
          <View style={styles.separator} />
          <MenuItem icon={<Feather name="globe" size={22} color="#9C27B0" />} label="Language" />
          <MenuItem icon={<Feather name="map-pin" size={22} color="#FF5722" />} label="Location" />
          <MenuItem icon={<Feather name="monitor" size={22} color="#3F51B5" />} label="Display" />
          <MenuItem icon={<Feather name="rss" size={22} color="#00BCD4" />} label="Feed preference" />
          <MenuItem icon={<Feather name="credit-card" size={22} color="#E91E63" />} label="Subscription" />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 14,
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    marginTop: 14,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  menu: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
});
