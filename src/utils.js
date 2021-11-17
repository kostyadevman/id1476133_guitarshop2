export const isEscEvent = (evt, cb) => {
  if (evt.key === `Escape`) {
    cb();
  }
};
