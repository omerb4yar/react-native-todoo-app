import { View, Text, StyleSheet } from "react-native";

const OrDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
};

export default OrDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    
    width : 50,
    height: 1,
    backgroundColor: "gray",
  },
  text: {
    marginHorizontal: 10,
    color: "#999",
    fontWeight: "500",
  },
});
