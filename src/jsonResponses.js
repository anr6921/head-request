// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) =>
  // return 200 without message, just the meta data
  respondJSONMeta(request, response, 200)
;

// function just to update our object
const updateUser = (request, response) => {
  // change to make to user
  // This is just a dummy object for example
  const newUser = {
    createdAt: Date.now(),
  };

  // modifying our dummy object
  // just indexing by time for now
  users[newUser.createdAt] = newUser;

  // return a 201 created status
  return respondJSON(request, response, 201, newUser);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// success functin
// function for 400 missing query param ?valid=true
const success = (request, response) => {
  const responseJSON = {
    id: 'success',
    message: 'successful response',
  };
  // return 400 with error message
  return respondJSON(request, response, 200, responseJSON);
};

// function for 400 missing query param ?valid=true
const badRequest = (request, response) => {
  // console.dir(request);
  console.log(request.url.split('?'));
  if (request.url === '/badRequest?valid=true') {
    const responseJSON = {
      id: 'bad request',
      message: 'This message has the required parameters: 200',
    };
    return respondJSON(request, response, 200, responseJSON);
  }
  const responseJSON = {
    id: 'bad request',
    message: 'Missing valid query param: 400',
  };
    // return 400 with error message
  return respondJSON(request, response, 400, responseJSON);
};

// function for 401 missing query param ?valid=true
const unauthorized = (request, response) => {
  if (request.url === '/unauthorized?loggedIn=yes') {
    const responseJSON = {
      id: 'unauthorized',
      message: 'You have successfully viewed the content',
    };
    return respondJSON(request, response, 200, responseJSON);
  }
  const responseJSON = {
    id: 'unauthorized',
    message: 'Missing loggedIn param set to yes: 401',
  };
    // return 401 with error message
  return respondJSON(request, response, 401, responseJSON);
};

// function for 403 missing query param ?valid=true
const forbidden = (request, response) => {
  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have acccess to this content: 403',
  };
  // return 400 with error message
  return respondJSON(request, response, 403, responseJSON);
};

// function for 500 missing query param ?valid=true
const internal = (request, response) => {
  const responseJSON = {
    id: 'internal',
    message: 'internal server error: 500',
  };
  // return 400 with error message
  return respondJSON(request, response, 500, responseJSON);
};

// function for 501 missing query param ?valid=true
const notImplemented = (request, response) => {
  const responseJSON = {
    id: 'implemented',
    message: 'a get request has not been implemented yet. Check again later: 501',
  };
  // return 400 with error message
  return respondJSON(request, response, 501, responseJSON);
};


// set public modules
module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
