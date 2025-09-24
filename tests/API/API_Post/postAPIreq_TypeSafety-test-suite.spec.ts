import { expect, test } from '@playwright/test';
import baseurl from '../../../testData/api_Req/baseURL.json'
import {getPostAPIRequestBody} from '../../../common/helper'
import {faker} from '@faker-js/faker'

test("Create POST api request using dynamic file using auto data generation", async({request})=>{
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const price = faker.number.int({
        min:999, 
        max: 100000
    })
    const additionalneeds = faker.word.words({
        count: 7
    })

    const postAPIrequest = await getPostAPIRequestBody(firstName, lastName, price, true, additionalneeds, "2025-09-24", "2025-09-30")

    // create POST API request
    const postAPIresponse = await request.post(`${baseurl.url}/booking`,{
        data: postAPIrequest
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
    expect (jsonResponse.booking.lastname).toBe(lastName);
    expect (jsonResponse.booking.totalprice).toBe(price);
    expect (jsonResponse.booking.additionalneeds).toBe(additionalneeds);
    expect (jsonResponse.booking.bookingdates.checkin).toBe("2025-09-24");
    expect (jsonResponse.booking.bookingdates.checkout).toBe("2025-09-30");
})
