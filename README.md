## Javascript Tag Validator
---
[![Build Status](https://travis-ci.org/theobarberbany/js_tag_validator.svg?branch=master)](https://travis-ci.org/theobarberbany/js_tag_validator) [![codecov](https://codecov.io/gh/theobarberbany/js_tag_validator/branch/master/graph/badge.svg)](https://codecov.io/gh/theobarberbany/js_tag_validator)[![Greenkeeper badge](https://badges.greenkeeper.io/theobarberbany/js_tag_validator.svg)](https://greenkeeper.io/)

Clone the repo then run `npm install` or `yarn install`

(Currently tested and working with yarn 1.3.2, npm 5.6.0 and node version(s) 9.3.0 8.9.4)

UI is designed with [sketch](https://www.sketchapp.com/), and can be found in ui.sketch

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

---

###### Commands:

  - start dev server: `yarn start`

  - run tests: `yarn test`

  - build for production: `yarn build`  :shipit:

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

###### Sentry (Error Handling)

Sentry is used for error tracking.  All config is within `src/index.js`, 

Each new release corresponds to a new release within Sentry. This makes it easy to see if users of an older version are reporting errors from known bugs. See [releases](https://docs.sentry.io/learn/releases/) for the documentation on using releases.

Errors within the application lifecycle methods are caught by [error boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html), a react 16 feature. A single error boundary is currently used, with Sentry integration. It is defined in `src/components/SentryBoundary.js`. There is room for additional, more specialised error boundaries that may be added later. (e.g A parser failure should look different to a validation or database function failing to run)

The boundaries are defined in `/src/components/FileHandlerContainer.js` where The `<SentryBoundary>` component wraps the respective container component. This way, if the component fails to mount, the entire application does not unmount. Coarser, or finer grained options are possible. 

---

###### Travis CI

Travis CI is used for continuous integration. Currently the configuration runs with node v8. Node v6 does not currently work due to the lack of `Object.entries` added in ES17. 

Documentation for changing slack integration can be found [here](https://docs.travis-ci.com/user/notifications/#Configuring-slack-notifications)

[Codecov](https://codecov.io/) is used to track coverage. Results are automatically uploaded after each Travis build. The codecov token is encrypted in the same way the slack one is, and is stored in the `env:` section. See [here](https://github.com/codecov/example-node) for an example node repository.  

[Greenkeeper](https://greenkeeper.io/docs.html) is used to track and keep npm dependencies up to date. [Docs](https://greenkeeper.io/docs.html)

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
 - [Raven Middleware for Redux](https://github.com/captbaritone/raven-for-redux)
 - [Raven-js](https://github.com/getsentry/raven-js)
 - [Redux-segment](https://github.com/rangle/redux-segment)
