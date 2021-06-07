import moment from 'moment';
import { useSelector } from 'react-redux';
import { LAST_ACTIVITY_AT } from '../../store/selectors';

export default () => {
  const lastActivityAt = useSelector(LAST_ACTIVITY_AT);
  const todaysActivityDone = moment(lastActivityAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

  return todaysActivityDone;
};
