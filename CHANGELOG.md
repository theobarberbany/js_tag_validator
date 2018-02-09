#### Changelog 
0.1b : Initial beta release (27/11/2017)

* Initial functionality for testing:
    *  Input a Manifest CSV
    *  Run validation (complexity and tag clash) (Validator.js) on parsed csv data
    *  Check to see that a whole, or a subset of a single set of Oligos is being used (Check against 'database')
    *  Use sentry for error tracking.

* 0.11b : Additional Features and various bug fixes.
    * Improved Parsing. App scans for headers instead of looking in a fixed position.
    * Improved Logging / Analytics 
    * Push all dropped data to S3.
