import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../pages/profile";
import Map from "../pages/Map";
import MenuConfigurations from "../pages/profileConfigurations";
import ProfileEdit from "../pages/profileEdit";
import DesafioEdit from "../pages/taskCreate";
import DesafioSelect from "../pages/desafioSelect";
import DesafioList from "../pages/taskList";
import Teste from "../pages/teste";
import TaskCreate from "../pages/taskCreate";
import TaskList from "../pages/taskList";
import TaskEdit from "../pages/taskEdit";

const App = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile"
    >
      <App.Screen name="Profile" component={Profile} />
      <App.Screen name="Map" component={Map} />
      <App.Screen name="Configurations" component={MenuConfigurations} />
      <App.Screen name="ProfileEdit" component={ProfileEdit} />
      <App.Screen name="DesafioSelect" component={DesafioSelect} />
      <App.Screen name="TaskCreate" component={TaskCreate} />
      <App.Screen name="TaskEdit" component={TaskEdit} />
      <App.Screen name="TaskList" component={TaskList} />
      <App.Screen name="Teste" component={Teste} />
      
    </App.Navigator>
  );
}
