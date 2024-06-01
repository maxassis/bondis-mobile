import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Recovery from '../pages/recovery';
import CreateAccount from '../pages/createAccount';
import AccountDone from '../pages/accountDone';
import CreatePassword from '../pages/createPassword';
import CreateAccountGetCode from '../pages/createAccountGetCode';
import RecoveryGetCode from '../pages/recoveryGetCode';
import RecoveryCreatePassword from '../pages/recoveryCreatePassword';
import RecoverySuccess from '../pages/recoverySuccess';
import WizardWelcome from '../pages/wizardWelcome';
import WizardNotification from '../pages/wizardNotification';

const App = createNativeStackNavigator()

export default function LoginRoutes() {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="WizardNotification"
        >
            <App.Screen name="Intro" component={Intro} />
            <App.Screen name="Login" component={Login} />
            <App.Screen name="Recovery" component={Recovery} />
            <App.Screen name="CreateAccount" component={CreateAccount} />
            <App.Screen name="CreatePassword" component={CreatePassword} />
            <App.Screen name="AccountDone" component={AccountDone} />
            <App.Screen name="GetCode" component={CreateAccountGetCode} />
            <App.Screen name="RecoveryCode" component={RecoveryGetCode} />
            <App.Screen name="RecoveryCreatePassword" component={RecoveryCreatePassword} />
            <App.Screen name="RecoverySuccess" component={RecoverySuccess} />
            <App.Screen name="WizardWelcome" component={WizardWelcome} />
            <App.Screen name="WizardNotification" component={WizardNotification} />

            
        </App.Navigator>
    )
}