import React, { Component } from 'react';
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

    this.state = {
      cardTitle: "Get started",
      cardIcon: "copy",
      cardInfo:['Drop manifest file here'], 
      status: CardStatus.appStatus.NOT_RUNNING,
    };
  }

  render() {

    return (
      <Card {...cardProps}>
        <CardContent
          cardTitle={this.state.cardTitle}
          cardIcon={this.state.cardIcon}
          cardInfo={this.state.cardInfo}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Info"
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={this.state.status} />
        </CardFooter>
      </Card>)
  }
}

export {FileHandler};