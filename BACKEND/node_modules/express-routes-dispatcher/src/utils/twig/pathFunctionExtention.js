export default (routes) => (name, params) => routes
    .getByName(name)
    .generateURI(params);
