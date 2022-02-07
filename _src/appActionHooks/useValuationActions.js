import functions from '../services/Functions';

const useValuationActions = () => {
  return {
    voteRating: async (asset, rate) => {
      functions().httpsCallable('logValuation')({
        asset,
        range: [1, 2, 3, 4, 5],
        rate,
      });
    },
    voteYesNo: async (asset, rate) => {
      functions().httpsCallable('logValuation')({
        asset,
        range: [0, 1],
        rate,
      });
    },
    voteMood: async (asset, rate) => {
      functions().httpsCallable('logValuation')({
        asset,
        range: ['stressed', 'bored', 'angry', 'happy'],
        rate,
      });
    },
  };
};

export default useValuationActions;
