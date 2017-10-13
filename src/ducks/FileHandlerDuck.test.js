import reducer from './FileHandlerDuck';

test('reducers', () => {
    let state;
    state = reducer(undefined, {});
    expect(state).toEqual({cardTitle:'Get started',cardIcon:'copy',cardInfo:['Drop manifest file here'],status:1});
  });
  