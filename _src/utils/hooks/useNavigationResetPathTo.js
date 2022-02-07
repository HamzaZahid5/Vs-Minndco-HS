// very lab option to avoid writing anoying code to reset navigation route
// import { useEffect, useState } from 'react';

export default navigation => {
  const resetPathTo = (routeName, routeParams = {}) =>
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
