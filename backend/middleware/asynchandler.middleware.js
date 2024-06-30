const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next); //  or err =>next(err);
};

export { asyncHandler };

// checkadmin vanne function banayera logged in user admin ho ki haina vanera check garera balla yo getusers chalauna paune banaune
