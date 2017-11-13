// Display results of querying database json
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ObjectInspector } from "react-inspector";
import DatabaseItem from "./DatabaseItem";

import "./DatabaseContainer.css";

import {
  Accordion,
  AccordionItem,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ModalWrapper
} from "carbon-components-react";

//Don't want to import a whole library for one function.
// arrayCompare :: (a -> a -> Bool) -> [a] -> [a] -> Bool
export const arrayCompare = f => ([x, ...xs]) => ([y, ...ys]) => {
  if (x === undefined && y === undefined) return true;
  else if (!f(x)(y)) return false;
  else return arrayCompare(f)(xs)(ys);
};

//equal :: a -> a -> Bool
export const equal = x => y => x === y;

// arrayEqual :: [a] -> [a] -> Bool
export const arrayEqual = arrayCompare(equal);

export const includesArray = (array, comparator) => {
  return array.some(item => {
    //console.log("Item: ", item, "Comp: ", comparator);
    return arrayEqual(item)(comparator);
  });
};

export const distinctArray = array =>
  array.reduce((acc, cur) => {
    //console.log("Acc: ", acc, "Cur: ", cur);
    includesArray(acc, cur) ? null : acc.push(cur);
    return acc;
  }, []);

// const distinctArray = array => {
//   let outputArray = [];
//   array.forEach(
//     item => (includesArray(outputArray, item) ? null : outputArray.push(item))
//   );
//   return outputArray;
// };

export const getCount = tags => {
  let flattened = Object.keys(tags)
    .map(tag => tags[tag])
    .reduce((a, c) => a.concat(c), []);
  console.log(flattened);
  let distinctFlattened = distinctArray(flattened);

  let count = [...new Set(distinctFlattened)].map(tagGroup => [
    tagGroup,
    flattened.filter(x => arrayEqual(x)(tagGroup)).length
  ]);
  console.log("distinct: ", count);
  return count;
};

//tags and tagsConcat are objects where the key is the tag or concatenated tag
//and the value is an array containing arrays of tag sets of the form:
//[142, "Magic Tag Group"]
export const DatabaseContainer = ({ tags, tagsConcat }) => (
  <Accordion>
    <AccordionItem title="Database: Individual Tags">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Group name </TableHeader>
            <TableHeader> Group ID </TableHeader>
            <TableHeader> Matches </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {getCount(tags).map(tagGroup => (
            <DatabaseItem
              key={tagGroup[0][0]}
              id={tagGroup[0][0]}
              name={tagGroup[0][1]}
              matches={tagGroup[1]}
            />
          ))}
        </TableBody>
      </Table>
      <div id="Modal">
        <ModalWrapper
          id="detail-modal"
          buttonTriggerText="Detailed Results"
          modalLabel="Detailed Results"
          modalHeading="Single Tags"
          passiveModal
        >
          <div className="bx--modal-content__text">
            <div id="Inspector">
              <ObjectInspector expandLevel={3} data={tags} />
            </div>
          </div>
        </ModalWrapper>
      </div>
    </AccordionItem>
    <AccordionItem title="Database: Concatenated Tags">
      <Table>
        <TableHead>
          <TableRow header>
            <TableHeader> Group name </TableHeader>
            <TableHeader> Group ID </TableHeader>
            <TableHeader> Matches </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {getCount(tagsConcat).map(tagGroup => (
            <DatabaseItem
              key={tagGroup[0][0]}
              id={tagGroup[0][0]}
              name={tagGroup[0][1]}
              matches={tagGroup[1]}
            />
          ))}
        </TableBody>
      </Table>
      <div id="Modal">
        <ModalWrapper
          id="detail-modal"
          buttonTriggerText="Detailed Results"
          modalLabel="Detailed Results"
          modalHeading="Concatenated Tags"
          passiveModal
        >
          <div className="bx--modal-content__text">
            <div id="Inspector">
              <ObjectInspector expandLevel={3} data={tagsConcat} />
            </div>
          </div>
        </ModalWrapper>
      </div>
    </AccordionItem>
  </Accordion>
);

DatabaseContainer.PropTypes = {
  tags: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array)),
  tagsConcat: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array))
};

export const filterCache = (cache, tags) => {
  //1. filter tags against cache
  let flattened = tags.reduce((acc, cur) => acc.concat(cur), []);
  //console.log(flattened);
  //
  let filtered = flattened.reduce((result, key) => {
    result[key] = cache[key];
    return result;
  }, {});
  return filtered;
};

export const filterCacheConcat = (cache, tags) => {
  let concat = tags.map(e => {
    return e.join("");
  });
  let filtered = concat.reduce((result, key) => {
    result[key] = cache[key];
    return result;
  }, {});
  return filtered;
};
//2. Filter

export const mapStateToProps = state => {
  return {
    tags: filterCache(state.cache.data.tag_db, state.fileHandler.cleanData),
    tagsConcat: filterCacheConcat(
      state.cache.data.tag_db,
      state.fileHandler.cleanData
    )
  };
};

const DatabaseContainerExport = connect(mapStateToProps)(DatabaseContainer);

export default DatabaseContainerExport;
