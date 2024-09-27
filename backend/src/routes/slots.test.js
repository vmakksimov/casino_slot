const request = require('supertest');
const app = require('../app');

describe('Game Slots API', () => {

    describe("Test /GET RTP", () => {

        test("It shoud respond with 200", async () => {
            const response = await request(app)
                .get('/rtp')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.statusCode).toBe(200);
        })

        test("It shoud respond with 200", async () => {
            const response = await request(app)
                .get('/wallet/balance')
                .expect(200);

            expect(response.statusCode).toBe(200);
        })

        
    })

    describe("Test /POST Game", () => {
        const bet = 5;
        test("It shoud respond with 200", async () => {
            const response = await request(app)
                .post('/play')
                .send({bet})
                .expect('Content-Type', /json/)
                .expect(200);

            
                expect(response.body).toEqual(
                    expect.objectContaining({
                        matrix: expect.any(Array),  
                        winnings: expect.any(Number)
                    })
                );
            

        })
    })

    describe("Test /POST Deposit", () => {  
        test("It shoud respond with 200", async () => {     
            const response = await request(app)
                .post('/wallet/deposit')
                .send({amount: 10, mode: 'play'})   
                .expect('Content-Type', /json/)
                .expect(200);
                

                expect(response.statusCode).toBe(200);
        })
    })

    describe("Test /POST Withdraw", () => {  
        test("It shoud respond with 200", async () => {     
            const response = await request(app)
                .post('/wallet/withdraw')
                .send({amount: 10, mode: 'play'})   
                .expect('Content-Type', /json/)
                .expect(200);
                

                expect(response.statusCode).toBe(200);
        })  
    })

    describe("Test /GET balance", () => {
        test("It shoud respond with 200", async () => {
            const response = await request(app) 
                .get('/wallet/balance')
                .expect('Content-Type', /json/)
                .expect(200);   

                expect(response.statusCode).toBe(200);
            
                    
        })
    })  
})