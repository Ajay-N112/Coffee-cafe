// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import StartScreen from './Screens/HomeScreen'; 

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect, useState } from 'react';
// import Loader from './Components/Loader';
// import Login from './Screens/Login';
// import Register from './Screens/Register';
// import HomeScreen from './Screens/HomeScreen';
// import ItemScreen from './Screens/ItemScreen';



// const Stack = createNativeStackNavigator();

// export default function App() {

//   const [isFirst, setIsFirst] = useState(null)

//   const getData = async () => {
//     const data = await AsyncStorage.getItem('isPressed')
//     // console.log(typeof (data) + ' ' + data);
//     setIsFirst(Boolean(data))
//   }

//   useEffect(() => {
//     getData()
//   }, [])

//   if (isFirst === null) {
//     return <Loader />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* Set the StartScreen as the initial screen */}
//         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
//         {/* Include other screens in the stack */}
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//         <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
//         <Stack.Screen name="Items" component={ItemsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import Login from './Screens/Login';
import Register from './Screens/Register';
import HomeScreen from './Screens/HomeScreen';
import ItemScreen from './Screens/ItemScreen'; // Corrected import

const Stack = createNativeStackNavigator();

export default function App() {

  const [isFirst, setIsFirst] = useState(null)

  const getData = async () => {
    const data = await AsyncStorage.getItem('isPressed')
    setIsFirst(Boolean(data))
  }

  useEffect(() => {
    getData()
  }, [])

  if (isFirst === null) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Items" component={ItemScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
