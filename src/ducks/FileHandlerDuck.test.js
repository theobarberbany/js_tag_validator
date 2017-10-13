import reducer from './FileHandlerDuck';

test('FileHandler reducers', () => {
    let state;
    state = reducer(undefined, {});
    expect(state).toEqual({cardTitle:'Get started',cardIcon:'copy',cardInfo:['Drop manifest file here'],status:1});
    state = reducer(undefined, {type:'DROP_FILE'});
    expect(state).toEqual({cardTitle:'Crunching Numbers',cardIcon:'copy',cardInfo:['Won\'t be a minute'],status:0}); 
  });
  