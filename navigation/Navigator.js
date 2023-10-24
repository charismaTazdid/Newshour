import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsOverview from "../screens/NewsOverview";
import Home from "../screens/Home";
import Saved from "../screens/Saved";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                options={{
                    tabBarIcon(props) {
                        return (
                            <Icon color="orange" size={10} name={props.focused ? "home-circle" : "home-circle-outline"}{...props} />
                        )
                    }
                }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon(props) {
                        return (
                            <Icon color="orange" size={10} name={props.focused ? "content-save" : "content-save-outline"}{...props} />
                        )
                    }
                }}
                name="Saved"
                component={Saved} />
        </Tab.Navigator>
    );
};

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="NewsOverView" options={{ headerTitle: 'বিস্তারিত' }} component={NewsOverview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
export default AppNavigator;