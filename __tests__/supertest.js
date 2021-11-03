const request = require('supertest');

const { response } = require('express');

const server = 'http://localhost:3000';


describe('Route integration', () => {
  describe('/listings', () => {
    describe('POST', () => {
     
      it('responds with 200 status and text/html content type', () => {
        const listingData = {
          
            title: 'test title',
            description:'test desc',
            street_address:'323 stagg street',
            city: 'Brooklyn', 
            state:'New York',  
            upvote: 1, 
            posted_by: '281b44e8-3b84-11ec-aeff-e504b5473cf2'
          
        }
        return request(server)
          .post('/')
          .send()
          .expect(200);
      });
    });
  });

  describe('/listings', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/listings')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      
   


      it('responds to invalid request with 400 status and error message in body', () => {
               
        return request(server)
          .put('/wrong')
          .expect(400)
          .expect({ error: {} });
        
      });
    });
  });
});
