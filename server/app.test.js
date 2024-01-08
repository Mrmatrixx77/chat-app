import { Socket } from 'socket.io';
import app from './app.js';
import request from 'supertest';

//testing standard app connection
let server;
beforeAll(() => {
    server = app.listen(5500); // Random number is needed to avoid using same port in different tests if you run in parallel
 })
 
 afterAll(() => {
    server.close()
 })
 

describe('GET /',()=>{
    it('should create server', async() => {
        const res =   await request(app).get('/');
        expect(res.statusCode).toBe(200);

    });
    it("should emit message",(done)=>{
        server.on("hello",(arg)=>{
            expect(arg).toBe("world")
            done();
        })

        server.emit("hello","world");
    })
})
