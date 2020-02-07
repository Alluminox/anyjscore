export const createEvent = (key, action ) => {
  const emitter = ServerContext.getState('emitter');
  if (emitter) {
    emitter.on(key, action);
  }

}