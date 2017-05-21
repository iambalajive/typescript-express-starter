import {expect}  from 'chai';
import * as request from 'supertest'
import Server from "../src/server";

const app = Server.bootstrap().app;


describe("/ Route should", () => {

    it("return status 200", (done) => {

        request(app).get('/').expect(200)
            .end((err: any, res: any) => {
                done()

            })

    })


})