import React, { Component } from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TrelloActionButton from './TrelloActionButton';
import { sort } from '../actions/listsActions';

class App extends Component {
	onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}
		this.props.dispatch(
			sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type)
		);
	};

	render() {
		const { lists } = this.props;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<h2>Trello Board</h2>
				<Droppable droppableId="all-lists" direction="horizontal" type="list">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef} style={styles.listContainer}>
							{lists.map((list, index) => (
								<TrelloList
									key={list.id}
									listID={list.id}
									title={list.title}
									cards={list.cards}
									index={index}
								/>
							))}
							{provided.placeholder}
							<TrelloActionButton list />
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

const styles = {
	listContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
};
const mapStateToProps = (state) => ({
	lists: state.lists,
});

export default connect(mapStateToProps)(App);
