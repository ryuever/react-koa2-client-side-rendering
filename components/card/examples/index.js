import React from 'react';
import { render } from 'react-dom';

import { Button } from 'react-eva';
import Card from '../Card';

import 'wall-e';

const App = () => (
  <Card title="上海证券大厦-21楼" meta="浦东新区上海证券大厦南塔21楼" foot={
    <Button type="primary">Action</Button>
  }>
    <p>Answer to The Ultimate Question of Life, the Universe, and Everything.</p>
  </Card>
);

render(
  <App />,
  document.querySelector('#app')
);
