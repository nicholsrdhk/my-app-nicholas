// components/CourseProgressCard.tsx
import { View, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const CourseProgresCard = () => {
  const { readMaterials, answeredQuiz, score } = useSelector(
    (state: RootState) => state.progress
  );

  const totalMaterials = 5;
  const totalQuiz = 10;

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: "https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-07-react-lazy/social-2.png" }}
        style={styles.imageStyle}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.title}>React Native Navigation</Text>

        <View style={styles.statsContainer}>
          <StatRow label="Materi Kursus" value={`${readMaterials.length}/${totalMaterials}`} />
          <StatRow label="Quiz" value={`${answeredQuiz.length}/${totalQuiz}`} />
          <StatRow label="Score" value={`${score}%`} />
        </View>
      </View>
    </View>
  );
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={styles.chip}>
      <Text style={styles.chipText}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  imageStyle: {
    width: 110,
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cardInfo: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  statsContainer: {
    gap: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  chip: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});
