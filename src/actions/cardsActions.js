import { ADD_CARD } from './actionType';

export const addCard = (listID, text) => {
	return {
		type: ADD_CARD,
		payload: { text, listID },
	};
};
