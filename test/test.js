const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const chaihttp = require('chai-http');
const baseurl = 'http://localhost:8000/api/v1/element';
chai.use(chaihttp);
//test cases
describe('App',()=>{
    let elementId;
    it('Create Dynamic Element Without type/name',(done)=>{
      try{
        let message;
        let element ={
          attributes : 'type,size,name',
          attval : 'text,50,name'
        };
        chai.request(baseurl)
         .post('/property')
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Create Dynamic Element With Attributes',(done)=>{
      try{
        let message;
        let element ={
          type : 'input',
          value : 'Lets create a Dynamic Element',
          attributes : 'type,size,name',
          attval : 'text,50,name'
        };
        chai.request(baseurl)
         .post('/property')
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Create Dynamic Element Without Attributes',(done)=>{
      try{
        let message;
        let element ={
          type : 'h1',
          value : 'Lets create a Dynamic Element'
        };
        chai.request(baseurl)
         .post('/property')
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            elementId = res['text'] ? res['text'] : '';
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
     it('Update Element Without Attributes',(done)=>{
      try{
        let message;
        let element ={
          type : 'h1',
          value : 'Lets change the Dynamic Element'
        };
        chai.request(baseurl)
         .put(`/property/${elementId}`)
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Update Element With Attributes',(done)=>{
      try{
        let message;
        let element ={
          type : 'h1',
          value : 'Lets create a Dynamic Element',
          attributes : 'id',
          attval : 'h1dynamic'
        };
        chai.request(baseurl)
         .put(`/property/${elementId}`)
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Update Dynamic Element Without Element Id',(done)=>{
      try{
        let message;
        let element ={
          type : 'h1',
          value : 'Lets create a Dynamic Element',
          attributes : 'id',
          attval : 'h1dynamic'
        };
        chai.request(baseurl)
         .put(`/property/${elementId}`)
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Get Dynamic Element',(done)=>{
      try{
        let message;
        chai.request(baseurl)
         .get(`/property/${elementId}`)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });
    it('Create Dynamic Element With Attribute and Value Mismatch',(done)=>{
      try{
        let message;
        let element ={
          type : 'input',
          value : 'Lets create a Dynamic Element',
          attributes : 'type,size,name',
          attval : 'text,50'
        };
        chai.request(baseurl)
         .post('/property')
         .send(element)
         .end((err,res)=>{
            message = res.error["text"];
            console.log(res['text']);
            assert.equal(res.statusCode,200,message);
            done();
         });
        } catch(err){
            console.log(err)
        }
    });

})