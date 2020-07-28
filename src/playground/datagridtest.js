import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'title', name: 'Title' },
  { key: 'count', name: 'Count' } ];

const rows = [{title: 'row1', count: 20}, {title: 'row1', count: 40}, {title: 'row1', count: 60}];



export default function HelloWorld() {
  return (<ReactDataGrid
  columns={columns}
  rowGetter={i => rows[i]}
  rowsCount={5}
  minHeight={150} />);
}