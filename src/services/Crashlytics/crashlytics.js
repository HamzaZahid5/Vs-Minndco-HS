// mocked interface for Crashlytics
export default () => ({
  log: () => undefined,
  setUserId: () => undefined,
  recordError: () => undefined,
  crash: () => undefined,
})
