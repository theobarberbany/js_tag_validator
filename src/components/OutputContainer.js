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

export const OutputContainer = ({ composition, indexing }) => (
  <div>
    {console.log("HERE", composition)}
    {indexing === "dual" ? (
      <Accordion>
        <AccordionItem title="Composition: Index read 1">
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
              {composition[0].map((tag, index) => (
                <OutputItem
                  key={index}
                  colNo={index + 1}
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
        <AccordionItem title="Composition: Index read 2">
          <Table>
            <TableHead>
              <TableRow header>
                <TableHeader> Cycle </TableHeader>
                <TableHeader> A </TableHeader>
                <TableHeader> T </TableHeader>
                <TableHeader> C </TableHeader>
                <TableHeader> G </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {composition[1].map((tag, index) => (
                <OutputItem
                  key={index}
                  colNo={index + 1}
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
    ) : (
      <Accordion>
        <AccordionItem title="Composition: Index read">
          <Table>
            <TableHead>
              <TableRow header>
                <TableHeader> Cycle </TableHeader>
                <TableHeader> A </TableHeader>
                <TableHeader> T </TableHeader>
                <TableHeader> C </TableHeader>
                <TableHeader> G </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {composition.map((tag, index) => (
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
    )}
  </div>
);

OutputContainer.PropTypes = {
  composition: PropTypes.shape({
    composition: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
  }),
  indexing: PropTypes.string
};

export const mapStateToProps = state => {
  return {
    composition: state.fileHandler.overview.composition
  };
};

const OutputContainerExport = connect(mapStateToProps)(OutputContainer);

export default OutputContainerExport;
