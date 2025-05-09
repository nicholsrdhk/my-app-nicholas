// app/index.tsx
import { Text, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("./(tabs)");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#0f1c3f", "#17346f", "#2e5da8"]}
      start={{ x: 0.5, y: 1 }} // bawah
      end={{ x: 0.5, y: 0 }}   // ke atas
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.textLogo}>E-Learning</Text>
        <Text style={styles.textSubLogo}>
          Belajar pemrograman semakin mudah
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 12,
  },
  textLogo: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  textSubLogo: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    opacity: 0.85,
  },
});
