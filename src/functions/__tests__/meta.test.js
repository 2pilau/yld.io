/* eslint-env jest */
import MetaUtil from '../../../src/functions/oss/meta';

import ossUtils from '../../../src/functions/oss/utils';
ossUtils.updateEntry = jest
  .fn()
  .mockImplementation(() => Promise.resolve(null));

const contentfulMetasMock = [
  {
    fields: {
      contributionsCount: { 'en-US': 3886 },
      reposContributedToCount: { 'en-US': 1001 },
    },
  },
];

describe('Github lambda - Meta util', () => {
  let mockedEnvironment;

  beforeEach(() => {
    process.env.LAMBDA_ENV = 'production';
    mockedEnvironment = {
      getEntries: jest.fn().mockReturnValue({ items: contentfulMetasMock }),
    };
  });

  afterEach(() => {
    delete process.env.LAMBDA_ENV;
    jest.clearAllMocks();
  });

  it('should not call updateEntry and should return the expected data if github and contentful MetaDatas are not different', async () => {
    const sameGithubMetaData = {
      contributionsCount: 3886,
      reposContributedToCount: 1001,
    };

    const response = await MetaUtil(mockedEnvironment, sameGithubMetaData);

    expect(ossUtils.updateEntry).not.toHaveBeenCalled();

    const expected = { ...sameGithubMetaData };
    expect(response).toStrictEqual(expected);
  });

  it('should call updateEntry and should return the expected data if github and contentful MetaDatas are different', async () => {
    const differentGithubMetaData = {
      contributionsCount: 3999,
      reposContributedToCount: 1017,
    };

    const expectedContentfulData = {
      contributionsCount: { 'en-US': 3999 },
      reposContributedToCount: { 'en-US': 1017 },
    };

    const response = await MetaUtil(mockedEnvironment, differentGithubMetaData);

    expect(ossUtils.updateEntry).toHaveBeenCalledWith(
      contentfulMetasMock[0],
      expectedContentfulData,
      mockedEnvironment,
      'github meta data',
    );

    const expected = { ...differentGithubMetaData };
    expect(response).toStrictEqual(expected);
  });
});
