import { Favorites } from '@/screens';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ComponentType } from 'react';
// import type { SvgProps } from 'react-native-svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { NeoObjectsNavigator } from './neo-objects-navigator';
import React from 'react';
import { colors, getElevation } from '@/shared/utils';
// import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import type { SvgProps } from 'react-native-svg';
// import { SvgProps } from 'react-native-svg';

export type HomeStackParamList = {
  Home: undefined;
};

type TabParamList = {
  NeoObjectsNavigator: undefined;
  Favorites: undefined;
};

type TabType = {
  name: keyof TabParamList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  label: string;
};

type TabIconsType = {
  [key in keyof TabParamList]: (props: SvgProps) => JSX.Element;
};

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

const tabsIcons: TabIconsType = {
  NeoObjectsNavigator: () => <Feather name="home" size={24} />,
  Favorites: () => <Feather name="home" size={24} />,
};

type BarIconType = {
  name: keyof TabParamList;
  color: string;
  focused: boolean;
};

const BarIcon = ({ color, name, ...reset }: BarIconType) => {
  const Icon = tabsIcons[name];
  return <Icon color={color} {...reset} />;
};

export const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => (
          <BarIcon name={route.name} color={color} focused={focused} />
        ),
      })}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 32,
            right: 16,
            left: 16,
            height: 60,
            backgroundColor: colors.black,
            borderRadius: 10,
            ...getElevation({ elevation: 5 }),
          },
          tabBarShowLabel: false,
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
