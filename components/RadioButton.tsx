import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface RadioButtonType {
  label: string;
  selected: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

export const RadioButton = (props: RadioButtonType) => (
  <TouchableOpacity
    onPress={props.onSelect}
    disabled={props.disabled}
    style={styles.radioContainer}
  >
    <View style={[styles.radioCircle, props.selected && styles.selected]}>
      {props.selected && <View style={styles.innerCircle} />}
    </View>
    <Text style={styles.label}>{props.label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    borderColor: "#007BFF",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});
