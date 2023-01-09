import { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import app from '@react-native-firebase/app'

export default function () {
  useEffect(() => {
    auth()
      .signInWithCustomToken(
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY3MDAyMzY4MywiZXhwIjoxNjcwMDI3MjgzLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1vNm53Z0BtaW5kY290aW5lLXY0LWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW82bndnQG1pbmRjb3RpbmUtdjQtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoia1JhNzl3TUZJNlRqN1B3R3Z2Z3I1WXc0QVJsMSIsImNsYWltcyI6eyJpc1ByZW1pdW0iOnRydWV9fQ.Cs1c7KQyJHlwzRJ-N4187oC9jUk1BveEka-WvmgS5m6nFzifPWr60eNSKex4auCNoo-EOepWTRKghCRadd9h58W_rL7b9A1wW82Aqg-8upTcwpQTIlwYOSzRGnQhmRgqY3DohnY2Oh2NJHf2IKVvq9s7x9nhYprg0RtBLs3DOUNo8bEbJ6v6G1LxBgSUtS81dy0vgZAFvoB_4QJ3E9XnuDY-uRwdP07ArqjaGErzdItZVtrHTTQccHT-L31BsA3APL94xz473tMuZbf8owuuzFcncuUA54evtL4qDHGYEHV9V3l8Dhmppql8NqbR8-cKi2wKK2Yk-OfdthmgDdRrsg',
      )
      .then(console.log)

    console.log(app.app())
  }, [])

  return null
}
