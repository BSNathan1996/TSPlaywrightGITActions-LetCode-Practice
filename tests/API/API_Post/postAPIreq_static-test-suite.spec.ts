import { expect, test } from '@playwright/test';
import baseurl from '../../../testData/api_Req/baseURL.json'
import postAPIreq from '../../../testData/api_Req/POST_API_req.json'

test("Create POST api request using static file", async({request})=>{
    const postAPIresponse = await request.post(`${baseurl.url}/booking`,{
        data: postAPIreq
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
    expect (jsonResponse.booking.firstname).toBe("B S");
    expect (jsonResponse.booking.totalprice).toBe(1111);
    expect (jsonResponse.booking.additionalneeds).toBe("Beer Bottle and Chilly Chicken");
})
