export function updateObject(oldObject, newValues) {
  return { ...oldObject, ...newValues };
}

export function makeActionCreator(type, ...argumentNames) {
  return (...args) => {
    const action = { type };

    argumentNames.forEach((argument, index) => {
      action[argumentNames[index]] = args[index];
    });

    return action;
  };
}
