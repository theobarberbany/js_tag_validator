import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import Card from '../carbon/Card';
import OverflowMenu from '../carbon/OverflowMenu';
import OverflowMenuItem from '../carbon/OverflowMenuItem';
import CardFooter from '../carbon/CardFooter';
import CardContent from '../carbon/CardContent';
import CardStatus from '../carbon/CardStatus';

const cardProps = {
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuProps = {
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const overflowMenuItemProps = {
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  className: 'some-class',
};

//Calls func when file is dropped, if func is defined.
const boxTarget = {
	drop(props, monitor) {
		if (props.onDrop) {
			props.onDrop(props, monitor)
		}
	},
}

class FileHandler extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func,
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    
    return connectDropTarget(
      <div>
      <Card {...cardProps}>
        <CardContent
          cardTitle={this.props.cardTitle}
          cardIcon={this.props.cardIcon}
          cardInfo={this.props.cardInfo}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Info"
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={this.props.status} />
        </CardFooter>
      </Card>
      </div>)
  }
}
//This is bloody awful, rewrite if it works to make clearer
export default connect((state) => {
  return {
    cardTitle: state.fileHandler.cardTitle,
    cardIcon : state.fileHandler.cardIcon,
    cardInfo : state.fileHandler.cardInfo,
    status : state.fileHandler.status
  };
})(DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(FileHandler));