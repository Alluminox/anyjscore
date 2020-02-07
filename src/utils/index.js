
import _ from 'lodash';


export const joinKeysActions = (keys, actions) => {
  return Object
  .keys(keys)
  .map(key => _.camelCase(key))
  .reduce((prev, key) => ({ ...prev, [key]: actions[key]}), {});
}