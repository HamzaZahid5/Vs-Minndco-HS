import { useState, useEffect } from 'react';
import { useFirestoreJournalListener } from '../../services/Firestore';
export default () => {
  const [journalData, setJournalData] = useState();
  const querySnapshot = useFirestoreJournalListener();
  useEffect(() => {
    if (querySnapshot && querySnapshot.size) {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      setJournalData(data);
    }
  }, [querySnapshot]);

  return journalData;
};
