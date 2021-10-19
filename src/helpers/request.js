export const submissionRequest = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
