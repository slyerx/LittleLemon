import {StyleSheet, Text, TouchableOpacity} from "react-native";

const ButtonComponent = ({title, onPress, backgroundColor, textColor, borderColor}: {
	title: string,
	onPress?: () => void,
	backgroundColor: string,
	textColor: string,
	borderColor?: string,
}) => {

	return (
		<TouchableOpacity
			style={[style.button, {backgroundColor: backgroundColor, borderColor: borderColor || 'transparent'}]}
			onPress={onPress}>
			<Text style={[style.buttonText, {color: textColor}]}>{title}</Text>
		</TouchableOpacity>
	)
}

export default ButtonComponent;

const style = StyleSheet.create({
	button: {
		height: 40,
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 16,
		marginHorizontal: 20,
		alignSelf: "center"
	}
})