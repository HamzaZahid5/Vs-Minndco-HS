import moment from 'moment';
import { useSelector } from 'react-redux';
import { LAST_ACTIVITY_AT, PROGRESS } from '../../store/selectors';

export default () => {
  const lastActivityAt = useSelector(LAST_ACTIVITY_AT);
  const progress = useSelector(PROGRESS); // If no activity was done, today's activity hasn't been done  --  This is needed for new users
  const todaysActivityDone =
    moment(lastActivityAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && progress.length > 0;

  return todaysActivityDone;
};
