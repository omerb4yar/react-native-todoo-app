import { StyleSheet } from "react-native";
import { ELEVATION } from "../../constants/shadowing";
import Color from "../../assets/Color";
import { BORDER_RADIOUS } from "../../constants/spacing";

export default StyleSheet.create({
  container : {
    elevation : ELEVATION,
    backgroundColor : "white",
    borderColor : Color.bg,
    borderRadius : BORDER_RADIOUS,
    width : 200,
    padding : 4,
    paddingLeft : 10,
    flexDirection : "row",
    alignItems : "center",
    gap : 4


  },
  input : {
    flex : 1,
    fontSize : 13
  },
  leftIcon : {
  },
  error : {
    borderColor : Color.danger,
    borderWidth : 2
  }
})