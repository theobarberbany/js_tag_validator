import React, { Component } from "react";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import PropTypes from "prop-types";
import { Card } from "carbon-components-react";
import { OverflowMenu } from "carbon-components-react";
import { OverflowMenuItem } from "carbon-components-react";
import { CardFooter } from "carbon-components-react";
import { CardContent } from "carbon-components-react";
import { CardStatus } from "carbon-components-react";

export const cardProps = {
  onClick: () => {
    console.log("click");
  }, // eslint-disable-line no-console
  onFocus: () => {
    console.log("focus");
  }, // eslint-disable-line no-console
  className: "some-class"
};

export const overflowMenuProps = {
  onClick: () => {
    console.log("click");
  }, // eslint-disable-line no-console
  onFocus: () => {
    console.log("focus");
  }, // eslint-disable-line no-console
  className: "some-class"
};

export const overflowMenuItemProps = {
  onFocus: () => {
    console.log("focus");
  }, // eslint-disable-line no-console
  className: "some-class"
};

export const visitInfo = () => {
  window.location.assign("https://github.com/theobarberbany/js_tag_validator/");
};

// Calls func when file is dropped, if func is defined. Allowed methods defined
// here (spec)
export const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor);
    }
  }
};

export const mapStateToProps = state => {
  return {
    cardTitle: state.fileHandler.displayProps.cardTitle,
    cardIcon: state.fileHandler.displayProps.cardIcon,
    cardInfo: state.fileHandler.displayProps.cardInfo,
    status: state.fileHandler.displayProps.status
  };
};

class FileHandler extends Component {
  static propTypes = {
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

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
                onClick={visitInfo}
              />
            </OverflowMenu>
          </CardContent>
          <CardFooter>
            <CardStatus status={this.props.status} />
          </CardFooter>
        </Card>
      </div>
    );
  }
}

// Connect the FileHandler Component to react dnd (which is basically a redux
// store)
FileHandler = DropTarget(
  props => props.accepts,
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(FileHandler);
//returns a collect function

FileHandler = connect(mapStateToProps)(FileHandler);

export default FileHandler;
