const request = require('supertest');
const app = require('../app');

describe('Game Slots API', () => {
  let csrfToken;


  beforeEach(async () => {
    const csrfResponse = await request(app)
      .get('/rtp') 
      .expect(200);


    csrfToken = csrfResponse.headers['set-cookie']
      .find(cookie => cookie.startsWith('csrf-token='))
      .split('csrf-token=')[1]
      .split(';')[0];
  });

  describe("Test /GET RTP", () => {
    test("It should respond with 200", async () => {
      const response = await request(app)
        .get('/rtp')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });

    test("It should respond with 200 for balance check", async () => {
      const response = await request(app)
        .get('/wallet/balance')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test /POST Game", () => {
    const bet = 5;
    test("It should respond with 200 when playing", async () => {
      const response = await request(app)
        .post('/play')
        .set('Cookie', `csrf-token=${csrfToken}`)
        .set('X-CSRF-Token', csrfToken) 
        .send({ bet })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          matrix: expect.any(Array),
          winnings: expect.any(Number),
        })
      );
    });
  });

  describe("Test /POST Deposit", () => {
    test("It should respond with 200 when depositing", async () => {
      const response = await request(app)
        .post('/wallet/deposit')
        .set('Cookie', `csrf-token=${csrfToken}`) 
        .set('X-CSRF-Token', csrfToken) 
        .send({ amount: 10, mode: 'play' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test /POST Withdraw", () => {
    test("It should respond with 200 when withdrawing", async () => {
      const response = await request(app)
        .post('/wallet/withdraw')
        .set('Cookie', `csrf-token=${csrfToken}`)
        .set('X-CSRF-Token', csrfToken)
        .send({ amount: 10, mode: 'play' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("Test /GET balance", () => {
    test("It should respond with 200 when checking balance", async () => {
      const response = await request(app)
        .get('/wallet/balance')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.statusCode).toBe(200);
    });
  });
});
