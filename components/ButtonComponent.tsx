import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {appColors} from "../assets/appColors";

const ButtonComponent = ({title, onPress}: { title: string, onPress?: () => void }) => {

	return (
		<TouchableOpacity style={style.button} onPress={onPress}>
			<Text style={style.buttonText}>{title}</Text>
		</TouchableOpacity>
	)
}

export default ButtonComponent;

const style = StyleSheet.create({
	button: {
		height: 40,
		borderRadius: 8,
		justifyContent: "center",
		backgroundColor: appColors.primaryYellow
	},
	buttonText: {
		fontSize: 20,
		marginHorizontal: 30,
		color: 'black'
	}
})