const normalizedUser = async (rawUser) => {
  const name = {
    ...rawUser.name,
    middle: rawUser.name.middle || "",
  };
  const image = {
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: rawUser.image.alt || "Business Card",
  };
  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "not defined",
  };
  const user = {
    ...rawUser,
    name: name,
    image: image,
    address: address,
  };
  return user;
};
module.exports = normalizedUser;
