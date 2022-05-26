import functions from '../../services/Functions'
import { LifesaverActivityBase } from '../../utils/lifesaverActivities'
import { companyType, placeType, urgeType } from './storage'

const saveLifesaverActivityDone = async (
  activity: LifesaverActivityBase,
  urge: urgeType,
  place: placeType,
  company: companyType,
) => {
  const payload = {
    activity: activity.id,
    activityType: activity.type,
    urge: urge.toLowerCase(),
    place: place.toLowerCase(),
    company: company.toLowerCase(),
  }
  functions().httpsCallable('saveLifesaverInteraction')(payload)
}
export default saveLifesaverActivityDone
