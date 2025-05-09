import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "@/components/RadioButton";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { markQuizAnswered, addScore } from "@/store/reducer/progressSlice";
import { RootState } from "@/store";

interface CourseQuizProps {
  onNextContent: () => void;
  content: {
    question: string;
    options: Array<{ value: any; label: string }>;
    answer: number | null;
  };
  quizIndex: number;
}

export default function QuizTopic(props: CourseQuizProps) {
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const dispatch = useDispatch();

  const current = useSelector((state: RootState) => state.progress.answeredQuiz.length);
  const total = 10;

  const handleSubmit = () => {
    if (userAnswer === null) return;

    const isCorrect = userAnswer === props.content.answer;
    dispatch(markQuizAnswered(props.quizIndex));
    if (isCorrect) dispatch(addScore(10));

    props.onNextContent();
  };

  useEffect(() => {
    setUserAnswer(null);
  }, [props.quizIndex]);

  return (
    <View style={styles.container}>
      {/* Progress Bar + Text */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(current / total) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>Progress: {current}/{total}</Text>
      </View>

      {/* Quiz Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.questionText}>{props.content.question}</Text>

        {props.content.options.map((option, index) => {
          const isSelected = userAnswer === option.value;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionContainer,
                isSelected && styles.selectedOption,
              ]}
              onPress={() => setUserAnswer(option.value)}
            >
              <RadioButton
                label={option.label}
                selected={isSelected}
                onSelect={() => setUserAnswer(option.value)}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            userAnswer === null && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={userAnswer === null}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginRight: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#6A1B9A",
  },
  progressText: {
    fontSize: 14,
    color: "#555",
    minWidth: 80,
    textAlign: "right",
  },
  contentContainer: {
    padding: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  optionContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selectedOption: {
    borderColor: "#8E24AA",
    backgroundColor: "#F3E5F5",
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  submitButton: {
    backgroundColor: "#8E24AA",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
