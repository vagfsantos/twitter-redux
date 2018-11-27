const logger = store => next => action => {
  console.group(action.type);
  console.log("The action", action);
  const nextReturn = next(action);
  console.log("New state: ", store.getState());
  console.groupEnd();

  return nextReturn;
};

export default logger;
