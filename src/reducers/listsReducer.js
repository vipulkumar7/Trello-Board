import { ADD_CARD, ADD_LIST, DRAG_HAPPENED } from '../actions/actionType';
let listID = 2;
let cardID = 6;
// let listID = 0;
// let cardID = 0;

const intialState = [
	{
		title: 'Last Episode',
		id: `list-${0}`,
		cards: [
			{
				id: `card-${0}`,
				text: 'We created a static list and static card 1',
			},
			{
				id: `card-${1}`,
				text: 'We created a static list and static card 2',
			},
		],
	},
	{
		title: 'This Episode',
		id: `list-${1}`,
		cards: [
			{
				id: `card-${2}`,
				text: 'We created a static list and static card 1',
			},
			{
				id: `card-${3}`,
				text: 'We created a static list and static card 2',
			},
			{
				id: `card-${4}`,
				text: 'We created a static list and static card 3',
			},
			{
				id: `card-${5}`,
				text: 'We created a static list and static card 4',
			},
		],
	},
];
const listsReducer = (state = intialState, action) => {
	switch (action.type) {
		case ADD_LIST: {
			const newList = {
				title: action.payload,
				cards: [],
				id: `list-${listID}`,
			};
			listID += 1;
			return [...state, newList];
		}

		case ADD_CARD: {
			const newCard = {
				text: action.payload.text,
				id: `card-${cardID}`,
			};
			cardID += 1;

			const newState = state.map((list) => {
				if (list.id === action.payload.listID) {
					return {
						...list,
						cards: [...list.cards, newCard],
					};
				} else {
					return list;
				}
			});
			return newState;
		}

		case DRAG_HAPPENED:
			const {
				droppableIdStart,
				droppableIdEnd,
				droppableIndexStart,
				droppableIndexEnd,
				droppableId,
				type,
			} = action.payload;
			const newState = [...state];

			// Dragging lists around
			if (type === 'list') {
				const list = newState.splice(droppableIndexStart, 1);
				newState.splice(droppableIndexEnd, 0, ...list);
				return newState;
			}
			if (droppableIdStart === droppableIdEnd) {
				// In the same list

				const list = state.find((list) => droppableIdStart === list.id);
				const card = list.cards.splice(droppableIndexStart, 1);
				list.cards.splice(droppableIndexEnd, 0, ...card);
			}

			// In other list
			if (droppableIdStart !== droppableIdEnd) {
				// Find the list where drag happend
				const listStart = state.find((list) => droppableIdStart === list.id);

				// Pull out the card from list
				const card = listStart.cards.splice(droppableIndexStart, 1);

				// Find the where drag ended
				const listEnd = state.find((list) => droppableIdEnd === list.id);

				// Put the card in the new list
				listEnd.cards.splice(droppableIndexEnd, 0, ...card);
			}
			return newState;

		default:
			return state;
	}
};

export default listsReducer;
