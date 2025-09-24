import { expect, test } from '@playwright/test';
import baseurl from '../../../testData/api_Req/baseURL.json'
import path from 'path'
import {functionFormatAPIReq} from '../../../common/helper'
import fs from 'fs'
import {faker} from '@faker-js/faker'

test("Create POST api request using dynamic file using auto data generation", async({request})=>{
    
    //reading the json dynamic file for POST API
    const filePath = path.join(__dirname,'../../../testData/api_Req/POST_API_Dy_req.json')
    const JsonTemplate = fs.readFileSync(filePath, 'utf-8')
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const price = faker.number.int({
        min:999, 
        max: 100000
    })
    const additionalneeds = faker.word.words({
        count: 7
    })

    // Values to pass to the JSON File that we created and reading in the above line
    const values = [firstName, lastName, price, additionalneeds];
    const postAPIreq = await functionFormatAPIReq(JsonTemplate, values)

    const postAPIresponse = await request.post(`${baseurl.url}/booking`,{
        data: JSON.parse(postAPIreq)
    });
    const jsonResponse = await postAPIresponse.json();
    console.log('Post API response: ' +JSON.stringify(jsonResponse, null, 2));
    // validate status
    expect (postAPIresponse.status()).toBe(200);
    expect (postAPIresponse.headers()['content-type']).toContain('application/json');

    // validate property
    expect (jsonResponse.booking).toHaveProperty("firstname");
    expect (jsonResponse.booking).toHaveProperty("totalprice");
    expect (jsonResponse.booking).toHaveProperty("depositpaid");
    expect (jsonResponse.booking.bookingdates).toHaveProperty("checkin");
    expect (jsonResponse.booking.bookingdates).not.toHaveProperty("extraHours");

    // validate the response body
    expect (jsonResponse.bookingid).toBeGreaterThan(0);
    expect (jsonResponse.booking.firstname).toBe(firstName);
    expect (jsonResponse.booking.totalprice).toBe(price);
    expect (jsonResponse.booking.additionalneeds).toBe(additionalneeds);
})
