import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../pages/profile";
import Map from "../pages/Map";
import MenuConfigurations from "../pages/profileConfigurations";
import ProfileEdit from "../pages/profileEdit";
import DesafioEdit from "../pages/desafioEdit";
import DesafioSelect from "../pages/desafioSelect";
import DesafioList from "../pages/desafioList";

const App = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DesafioList"
    >
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="Map" component={Map} />
      <App.Screen name="Configurations" component={MenuConfigurations} />
      <App.Screen name="ProfileEdit" component={ProfileEdit} />
      <App.Screen name="DesafioSelect" component={DesafioSelect} />
      <App.Screen name="DesafioEdit" component={DesafioEdit} />
      <App.Screen name="DesafioList" component={DesafioList} />
    </App.Navigator>
  );
}
