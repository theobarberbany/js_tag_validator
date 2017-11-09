// Display Warnings from validator.js
import React from "react";
import { connect } from "react-redux";
import * as fileHandlerActionCreators from "../ducks/FileHandlerDuck";
import PropTypes from "prop-types";
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell
} from "carbon-components-react";
import WarningItem from "./WarningItem";

export const WarningContainer = ({ badPairs, badPairsConcat, onClick }) => (
  <StructuredListWrapper selection border>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>{""}</StructuredListCell>
        <StructuredListCell head>Tag 1</StructuredListCell>
        <StructuredListCell head>Tag 2</StructuredListCell>
        <StructuredListCell head>Difference</StructuredListCell>
        <StructuredListCell head>Position in manifest</StructuredListCell>
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
          pos="n/a"
          onClick={e => {
            e.preventDefault();
            onClick(badPair.id);
          }}
        />
      ))}
    </StructuredListBody>
  </StructuredListWrapper>
);

WarningContainer.PropTypes = {
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

//Once checked off, remove from list.
export const getVisibleWarnings = badPairs => {
  return badPairs.filter(bp => !bp.completed);
};

export const mapStateToProps = state => {
  return {
    badPairs: getVisibleWarnings(state.fileHandler.badPairs),
    badPairsConcat: getVisibleWarnings(state.fileHandler.badPairsConcat)
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onClick: id => {
      console.log("Id passed: ", id);
      dispatch(fileHandlerActionCreators.toggleTagPair(id));
    }
  };
};

const WarningContainerExport = connect(mapStateToProps, mapDispatchToProps)(
  WarningContainer
);

export default WarningContainerExport;
