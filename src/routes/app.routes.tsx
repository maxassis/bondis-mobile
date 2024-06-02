import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../pages/Profile';
import Map from '../pages/Map';
import MenuConfigurations from '../pages/MenuConfigurations';

const App = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Map"
        >
            <App.Screen name="Profile" component={Profile} />
            <App.Screen name="Map" component={Map} />
            <App.Screen name="Configurations" component={MenuConfigurations} />
            
         
        </App.Navigator>
    )
}