import moment, { Moment } from 'moment'
import { SmokeRecordsState } from './../../store/slices/smokeRecord'

export type EmptyRecordsType = {
  [key: string]: {
    count: number
    id: string
    disabled?: boolean
  }
}

export const generateEmptyWeekRecords = (m: Moment) => {
  m.subtract(6, 'd')
  const emptyRecords: EmptyRecordsType = {}
  for (let i = 6; i > 0; i--) {
    const dateString = m.add(1, 'd').format('YYYY-MM-DD')
    emptyRecords[dateString] = { count: -1, id: dateString, disabled: false }
  }
  // tomorrow
  m.add(1, 'd')
  emptyRecords[m.format('YYYY-MM-DD')] = { count: -1, id: m.format('YYYY-MM-DD'), disabled: true }
  return emptyRecords
}

export const fillWeek = (records: SmokeRecordsState) => {
  const m = moment()
  const emptyWeekRecords = generateEmptyWeekRecords(moment(m)) // create new date since moment().add method is not pure
  const normalizedRecords = Object.keys(records).reduce((res: EmptyRecordsType, key: string) => {
    if (moment().diff(moment(key), 'd') < 7) {
      res[key] = { count: records[key], id: key }
    }
    return res
  }, {})
  const newRecords = { ...emptyWeekRecords, ...normalizedRecords }
  return newRecords
}
