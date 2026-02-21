import { TouchableOpacity } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons"
import { Text, View } from "react-native";
import ProfileScreenStyle from "../../screens/MainScreens/ProfileScreen/ProfileScreen.style";
import Color from "../../assets/Color";

interface InfoRowButtonProps {
    icon: any;
    label: string;
    value: string;
    onPress: () => void;
}


const InfoRowButton = ({ icon, label, value, onPress }: InfoRowButtonProps) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={ProfileScreenStyle.infoRow}>
                <Icon name={icon} size={20} color={Color.primary} style={ProfileScreenStyle.infoIcon} />
                <View style={{ flex: 1 }}>
                    <Text style={ProfileScreenStyle.infoLabel}>{label}</Text>
                    <Text style={ProfileScreenStyle.infoValue}>{value || '—'}</Text>
                </View>
                <Icon name="chevron-right" size={22} color={Color.generateGray(0.3)} />
            </View>
        </TouchableOpacity>
    );
};

export default InfoRowButton;