import sinon from 'sinon';
import { expect } from 'chai';
import { router } from './index';

describe('Router', () => {
  const Block = class {
    getContent () {
      return sinon.fake.returns(document.createElement('div'));
    }
  } as any;

  it('should be of Router instance', () => {
    const result = router.use('/', Block);

    expect(result).to.eq(router);
  });

  it('should redirect to /', () => {
    router
      .use('/', Block)
      .start();

    router.go('/');

    expect(global.window.location.pathname).to.eq('/');
  });

  it('should redirect to /sign-up', () => {
    router
      .use('/sign-up', Block)
      .start();

    router.go('/sign-up');

    expect(global.window.location.pathname).to.eq('/sign-up');
  });
});
