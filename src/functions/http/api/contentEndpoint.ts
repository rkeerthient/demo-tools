import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

export default async function contentEndpoint(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const requestString = `https://api.yextapis.com/v2/accounts/me/config/resourcenames/streams/streams-endpoint?api_key=a4b02b315992d693663d4065ad9184bc&v=${new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "")}`;

  try {
    const resp = await fetch(requestString);
    const reviewsResponse = await resp.json();
    const responseData = reviewsResponse.response;
    console.log(JSON.stringify(reviewsResponse));

    return {
      body: JSON.stringify(responseData),
      headers: {
        contentType: "application/json",
      },
      statusCode: 200,
    };
  } catch (e) {
    return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}
