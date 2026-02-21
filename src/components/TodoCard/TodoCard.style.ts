import { StyleSheet } from "react-native";
import Color from "../../assets/Color";
import { BORDER_RADIOUS } from "../../constants/spacing";
import { ELEVATION } from "../../constants/shadowing";

export default StyleSheet.create({
    container : {
        backgroundColor : Color.lightblue2,

        width : "100%",
        padding : 10,
        borderRadius : BORDER_RADIOUS,
        elevation : ELEVATION,
        gap : 20,
        overflow : "hidden"
    },

    top : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },

    title : {
        fontWeight : "bold",
        fontSize : 16,
        color : Color.primary
    },

    doneText : {
        textDecorationLine : "line-through",
        color : "gray"
    },

    content : {
        fontWeight : "400",
        color : Color.primary
    },

    date : {
        fontWeight : "bold",
        fontSize : 11,
        opacity : .4,
        alignSelf : "flex-end"
    },

    mid : {
        gap : 15
    },

    icon : {
        backgroundColor : "#33b78c",
        padding : 5,
        borderRadius : 50,
    },

    bottom : {
        alignItems : "center",
        justifyContent : "space-between",
        flexDirection : "row",
    },


})