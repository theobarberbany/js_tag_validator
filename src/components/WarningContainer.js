// Display Warnings from validator.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { setVisibilityFilter, VisibilityFilters } from "../ducks/warningDuck";
import * as warningContainerActionCreators from "../ducks/warningDuck";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell
} from "carbon-components-react";
import WarningItem from "./WarningItem";

export class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name;
    }

    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}
      >
        {name}
      </a>
    );
  }

  render() {
    return (
      <p>
        Show: {this.renderFilter("SHOW_ALL", "All")}
        {", "}
        {this.renderFilter("SHOW_COMPLETED", "Completed")}
        {", "}
        {this.renderFilter("SHOW_ACTIVE", "Active")}
        .
      </p>
    );
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(["SHOW_ALL", "SHOW_COMPLETED", "SHOW_ACTIVE"])
};

export class WarningContainer extends Component {
  render() {
    const {
      dispatch,
      visibilityFilter,
      badPairs,
      badPairsConcat,
      onClick
    } = this.props;
    return (
      <div>
        <Accordion
          style={{
            background:
              badPairs.length + badPairsConcat.length === 0
                ? "rgba(92, 167, 0, 0.55)"
                : "rgba(231, 29, 50, 0.55)"
          }}
        >
          <AccordionItem title="Tag Clash">
            <StructuredListWrapper selection border>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head>{""}</StructuredListCell>
                  <StructuredListCell head>Tag</StructuredListCell>
                  <StructuredListCell head>Clashing Tag</StructuredListCell>
                  <StructuredListCell head>Difference</StructuredListCell>
                  <StructuredListCell head>
                    Position in manifest
                  </StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>
              <StructuredListBody>
                {badPairs.map(badPair => (
                  <WarningItem
                    key={badPair.id}
                    {...badPair}
                    onClick={e => {
                      e.preventDefault();
                      onClick(badPair.id);
                    }}
                  />
                ))}
                {badPairsConcat.map(badPair => (
                  <WarningItem
                    key={badPair.id}
                    {...badPair}
                    onClick={e => {
                      e.preventDefault();
                      onClick(badPair.id);
                    }}
                  />
                ))}
              </StructuredListBody>
            </StructuredListWrapper>
            <Footer
              filter={visibilityFilter}
              onFilterChange={nextFilter =>
                dispatch(setVisibilityFilter(nextFilter))}
            />
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

WarningContainer.propTypes = {
  badPairs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tag1: PropTypes.string.isRequired,
      tag2: PropTypes.string.isRequired,
      diff: PropTypes.number.isRequired,
      pos: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export const getVisibleWarnings = (warnings, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return warnings;
    case VisibilityFilters.SHOW_COMPLETED:
      return warnings.filter(warning => warning.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return warnings.filter(warning => !warning.completed);
    default:
      return warnings;
  }
};

export const mapStateToProps = state => {
  return {
    badPairs: getVisibleWarnings(
      state.warningContainer.warningItems.badPairs,
      state.warningContainer.visibilityFilter
    ),
    badPairsConcat: getVisibleWarnings(
      state.warningContainer.warningItems.badPairsConcat,
      state.warningContainer.visibilityFilter
    )
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onClick: id => {
      console.log("Id passed: ", id);
      dispatch(warningContainerActionCreators.toggleTagPair(id));
    },
    dispatch: arg => {
      dispatch(arg);
    }
  };
};

const WarningContainerExport = connect(mapStateToProps, mapDispatchToProps)(
  WarningContainer
);

export default WarningContainerExport;
