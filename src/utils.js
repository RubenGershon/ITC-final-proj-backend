function deleteWrapper(obj, toFilter) {
  toFilter.forEach((element) => {
    try {
      delete obj[element];
    } catch {
      pass;
    }
  });
  return obj;
}

export default deleteWrapper;
