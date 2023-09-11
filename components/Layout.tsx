import React, {Children} from 'react';
import {View} from 'react-native';

const Layout = ({children}) => {
  return <View className="px-3 bg-zinc-950 h-full w-full">{children}</View>;
};

export default Layout;
