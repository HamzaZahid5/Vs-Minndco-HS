import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore: non-ts file
import useProgram from './useProgram';
import { KIT_ACTIVATED } from '../../store/selectors';
// @ts-ignore: non-ts file
import { filterActivitiesByCategory } from '../helpers';

const useProgramActivitiesByCategory = (category: string) => {
  const [filteredActivities, setFilteredActivities] = useState();
  const includeVR = useSelector(KIT_ACTIVATED);
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
