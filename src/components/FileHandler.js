import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../carbon/Card';
import OverflowMenu from '../carbon/OverflowMenu';
import OverflowMenuItem from '../carbon/OverflowMenuItem';
import CardFooter from '../carbon/CardFooter';
import CardContent from '../carbon/CardContent';
import CardStatus from '../carbon/CardStatus';
import CardActions from '../carbon/CardActions';
import CardActionItem from '../carbon/CardActionItem';

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
  static propTypes = {
    status: PropTypes.number,
    active: PropTypes.bool,
  }

  static defaultProps = {
    status: CardStatus.appStatus.NOT_RUNNING,
    active: false
  }

  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    };
  }

  render() {

    return (
      (this.props.active) ? (<Card {...cardProps}>
        <CardContent
          cardTitle="Crunching Numbers"
          cardIcon="copy"
          cardInfo={['Won\'t be a minute']}
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
      : (this.props.inactive) ? (<Card {...cardProps}>
        <CardContent
          cardTitle="Get started!"
          cardIcon="copy"
          cardInfo={['Drop manifest file here']}
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
      : (<Card {...cardProps}>
        <CardContent
          cardTitle="App Title 1"
          cardInfo={['Won\'t be a minute']}
        >
          <OverflowMenu {...overflowMenuProps}>
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Stop App"
              onClick={this.stopApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Restart App"
              onClick={this.restartApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Rename App"
              onClick={this.renameApp}
            />
            <OverflowMenuItem
              {...overflowMenuItemProps}
              itemText="Delete App"
              hasDivider
              onClick={this.deleteApp}
            />
          </OverflowMenu>
        </CardContent>
        <CardFooter>
          <CardStatus status={this.state.status} />
          <CardActions>
            <CardActionItem iconName="restart--glyph" onClick={this.restartApp} description="Restart App" />
            <CardActionItem iconName="launch--glyph" onClick={this.goToApp} description="Go To App" />
            <CardActionItem iconName="favorite" onClick={this.favoriteApp} description="Favorite App" />
          </CardActions>
        </CardFooter>
      </Card>)
    );
  }
}

export {FileHandler};