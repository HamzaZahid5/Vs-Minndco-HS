const defFunction = () => window.firebase.firestore();
Object.defineProperty(defFunction, 'FieldValue', { get: () => window.firebase.firestore.FieldValue })
Object.defineProperty(defFunction, 'Timestamp', { get: () => window.firebase.firestore.Timestamp })

export default defFunction;