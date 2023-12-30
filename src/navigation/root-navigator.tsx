import { NavigationContainer } from './navigation-container';
import React from 'react';

import { NeoObjectsNavigator } from './neo-objects-navigator';

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <NeoObjectsNavigator />
    </NavigationContainer>
  );
};
