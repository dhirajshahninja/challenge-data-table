'use strict';

const React = require('react');
const ReactPivot = require('react-pivot');
const createReactClass = require('create-react-class');

const rows = require('./data.json');

let dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
];

let reduce = function (row, memo) {
  if (row.type === 'impression') memo.impressions = ++memo.impressions || 1;
  if (row.type === 'display') memo.displays = ++memo.displays || 1;
  if (row.type === 'load') memo.loads = ++memo.loads || 1;
  return memo;
};

let calculations = [
  {
    title: 'Impression',
    value: 'impressions',
    template:  (val) => {
      return val.toString()
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: (val) => {
      return val.toString()
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: (val) => {
      return val.toString()
    }
  },
  {
    title: 'Load Rate',
    value: (row) => {
      return ((row.loads / row.impressions) * 100)
    },
    template: (val) => {
      return val.toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: (row) => {
      return ((row.displays / row.loads) * 100)
    },
    template: (val) => {
      return val.toFixed(1) + '%'
    },
    className: 'react-pivot-display-date'
  }
];

module.exports = createReactClass({
  render () {
    return (
      <div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          calculations={calculations}
          reduce={reduce}
          activeDimensions={['Date', 'Host']}
          nPaginateRows={10}
        />
      </div>
    )
  }
});