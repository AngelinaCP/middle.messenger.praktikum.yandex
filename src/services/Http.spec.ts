import { createSandbox, type SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import { expect, use } from 'chai';
import { HTTP } from './index';
import { afterEach, beforeEach } from 'mocha';
import { baseUrl } from '../utils/urls';

describe('Http', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTP;
  let request: SinonStub;

  beforeEach(() => {
    http = new HTTP('/');
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(async () => { await Promise.resolve(); });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('HTTP requests', () => {
    it('POST', async () => {
      await http.post(`${baseUrl}/test`);
      expect(request).to.have.been.calledWith(`${baseUrl}/test`, { data: undefined, method: 'POST' });
    });

    it('GET', async () => {
      await http.get(`${baseUrl}/test`);
      expect(request).to.have.been.calledWith(`${baseUrl}/test`, { data: undefined, method: 'GET' });
    });

    it('PUT', async () => {
      await http.put(`${baseUrl}/test`);
      expect(request).to.have.been.calledWith(`${baseUrl}/test`, { data: undefined, method: 'PUT' });
    });

    it('DELETE', async () => {
      await http.delete(`${baseUrl}/test`);
      expect(request).to.have.been.calledWith(`${baseUrl}/test`, { data: undefined, method: 'DELETE' });
    });
  });
});
