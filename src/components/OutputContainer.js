// Display output from validator.js
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody
} from "carbon-components-react";

import OutputItem from "./OutputItem";

export const OutputContainer = composition => (
  <Accordion>
    <AccordionItem title="Composition: Tag 1">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Column </TableHeader>
            <TableHeader> A </TableHeader>
            <TableHeader> T </TableHeader>
            <TableHeader> C </TableHeader>
            <TableHeader> G </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {composition.composition[0].map((tag, index) => (
            <OutputItem
              key={index}
              colNo={index}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={tag.reduce((prev, curr) => prev + curr)}
            />
          ))}
        </TableBody>
      </Table>
    </AccordionItem>
    <AccordionItem title="Composition: Tag 2">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Column </TableHeader>
            <TableHeader> A </TableHeader>
            <TableHeader> T </TableHeader>
            <TableHeader> C </TableHeader>
            <TableHeader> G </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {composition.composition[1].map((tag, index) => (
            <OutputItem
              key={index}
              colNo={index}
              a={tag[0]}
              t={tag[1]}
              c={tag[2]}
              g={tag[3]}
              sum={tag.reduce((prev, curr) => prev + curr)}
            />
          ))}
        </TableBody>
      </Table>
    </AccordionItem>
  </Accordion>
);

OutputContainer.PropTypes = {
  composition: PropTypes.shape({
    composition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  })
};

export const mapStateToProps = state => {
  return {
    composition: state.fileHandler.overview.composition
  };
};

const OutputContainerExport = connect(mapStateToProps)(OutputContainer);

export default OutputContainerExport;
