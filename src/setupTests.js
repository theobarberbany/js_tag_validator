//Polyfill for react 16 and enzyme.
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

//requestAnimationFrame Polyfill. 
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};