/* eslint-disable import/no-anonymous-default-export */
export const config = {
  api: {
    responseLimit: "50mb",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // Check if the request is a GET request
  if (req.method !== "GET") {
    return res.status(500).json({ error: "This needs to be a get request" });
  }

  // Get the refreshToken from the query string
  const refreshToken = req.query.refreshToken;
  if (!refreshToken) {
    return res.status(500).json({ error: "No refreshToken provided" });
  }

  try {
    // If no data is found in the database, get it from the Google API
    const { userData, error } = await getGoogleHistoricalData(refreshToken);
    const googleData = userData;
    if (error) {
      return res.status(500).json({ error: error });
    }

    // Return a success message
    return res.json({ data: googleData });

    // Catch any errors
  } catch (e) {
    return res.status(500).json({ error: JSON.stringify(e) });
  }
};

// Function to get the user's historical data from the Google API
async function getGoogleHistoricalData(refreshToken) {
  // Create the url to refresh the token
  console.log(":::", process.env.GOOGLE_CLIENT_ID);
  console.log(":::", process.env.GOOGLE_CLIENT_SECRET);
  console.log(":::", refreshToken);
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

  //fetch the new token
  let refreshedToken;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    refreshedToken = await response.json();

    // error handling
    if (!response.ok) {
      throw new Error(refreshedToken.error);
    }
  } catch (error) {
    console.log(">>>>>>>", error);
    return { userData: [], error: "Error refreshing access token" };
  }

  // Get the user's data sources from the Google API
  let dataSources;
  try {
    const sourcesResponse = await fetch(
      `https://www.googleapis.com/fitness/v1/users/me/dataSources`,
      {
        headers: {
          Authorization: `Bearer ${refreshedToken.access_token}`,
        },
      }
    );
    const sourcesData = await sourcesResponse.json();
    dataSources = sourcesData.dataSource;
  } catch (error) {
    return { userData: [], error: "Error getting data sources" };
  }

  // Loop through all the data sources and fetch the data
  const userData = [];
  for (const source of dataSources) {
    if (source.dataType.name === "com.google.step_count.delta") {
      const { returnedArray, error } = await fetchData(
        refreshedToken.access_token,
        source.dataType.name,
        source.dataStreamId
      );
      if (error) {
        return { userData, error };
      }
      userData.push(...returnedArray);
    }
  }

  // Return the user's data
  return { userData, error: null };
}

async function fetchData(accessToken, type, dataSourceId) {
  // Create the start and end date
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 1);

  // Get the user's data from the Google API
  let rawData;
  try {
    const response = await fetch(
      `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
      {
        body: JSON.stringify({
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
              dataSourceId: dataSourceId,
            },
          ],
          bucketByTime: {
            durationMillis: 86400000,
          },
          startTimeMillis: startDate.getTime(),
          endTimeMillis: endDate.getTime(),
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        method: "post",
      }
    );
    rawData = await response.json();
    console.log("rawData", JSON.stringify(rawData, null, 2));
    // error handling
    if (!response.ok) {
      throw new Error(rawData);
    }
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return { returnedArray: [], error: `Error fetching ${dataSourceId}` };
  }

  // Loop through all the data and store it in the array
  const dataArray = [];
  for (let b = 0; b < rawData.bucket.length; b++) {
    // Iterate through each bucket
    const bucket = rawData.bucket[b];
    for (let d = 0; d < bucket.dataset.length; d++) {
      // Iterate through each dataset in the current bucket
      const dataset = bucket.dataset[d];
      for (let p = 0; p < dataset.point.length; p++) {
        // Iterate through each point in the current dataset
        const point = dataset.point[p];

        // Get the value of the data
        let value;
        if (point.value[0].fpVal) {
          value = point.value[0].fpVal;
        } else if (point.value[0].intVal) {
          value = point.value[0].intVal;
        } else {
          value = point.value[0].mapVal;
        }

        // Create and save a new data object
        const data = {
          email: "email",
          type: point.dataTypeName,
          startTimeNanos: point.startTimeNanos,
          endTimeNanos: point.endTimeNanos,
          value,
        };
        dataArray.push(data);
      }
    }
  }

  console.log("dataArray", dataArray.length);
  // Return the data
  return { returnedArray: dataArray, error: null };
}
