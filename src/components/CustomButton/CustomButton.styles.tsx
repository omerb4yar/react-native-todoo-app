import { StyleSheet } from "react-native";
import { BORDER_RADIOUS } from "../../constants/spacing";
import Color from "../../assets/Color";
import { ELEVATION } from "../../constants/shadowing";

export default StyleSheet.create({
    container : {
        backgroundColor : Color.primary,
        padding : 14,
        borderRadius : BORDER_RADIOUS,
        overflow : "hidden",
        elevation : ELEVATION,
        alignItems : "center",
        justifyContent : "center"
    },

    title : {
        fontSize : 13,
        color : "white",
        fontWeight : "bold"
    },

    primary : {
        backgroundColor : Color.primary
    },

    secondary : {
        backgroundColor : Color.secondary
    },

    danger : {
        backgroundColor : Color.danger
    },

    disabled : {
        opacity : 0.7
    }
})