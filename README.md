## Javascript Tag Validator
=======
[![Build Status](https://travis-ci.org/theobarberbany/js_tag_validator.svg?branch=master)](https://travis-ci.org/theobarberbany/js_tag_validator) [![codecov](https://codecov.io/gh/theobarberbany/js_tag_validator/branch/master/graph/badge.svg)](https://codecov.io/gh/theobarberbany/js_tag_validator)



Clone the repo then run `npm install` or `yarn install`

UI is designed with [sketch](https://www.sketchapp.com/), and can be found in ui.sketch

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

---

###### Commands:

  - start dev server: `yarn start`

  - run tests: `yarn test`

  - build for production: `yarn build`

  - eject (don't do..): `yarn eject`

---

###### Testing

  * tests are run by [Jest](https://facebook.github.io/jest/) running "yarn test" will
    scan the entire src folder for "x.test.js" files, the __tests__ folder for test files to run.
    Tests are run using nodejs with jsdom.

  *  Tests are formatted using the [expect](https://facebook.github.io/jest/docs/en/expect.html) statement. 
     Snapshot testing is also supported.
    
  * [Enzyme](http://airbnb.io/enzyme/) is used for test rendering.

---

###### Directory / File Structure

**React Components**

  * All components go into `/src/components/{ComponentName}`

**Redux**

  * Currently using [redux ducks](https://github.com/erikras/ducks-modular-redux) but transitioning to [re-ducks](https://github.com/alexnm/re-ducks) following the suggestions from [here](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be)


---

###### Libraries used :

 - [React](https://reactjs.org/)
 - [Redux](https://github.com/reactjs/redux)
 - [Redux thunk](https://github.com/gaearon/redux-thunk)
 - [React-redux](https://github.com/reactjs/react-redux)
 - [Isomorphic Fetch](https://github.com/matthew-andrews/isomorphic-fetch)
 - [Carbon components design kit](http://carbondesignsystem.com/)
 - [React DnD](https://github.com/react-dnd/react-dnd)
 - [Redux Dev tools](https://github.com/zalmoxisus/redux-devtools-extension) (chrome extension)
 - [React Inspector](https://github.com/xyc/react-inspector)
