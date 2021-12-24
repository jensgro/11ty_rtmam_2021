/**
 * Ping the SWAPI API (https://swapi.dev/) and get all ships
 * - we need to do it in several requests (moast of them in parallel) because the API only returns 10 ships per request
 * - Format the array of objects with what we need in 11ty
 * - 11ty will treat this as if it is a static data file
 * - API requests take time > use async / await
 */

// libraries
const axios = require("axios");
const slugify = require("slugify");

// number of items per page (determined by API in this case)
const ITEMSPERPAGE = 10;

/**
 * Make a slug
 * @param {*} string - the string to slugify
 * @returns - slugified lowercase string usable for URLs
 */
const makeSlug = (string) => {
  const options = {
    lower: true,
    base: true,
  };
  return slugify(string, options);
};

/**
 * Get all ships from https://swapi.dev/
 * Format returned data with just the information we need
 *
 * @returns - array of ships
 */
const getShips = async () => {
  try {
    const allShips = [];

    // initial request
    const initialRequest = await axios.get("https://swapi.dev/api/starships/");

    // get first results and add to empty array
    const initialResults = initialRequest.data.results;
    allShips.push(...initialResults);

    // get total results to get
    const totalResults = initialRequest.data.count;

    // calculate number of other requests to get all ships
    const additionalRequestsNbr = Math.floor(totalResults / ITEMSPERPAGE);

    // make array of promises (used with promise.all())
    const promises = [];

    // Store additional requests in an array
    for (let i = 0; i < additionalRequestsNbr; i++) {
      let pageNumber = i + 2;
      const request = axios.get(
        `https://swapi.dev/api/starships/?page=${pageNumber}`
      );
      promises.push(request);
    }

    // execute all additional promises in parallel using Promise.all()
    const additionalRequests = await Promise.all(promises);

    // add results of additional queries to allShips
    // we use the spread operator to have one single array
    additionalRequests.forEach((request) => {
      allShips.push(...request.data.results);
    });

    // format data
    const formattedShips = allShips.map((item) => {
      return {
        name: item.name,
        manufacturer: item.manufacturer,
        url: `/ship/${makeSlug(item.name)}/`,
        model: item.model,
        crew: item.crew,
      };
    });

    // return formatted ships array
    return formattedShips;
  } catch (error) {
    // throw error if any
    throw new Error(error);
  }
};

// export main function
module.exports = getShips();
