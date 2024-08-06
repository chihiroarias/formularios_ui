// Read from LS
export function readFromLS(key) {
  localStorage.setItem("qualis", "CqqtL4zNnSqMEpLD5BshTLk3S");
  return localStorage.getItem(key);
}

export function storeInLS(key, data) {
  localStorage.setItem(key, data);
}
export function accessAPI(
  verb,
  endpoint,
  data,
  callbackSuccess,
  callbackFail,
  file
) {
  const url = process.env.REACT_APP_API_URL + "/" + endpoint;
  const accessToken = readFromLS(process.env.REACT_APP_LS_LOGIN_TOKEN);

  let fetchConfig = {
    method: verb,
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  let dataParaEnviar;

  // Si hay un archivo para enviar, genera el form data
  if (file) {
    let formData = new FormData();
    formData.append("archivo", file);
    if (data) {
      // Se agregan al form data el resto de los campos del payload
      let datosArray = Object.entries(data);
      for (const [key, value] of datosArray) {
        formData.append(key, value);
      }
    }
    dataParaEnviar = formData;
  } else if (data) {
    // Si no hay archivos y es sólo data, se debe agregar el content-type adecuado en el header
    fetchConfig.headers["Content-Type"] = "application/json";
    fetchConfig.headers["accept-encoding"] = "gzip, deflate";
    dataParaEnviar = JSON.stringify(data);
  }
  fetchConfig.body = dataParaEnviar;

  Promise.race([
    // Generate two promises, one with the fetch and the other with the timeout
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
      if (response.status === 204) {
        callbackSuccess();
      } else if (response.status >= 200 && response.status < 300) {
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
      console.log(e);
      var response = {
        status: 500,
        msg: "Ocurrió un error en la API",
      };
      callbackFail(response);
    });
}
