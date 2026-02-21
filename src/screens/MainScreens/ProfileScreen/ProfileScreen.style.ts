import { StyleSheet } from "react-native";
import Color from "../../../assets/Color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.lightblue2,
    },
    profileHeader: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        marginBottom: 16,
        shadowColor: Color.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "rgba(255, 255, 255, 0.4)",
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    displayName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    username: {
        fontSize: 15,
        color: "rgba(255, 255, 255, 0.7)",
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        marginTop: 8,
    },
    statItem: {
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
        minWidth: 75,
    },
    statValue: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
    },
    statLabel: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: 2,
    },
    infoSection: {
        paddingHorizontal: 20,
        marginTop: 8,
    },
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 16,
        shadowColor: Color.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
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
    signOutContainer: {
        paddingHorizontal: 20,
        marginTop: 24,
        marginBottom: 30,
        alignItems: "center",
    },
});