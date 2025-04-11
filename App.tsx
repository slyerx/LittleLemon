import Onboarding from "./screens/Onboarding";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {

	const [state, setState] = useState({isLoading: true, isOnboardingComplete: false})

	useEffect(() => {
		const checkOnboardingStatus = async () => {
			try {
				const value = await AsyncStorage.getItem('onboardingComplete');

				if (value === 'true') {
					setState({isLoading: false, isOnboardingComplete: true})
					return
				}
			} catch (e) {
				console.error("Failed to load onboarding status")
			}

			setState({isLoading: false, isOnboardingComplete: false});
		}

		checkOnboardingStatus();
	}, [])

	const onOnboardingComplete = () => {
		setState({isLoading: false, isOnboardingComplete: true})
	}

	const onLogout = () => {
		setState({isLoading: false, isOnboardingComplete: false})
	}

	if (state.isLoading) {
		return <SplashScreen/>
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{state.isOnboardingComplete ? (
					<Stack.Screen name={"Profile"} component={Profile} initialParams={{onLogout}}/>
				) : (
					<Stack.Screen name={"Onboarding"} component={Onboarding} initialParams={{onOnboardingComplete}}/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}