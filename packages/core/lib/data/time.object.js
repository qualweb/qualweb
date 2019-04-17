/**
 * Author: João Afonso Vicente
 * 
 * Description: 
 *
 * Notes:
 *
 * Last modified: 21/02/2019
 */
'use strict';

// requires
const _ = require('lodash');

/**
 * Time object
 */
class Time {
	
  constructor(start=null) {
    this.start = start;
    this.end = null;
    this.duration = null;
  }

  _setStart(start) {
    this.start = start;
  }

  _setEnd(end) {
    this.end = end;
    this._calculateDuration();
  }

  _getDuration() {
    return _.clone(this.duration);
  }

  _calculateDuration() {
    this.duration = Number(this.end) - Number(this.start);
  }

  toJson() {
    return _.clone({
      start: this.start,
      end: this.end,
      duration: this.duration
    });
  }
}

module.exports = Time;