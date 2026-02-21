import { StyleSheet } from "react-native";
import Color from "../../../assets/Color";


export default StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "white",
    gap : 12,
    alignItems : "center"
  },
  
  button : {
    position : "absolute",
    right : 15,
    bottom : 5,
    backgroundColor : Color.primary
  }
})