import { StyleSheet } from "react-native";
import Color from "../../assets/Color";

export default StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Color.generateGray(0.1),
    },
    infoRowLast: {
        borderBottomWidth: 0,
    },
    infoIcon: {
        marginRight: 14,
    },
    infoLabel: {
        fontSize: 13,
        color: Color.generateGray(0.45),
    },
    infoValue: {
        fontSize: 15,
        color: Color.secondary,
        fontWeight: "500",
        marginTop: 2,
    },
})