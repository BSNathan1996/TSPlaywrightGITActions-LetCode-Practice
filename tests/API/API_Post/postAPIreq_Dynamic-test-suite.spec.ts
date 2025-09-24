import { expect, test } from '@playwright/test';
import baseurl from '../../../testData/api_Req/baseURL.json'
import path from 'path'
import {functionFormatAPIReq} from '../../../common/helper'
import fs from 'fs'

test("Create POST api request using dynamic file", async({request})=>{
    
    //reading the json dynamic file for POST API
    const filePath = path.join(__dirname,'../../../testData/api_Req/POST_API_Dy_req.json')
    const JsonTemplate = fs.readFileSync(filePath, 'utf-8')
    
    // Values to pass to the JSON File that we created and reading in the above line
    const values = ['Nathan','QA Automation Engineer','1000000','Odisha'];
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
    expect (jsonResponse.booking.firstname).toBe("Nathan");
    expect (jsonResponse.booking.totalprice).toBe(1000000);
    expect (jsonResponse.booking.additionalneeds).toBe("Odisha");
})
