const handleErrorHttp = (res, status, message) => {
  res.myData = { message: message };
  return res.status(status).send(message);
};
module.exports = handleErrorHttp;
