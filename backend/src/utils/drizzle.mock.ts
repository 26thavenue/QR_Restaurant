import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import db from "../db"

const drizzleMock: DeepMockProxy<typeof db> = mockDeep();

jest.mock('../src/index', () => ({
  __esModule: true,
  ...jest.requireActual('../src/index'),
  default: drizzleMock,
}));

beforeEach(() => {
  mockReset(drizzleMock);
});

export default drizzleMock;