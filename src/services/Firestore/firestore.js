const defFunction = () => window.firebase.firestore();
Object.defineProperty(defFunction, 'FieldValue', { get: () => window.firebase.firestore.FieldValue })

export default defFunction;