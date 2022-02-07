import { useEffect, useState } from 'react'
import crashlytics from '../../services/Crashlytics'
import storage from './storage'

export const useStorageDownloadURL = (path: string): string | undefined => {
  const [url, setUrl] = useState<string | undefined>()
  const getAndSaveDownloadUrl = async (resource: string) => {
    try {
      const remoteUrl = await storage().ref().child(resource).getDownloadURL()
      setUrl(remoteUrl)
    } catch (e) {
      setUrl(undefined)
      crashlytics().recordError()
    }
  }
  useEffect(() => {
    if (path) {
      getAndSaveDownloadUrl(path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return url
}

export default storage
