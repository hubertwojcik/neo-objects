import { Favorites } from '@/screens';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ComponentType } from 'react';
// import type { SvgProps } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { NeoObjectsNavigator } from './neo-objects-navigator';
import React from 'react';

export type HomeStackParamList = {
  Home: undefined;
};

type TabParamList = {
  NeoObjectsNavigator: undefined;
  Favorites: undefined;
};

type TabType = {
  name: keyof TabParamList;
  component: ComponentType<unknown>;
  label: string;
};

// type TabIconsType = {
//   [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
// };

const Tab = createBottomTabNavigator<TabParamList>();

export type TabList<T extends keyof TabParamList> = {
  navigation: NativeStackNavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};

const tabs: TabType[] = [
  {
    name: 'NeoObjectsNavigator',
    component: NeoObjectsNavigator,
    label: 'Style',
  },
  {
    name: 'Favorites',
    component: Favorites,
    label: 'Feed',
  },
];

// const tabsIcons: TabIconsType = {
//   Style: (props: SvgProps) => <StyleIcon {...props} />,
//   FeedNavigator: (props: SvgProps) => <FeedIcon {...props} />,
//   Settings: (props: SvgProps) => <SettingsIcon {...props} />,
// };

export const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        {tabs.map(({ name, component, label }) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={component}
              options={{
                title: label,
                tabBarTestID: `${name}-tab`,
              }}
            />
          );
        })}
      </Tab.Group>
    </Tab.Navigator>
  );
};
