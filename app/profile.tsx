import { ScrollView, TextInput, StyleSheet, View, Text, Button, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setEmail, setName, setPhone, setPhoto } from "@/store/reducer/profileSlice";
import { router } from "expo-router";

export default function Profile() {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const onSave = () => {
    Alert.alert("Berhasil", "Profil berhasil diperbarui");
    router.push("/(tabs)/settings");
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Akses ke galeri diperlukan');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      dispatch(setPhoto(result.assets[0].uri));
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView style={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: profile.photo || "https://via.placeholder.com/100x100.png?text=Photo" }}
              style={styles.profileImage}
            />
            <View style={styles.editPhoto}>
              <Text style={{ color: '#fff', fontSize: 12 }}>Ubah</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput style={styles.input} onChangeText={(value) => dispatch(setName(value))} value={profile.name} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} keyboardType="email-address" onChangeText={(value) => dispatch(setEmail(value))} value={profile.email} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Alamat</Text>
          <TextInput style={styles.inputAddress} onChangeText={(value) => dispatch(setAddress(value))} value={profile.address} multiline numberOfLines={4} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Nomor HP</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(value) => dispatch(setPhone(value))} value={profile.phone} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Simpan" onPress={onSave} color="#4CAF50" />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPhoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  inputAddress: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
  },
});
