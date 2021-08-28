import * as chai           from 'chai';
import * as request        from 'supertest';
import { httpServer }      from "../src";
import { SuperTest, Test } from "supertest";

let assert = chai.assert;
let testServer: SuperTest<Test>;

before(async () => {
  testServer = request(httpServer);
});

after(async () => {
});

describe('Koa Server', () => {
  it('stress_test_controller', async () => {
    const response = await testServer
      .get('/')
      .send({})
      .expect(200);
    let data = JSON.parse(response.text);
    assert.equal(data.respond, 1);
  }).timeout(10000);
});
