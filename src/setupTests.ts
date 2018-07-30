import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jestFetchMock from 'jest-fetch-mock';

configure({ adapter: new Adapter() });

(global as any).fetch = jestFetchMock;

if ((global as any).document) {
  (document as any).createRange = () => ({
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
    setEnd: () => ({}),
    setStart: () => ({}),
  });
}