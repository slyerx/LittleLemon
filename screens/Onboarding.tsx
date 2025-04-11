import {Image, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import {useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {

	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Image
					source={require('../assets/images/Logo.png')}
					style={styles.headerImage}
				/>
			),
		});
	}, [navigation]);


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

		const saveForm = async () => {
			await AsyncStorage.setItem("firstName", firstName);
			await AsyncStorage.setItem("email", email);
		}

		saveForm().then(() => {
			// Move to next page
		})

	};

	return (
		<SafeAreaView style={styles.container}>
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
	headerImage: {
		width: 150,
		height: 40,
		resizeMode: 'contain'
	},
	bodyContainer: {
		flex: 1,
		// backgroundColor: appColors.primaryGreen,
	},
	inputContainer: {
		marginBottom: 80,
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