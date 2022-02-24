import { useEffect, useState } from 'react'
import { ProgramType } from '../../../types'
import crashlytics from '../../services/Crashlytics'
import { useStorageDownloadURL } from '../../services/Storage'
import { PROGRAM_PATH } from '../config'
import { getLocale } from '../localization'
// import { getLocale } from '../utils/localization';

let localData: ProgramType | null = null

// @TODO move file name to config
// const getProgramFileByLocale = locale => `quests_8.4.1_${locale}`;
const getProgramFileByLocale = () => {
  const lang = getLocale()
  return `${PROGRAM_PATH}${lang}`
}

const useProgram = (programName?: string) => {
  const [program, setProgram] = useState(localData)
  const [programFile, setProgramFile] = useState<string>(programName || getProgramFileByLocale())
  const programFileString = `program/${programFile ? programFile : ''}.json`
  const downloadUrl = useStorageDownloadURL(programFileString)

  const dowloadProgram = async (url: string) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setProgram(data)
      localData = data
    } catch (e) {
      crashlytics().recordError()
    }
  }
  useEffect(() => {
    if (downloadUrl) {
      dowloadProgram(downloadUrl)
    }
  }, [downloadUrl])

  const load = async () => {
    const name = programName || getProgramFileByLocale()
    setProgramFile(name)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programName])

  return program
}
// to use it from non React components
export const getProgram = () => localData

export default useProgram
