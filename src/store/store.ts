import cloneDeep from "lodash/cloneDeep";
import { reactive } from "vue";

const storeData = {
  nodeDragged: null,
  isChildNode: false,
  customTokenRequest: "",
};

export const store = reactive(cloneDeep(storeData));

export const clearStoreData = () => {
  Object.assign(store, cloneDeep(storeData));
};

export const setCustomTokenFromStore = (token: string) => {
    storeData.customTokenRequest = token
};

export const clearTokenFromStore = () => {
    return storeData.customTokenRequest = ''
};

