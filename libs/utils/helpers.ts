export const encodeToBase64 = (id?: string) => {
  if (!id) {
    return null;
  }

  return Buffer.from(id).toString('base64');
};

export const decodeFromBase64 = (base64?: string) => {
  if (!base64) {
    return null;
  }
  return Buffer.from(base64, 'base64').toString('ascii');
};
