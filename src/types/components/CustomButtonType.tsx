import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type CustomButtonVariant = "primary" | "secondary" | "danger";

export interface CustomButtonProps {
    title : string;
    onPress : () => void;
    leftIcon? : ReactNode;

    buttonDisabled? : boolean;
    loading? : boolean;
    variant? : CustomButtonVariant;


    containerStyle? : StyleProp<ViewStyle>;
    titleStyle? : StyleProp<TextStyle>;
    indicatorColor? : string
}