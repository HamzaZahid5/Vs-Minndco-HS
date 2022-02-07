import { NavigationContainerRef } from '@react-navigation/native';

const resetNav = (navigation: NavigationContainerRef) => {
  const resetPathTo = (routeName: string, routeParams = {}) =>
    navigation.reset({
      index: 1,
      routes: [
        { name: 'Main' },
        {
          name: routeName,
          params: routeParams,
        },
      ],
    });
  return resetPathTo;
};

export default (deepLink: string, navigation: NavigationContainerRef) => {
  const reset = resetNav(navigation);
  reset(deepLink);
};
