const normalizedGoogleUser = async (rawUser) => {
  const name = {
    first: rawUser.given_name,
    middle: "",
    last: rawUser.family_name,
  };
  const image = {
    url:
      rawUser.picture ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: "Business Card",
  };
  const address = {
    country: "not defined",
    city: "not defined",
    street: "not defined",
    houseNumber: 0,
    state: "not defined",
  };
  const user = {
    phone: "050-0000000",
    email: rawUser.email,
    isBusiness: false,
    name: name,
    image: image,
    address: address,
  };
  return user;
};
module.exports = normalizedGoogleUser;
