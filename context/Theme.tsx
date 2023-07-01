// import {useColorScheme} from 'nativewind';
// import React from 'react';
// import {View, Text} from 'react-native';

// interface ThemeInfo {
//   text: string;
//   backgroundColor: string;
//   chartColor: () => string;
//   logoColor: string;
// }

// export const ThemeContext = React.createContext<ThemeInfo>({
//   text: colorScheme === 'dark' ? 'text-zinc-900' : 'dark:text-slate-200',
//   backgroundColor: colorScheme === 'dark' ? 'bg-white' : 'dark:bg-zinc-950',
//   chartColor:
//     colorScheme === 'dark'
//       ? (opacity = 1) => `rgba(88, 28, 135, ${opacity})`
//       : (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
//   logoColor: colorScheme === 'dark' ? 'text-[#075985]' : 'dark:text-[#01DBC6]',
// });

// const ThemeProvider = ({children}) => {
//   const {colorScheme, toggleColorScheme} = useColorScheme();

//   const colors = {
//     text: colorScheme === 'dark' ? 'text-zinc-900' : 'dark:text-slate-200',
//     backgroundColor: colorScheme === 'dark' ? 'bg-white' : 'dark:bg-zinc-950',
//     chartColor:
//       colorScheme === 'dark'
//         ? (opacity = 1) => `rgba(88, 28, 135, ${opacity})`
//         : (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
//     logoColor:
//       colorScheme === 'dark' ? 'text-[#075985]' : 'dark:text-[#01DBC6]',
//   };
//   return (
//     <View>
//       <Text>Theme</Text>
//     </View>
//   );
// };

// export default ThemeProvider;
