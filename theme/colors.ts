import {useColorScheme} from 'nativewind';

// const {colorScheme, toggleColorScheme} = useColorScheme();

const commonColors = {
  commonBlue: '#01DBC6',
};

const lightTheme = {
  backgroundColor: '#FFFFFF', //white
  textColor: '#18181b', //zinc-900
  chartColor: '#581c87', //purple for chart/text
  logoColor: '#075985', //blue for logo
};

const darkTheme = {
  backgroundColor: '#09090b', //zinc-950
  textColor: '#e2e8f0', //slate-200
  chartColor: '#BB86FC', //purple for chart/text
  logoColor: '#01DBC6', //blue for logo
};

export const colors = {
  text: colorScheme === 'dark' ? 'text-zinc-900' : 'dark:text-slate-200',
  backgroundColor: colorScheme === 'dark' ? 'bg-white' : 'dark:bg-zinc-950',
  chartColor:
    colorScheme === 'dark'
      ? (opacity = 1) => `rgba(88, 28, 135, ${opacity})`
      : (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
  logoColor: colorScheme === 'dark' ? 'text-[#075985]' : 'dark:text-[#01DBC6]',
};
