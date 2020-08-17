import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreator from '../actions/listsActions';
class TrelloCard extends Component {
	constructor(props) {
		super(props);
	}

	handleDeleteCard = () => {
		this.props.actionCreator.deleteCard(this.props.listID, this.props.id);
	};

	render() {
		const { text, id, index, listID } = this.props;
		return (
			<Draggable draggableId={String(id)} index={index}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<Card style={styels.cardContainer}>
							<CardContent>
								<Typography gutterBottom>{text}</Typography>
								<div style={styels.icon} onClick={this.handleDeleteCard}>
									<Icon>delete</Icon>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</Draggable>
		);
	}
}

const styels = {
	cardContainer: {
		marginBottom: 8,
	},
	icon: {
		marginLeft: 250,
		cursor: 'pointer',
	},
};

const mapDispatchToProps = (dispatch) => {
	return {
		actionCreator: bindActionCreators(actionCreator, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(TrelloCard);
