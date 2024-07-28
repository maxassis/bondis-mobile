import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../pages/profile';
import Map from '../pages/Map';
import MenuConfigurations from '../pages/profileConfigurations';
import ProfileEdit from '../pages/profileEdit';
import DesafioSelect from '../pages/desafioSelect';

const App = createNativeStackNavigator()

export default function AppRoutes() {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="DesafioSelect"
        >
            <App.Screen name="Profile" component={Profile} />
            <App.Screen name="Map" component={Map} />
            <App.Screen name="Configurations" component={MenuConfigurations} />
            <App.Screen name="ProfileEdit" component={ProfileEdit} />
            <App.Screen name="DesafioSelect" component={DesafioSelect} />

            
         
        </App.Navigator>
    )
}