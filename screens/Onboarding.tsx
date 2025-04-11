import {Image, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {appColors} from "../assets/appColors";
import ButtonComponent from "../components/ButtonComponent";
import {useState} from "react";

const Onboarding = () => {

	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');

	const validateName = (name: string) => /^[A-Za-z]+$/.test(name);
	const validateEmail = (email: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const handleNextPress = () => {
		if (!firstName || !validateName(firstName)) {
			alert('Please enter a valid first name (letters only).');
			return;
		}
		if (!validateEmail(email)) {
			alert('Please enter a valid email address.');
			return;
		}

		// Proceed to next step
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<Image style={styles.headerImage} source={require('../assets/images/Logo.png')}/>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.bodyText}>Let us get to know you</Text>
				<View style={{flex: 1}}/>

				<View style={styles.inputContainer}>
					<Text style={styles.inputTitleText}>First Name</Text>
					<TextInput style={styles.bodyTextInput}
							   value={firstName}
							   onChangeText={setFirstName}/>

					<Text style={styles.inputTitleText}>Email</Text>
					<TextInput style={styles.bodyTextInput}
							   value={email}
							   onChangeText={setEmail}
							   keyboardType={'email-address'}
							   autoCapitalize={"none"}/>
				</View>
			</View>
			<View style={styles.footerContainer}>
				<ButtonComponent title={'Next'} onPress={handleNextPress}/>
			</View>
		</SafeAreaView>
	)
}

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerImage: {
		height: 60,
		width: 250
	},
	bodyContainer: {
		flex: 1,
		// backgroundColor: appColors.primaryGreen,
	},
	inputContainer: {
		marginBottom: 50,
		marginHorizontal: 50
	},
	bodyText: {
		marginTop: 50,
		fontSize: 24,
		alignSelf: 'center'
	},
	inputTitleText: {
		marginTop: 20,
		marginBottom: 10,
		fontSize: 24,
		alignSelf: 'center'
	},
	bodyTextInput: {
		height: 50,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 18
	},
	footerContainer: {
		alignItems: "flex-end",
		justifyContent: 'center',
		marginHorizontal: 50,
		height: 150,
	},
})