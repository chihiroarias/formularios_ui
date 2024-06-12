// Read from LS
export function readFromLS(key) {
  localStorage.setItem("qualis", "c62DxB33K5q6R9dsP7PBBE579");
  return localStorage.getItem(key);
}

export function storeInLS(key, data) {
  localStorage.setItem(key, data);
}

export function accessAPI(verb, endpoint, data, callbackSuccess, callbackFail) {
  const url = process.env.REACT_APP_API_URL + "/" + endpoint;
  const accessToken = readFromLS(process.env.REACT_APP_LS_LOGIN_TOKEN);
  var fetchConfig = {
    method: verb,
    headers: {
      "accept-encoding": "gzip, deflate",
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
      withCredentials: true,
    },
    body: data,
  };
  Promise.race([
    // Generate two promies, one with the fecth and the other with the timeout
    // the one that finishes first resolves
    fetch(url, fetchConfig),
    new Promise(function (resolve, reject) {
      setTimeout(
        () => reject(new Error("request timeout")),
        process.env.REACT_APP_API_TIMEOUT
      );
    }),
  ])
    .then((response) => {
      // When race resolves, it verifies the status of the API response
      // If it's 200 or 201, it was successful, then the success callback is run
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          callbackSuccess(data);
        });
      } else {
        response.json().then((data) => {
          data.status = response.status;
          callbackFail(data);
        });
      }
    })
    .catch((e) => {
      var response = {
        status: 500,
        msg: [{ msg: "Error en la comunicación con la API", e }],
      };
      callbackFail(response);
    });
}
