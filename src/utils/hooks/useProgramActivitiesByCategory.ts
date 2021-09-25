import { useEffect, useState } from 'react';
// @ts-ignore: non-ts file
import useProgram from './useProgram';
// @ts-ignore: non-ts file
import { filterActivitiesByCategory } from '../helpers';

const useProgramActivitiesByCategory = (category: string) => {
  const [filteredActivities, setFilteredActivities] = useState();
  // brings VR contents despite kit activation to avoid showing nothing.
  const includeVR = true;
  const program = useProgram();
  useEffect(() => {
    if (program) {
      setFilteredActivities(filterActivitiesByCategory(program, category, includeVR));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, category]);

  return filteredActivities;
};

export default useProgramActivitiesByCategory;
