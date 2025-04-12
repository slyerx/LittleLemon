import {
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useLayoutEffect, useState} from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {appColors} from "../assets/appColors";
import ButtonComponent from "../components/ButtonComponent";
import {Checkbox} from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';
import DefaultProfilePicture from "../components/DefaultProfilePicture";
import {dropTable} from "../services/sqlite";

const Profile = ({route, navigation}: any) => {

	const {onLogout} = route.params;

	const [image, setImage] = useState('');
	const [userInitials, setUserInitials] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const [orderStatus, setOrderStatus] = useState(false);
	const [passwordChanges, setPasswordChanges] = useState(false);
	const [specialOffers, setSpecialOffers] = useState(false);
	const [newsletter, setNewsletter] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Image
					source={require('../assets/images/Logo.png')}
					style={styles.headerImage}
				/>
			),
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<FontAwesome6 name="circle-arrow-left" size={24} color={appColors.primaryGreen}/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View>
					{image === '' ? (
						<DefaultProfilePicture userInitials={userInitials} header={true}/>
					) : (
						<Image
							source={{uri: image}}
							style={styles.headerProfileImage}
						/>
					)}
				</View>
			)
		});
	}, [navigation, userInitials, image]);

	useEffect(() => {
		getDataFromStorage().then(() => {
			console.log("Loaded data")
		});
	}, [])

	const getDataFromStorage = async () => {
		try {
			const values = await AsyncStorage.multiGet([
				'image',
				'firstName',
				'lastName',
				'email',
				'phoneNumber',
				'orderStatus',
				'passwordChanges',
				'specialOffers',
				'newsletter',
			]);

			// serialize
			const data: any = values.reduce((acc: { [key: string]: any }, [key, value]) => {
				acc[key] = value;
				return acc;
			}, {});

			setImage(data.image || '');
			setFirstName(data.firstName || '');
			setLastName(data.lastName || '');
			setEmail(data.email || '');
			setPhoneNumber(data.phoneNumber || '');
			setOrderStatus(data.orderStatus === 'true');
			setPasswordChanges(data.passwordChanges === 'ture');
			setSpecialOffers(data.specialOffers === 'ture');
			setNewsletter(data.newsletter === 'ture');

			if (data.lastName) {
				setUserInitials(`${data.firstName[0].toUpperCase()}${data.lastName[0].toUpperCase()}`);
			} else {
				setUserInitials(data.firstName[0]?.toUpperCase() ?? '');
			}

		} catch (e) {
			console.error('Failed to load data from storage:', e);
		}
	};

	const validateName = (name: string) => /^[A-Za-z]+$/.test(name);
	const validateEmail = (email: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const validatePhoneNumber = (phone: string) =>
		/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);

	const saveChanges: () => Promise<boolean> = async () => {
		if (!firstName || !validateName(firstName)) {
			Alert.alert('Error', 'Please enter a valid first name (letters only).');
			return false;
		}
		if (lastName && !validateName(lastName)) {
			Alert.alert('Error', 'Please enter a valid last name (letters only).');
			return false;
		}

		if (!validateEmail(email)) {
			Alert.alert('Error', 'Please enter a valid email address.');
			return false;
		}

		if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
			Alert.alert('Error', 'Please enter a valid phone number.');
			return false;
		}

		await AsyncStorage.multiSet([
			['image', image],
			['firstName', firstName],
			['lastName', lastName],
			['email', email],
			['phoneNumber', phoneNumber],
			['orderStatus', JSON.stringify(orderStatus)],
			['passwordChanges', JSON.stringify(passwordChanges)],
			['specialOffers', JSON.stringify(specialOffers)],
			['newsletter', JSON.stringify(newsletter)]
		]);

		if (lastName[0] !== undefined) {
			setUserInitials(`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`);
		} else {
			setUserInitials(firstName[0]?.toUpperCase() ?? '');
		}

		return true;
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.innerContainer}>

				<View style={styles.personalInfoContainer}>
					<Text style={styles.titleText}>Personal information</Text>
					<Text style={styles.smallText}>Avatar</Text>

					<View style={styles.avatarContainer}>

						{image === '' ? (
							<DefaultProfilePicture userInitials={userInitials}/>
						) : (

							<Image
								source={{uri: image}}
								style={styles.avatarImage}
							/>
						)}

						<ButtonComponent title={'Change'} backgroundColor={appColors.primaryGreen} textColor={'white'}
										 onPress={pickImage}/>
						<ButtonComponent title={'Remove'} backgroundColor={'white'} textColor={appColors.primaryGreen}
										 borderColor={appColors.primaryGreen} onPress={() => setImage('')}/>
					</View>


					<Text style={styles.smallText}>First name</Text>
					<TextInput value={firstName} onChangeText={setFirstName} style={styles.textInput}/>

					<Text style={styles.smallText}>Last name</Text>
					<TextInput value={lastName} onChangeText={setLastName} style={styles.textInput}/>

					<Text style={styles.smallText}>Email</Text>
					<TextInput value={email} onChangeText={setEmail} style={styles.textInput}
							   keyboardType={"email-address"}/>

					<Text style={styles.smallText}>Phone number</Text>
					<TextInput value={phoneNumber} onChangeText={setPhoneNumber} style={styles.textInput}
							   keyboardType={"phone-pad"}/>
				</View>

				<View style={styles.emailContainer}>
					<Text style={styles.titleText}>Email notifications</Text>
					<View style={styles.checkboxContainer}>
						<Checkbox value={orderStatus} onValueChange={setOrderStatus} color={appColors.primaryGreen}/>
						<Text style={styles.checkboxText}>Order statuses</Text>
					</View>

					<View style={styles.checkboxContainer}>
						<Checkbox value={passwordChanges} onValueChange={setPasswordChanges}
								  color={appColors.primaryGreen}/>
						<Text style={styles.checkboxText}>Password changes</Text>
					</View>

					<View style={styles.checkboxContainer}>
						<Checkbox value={specialOffers} onValueChange={setSpecialOffers}
								  color={appColors.primaryGreen}/>
						<Text style={styles.checkboxText}>Special offers</Text>
					</View>

					<View style={styles.checkboxContainer}>
						<Checkbox value={newsletter} onValueChange={setNewsletter} color={appColors.primaryGreen}/>
						<Text style={styles.checkboxText}>Newsletter</Text>
					</View>

				</View>

				<View>
					<ButtonComponent title={'Log out'} backgroundColor={appColors.primaryYellow} textColor={'black'}
									 onPress={async () => {
										 await AsyncStorage.clear();
										 await dropTable();
										 onLogout();
									 }}/>

					<View style={styles.buttonsContainer}>
						<ButtonComponent title={'Discard Changes'} backgroundColor={'white'}
										 textColor={appColors.primaryGreen}
										 borderColor={appColors.primaryGreen}
										 onPress={async () => {
											 await getDataFromStorage().then(() => console.log('Data reloaded'))
										 }}/>
						<ButtonComponent title={'Save Changes'} backgroundColor={appColors.primaryGreen}
										 textColor={'white'}
										 onPress={async () => {
											 await saveChanges().then((success: boolean) => {
												 if (success) {
													 Alert.alert('Success', 'Profile updated with success');
												 }
											 })
										 }}/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		backgroundColor: 'white',
		margin: 10,
		padding: 20,
		borderWidth: 1,
		borderRadius: 16,
		borderColor: appColors.highlightLight
	},
	headerImage: {
		width: 150,
		height: 40,
		resizeMode: 'contain'
	},
	headerProfileImage: {
		height: 40,
		width: 40,
		borderRadius: 20
	},
	titleText: {
		fontSize: 24,
		marginBottom: 15
	},
	smallText: {
		fontSize: 14,
		marginBottom: 5
	},
	avatarContainer: {
		height: 80,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20
	},
	avatarImage: {
		height: 80,
		width: 80,
		borderRadius: 40
	},
	textInput: {
		height: 40,
		borderWidth: 0.5,
		borderColor: appColors.primaryGreen,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 18,
		marginBottom: 10
	},
	personalInfoContainer: {
		flex: 1
	},
	emailContainer: {
		marginVertical: 20,
		justifyContent: "space-between"
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15
	},
	checkboxText: {
		fontSize: 14,
		marginLeft: 10
	},
	buttonsContainer: {
		height: 40,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 20
	}
});