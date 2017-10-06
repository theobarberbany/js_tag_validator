import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class FileHandler extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
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
      </Card>)
  }
}

export default connect((state) => {
  return {
    cardTitle: state.fileHandler.cardTitle,
    cardIcon : state.fileHandler.cardIcon,
    cardInfo : state.fileHandler.cardInfo,
    status : state.fileHandler.status
  };
})(FileHandler);