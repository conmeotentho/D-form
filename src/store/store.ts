import cloneDeep from "lodash/cloneDeep";
import { reactive } from "vue";

const storeData = {
  nodeDragged: null,
  isChildNode: false,
};

export const store = reactive(cloneDeep(storeData));

export const clearStoreData = () => {
  Object.assign(store, cloneDeep(storeData));
};
