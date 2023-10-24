import AppNavigator from "./navigation/Navigator";
import { Provider } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <Provider >
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator></AppNavigator>
      </SafeAreaView>
    </Provider>
  )
};
