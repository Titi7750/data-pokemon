import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StrictMode } from "react";
import Home from "./components/home";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Page d'accueil"
        component={Home}
        options={() => ({
          title: "Page des Pokémons"
        })}
      />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StrictMode>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </StrictMode>
  );
}