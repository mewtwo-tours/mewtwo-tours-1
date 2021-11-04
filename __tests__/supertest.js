const request = require('supertest');

const { response } = require('express');

const server = 'http://localhost:3000';


describe('Route integration', () => {
  describe('/listings', () => {
    describe('POST', () => {
    //  jest.setTimeout(10000)
      it('responds with 200 status and sucess message', () => {
        
        const listingData = {
          
            title: 'test title',
            description:'test desc',
            street_address:'323 stagg street',
            city: 'Brooklyn', 
            state:'New York',  
            upvote: 1, 
            posted_by: '281b44e8-3b84-11ec-aeff-e504b5473cf2',
            image: '1234567890'
          
        }
        return request(server)
          .post('/listings')
          .send(listingData)
          .expect(200)
          .expect({success:true});
      });
    });
  });

  describe('/listings', () => {
    describe('pos', () => {
      it('responds with 200 status and application/json content type', () => {
        const body = {
          latitude: 40.7103902, 
          longitude: -73.9360982
        }
        return request(server)
          .post('/listings/get')
          .send(body)
          .expect(200)
          .expect({});
      });

      
      it('responds to invalid route with 404 error', () => {
               
        return request(server)
          .put('/wrong')
          .expect(404)
          .expect('Not Found');
        
      });
    });
  });
});
