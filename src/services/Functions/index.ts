import functions from './functions'
import { SmokeRecordsState } from './../../store/slices/smokeRecord'

export const saveSmokeJurnal = async (record: SmokeRecordsState) =>
  functions().httpsCallable('saveIntakeJournal')(record)

export default functions
