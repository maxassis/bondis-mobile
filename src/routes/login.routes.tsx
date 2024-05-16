import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Recovery from '../pages/recovery';
import CreateAccount from '../pages/createAccount';
import AccountDone from '../pages/accountDone';
import CreatePassword from '../pages/createPassword';

const App = createNativeStackNavigator()

export default function LoginRoutes() {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Intro"
        >
            <App.Screen name="Intro" component={Intro} />
            <App.Screen name="Login" component={Login} />
            <App.Screen name="Recovery" component={Recovery} />
            <App.Screen name="CreateAccount" component={CreateAccount} />
            <App.Screen name="CreatePassword" component={CreatePassword} />
            <App.Screen name="AccountDone" component={AccountDone} />
            
        </App.Navigator>
    )
}