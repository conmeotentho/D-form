import { handleRequest } from "@/plugins/axiosEPC";
import { TypeEnum } from "@/components/config/enum";
import { DEFAULT_FIELDS_PARAM } from "@/components/config/constant";
import { generateFilterJsonPath } from "@/layout/composables/common";

export const getCategoryById = async (id: string) => {
  let config = {
    url: `/category/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getProductOfferingById = async (id: string) => {
  let config = {
    url: `/productOffering/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const updatePO = async (id: string, data: any) => {
  let config = {
    url: `/productOffering/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const getProductSpecById = async (id: string) => {
  let config = {
    url: `/productSpecification/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getResourceSpecById = async (id: string) => {
  let config = {
    url: `/resourceSpecification/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getServiceSpecById = async (id: string) => {
  let config = {
    url: `/serviceSpecification/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllPO = async (offset, limit, query) => {
  const replacedQuery = query.replaceAll("&&", "&");
  let config = {
    url: `/productOffering?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${replacedQuery}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllPOP = async (offset, limit, query) => {
  const filterType = `@type.neq=${TypeEnum.POP_MATRIX_CELL}`;
  let config = {
    url: `/productOfferingPrice?fields=${DEFAULT_FIELDS_PARAM}&${filterType}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllPS = async (offset, limit, query) => {
  const jsonFilter = generateFilterJsonPath('@.isBundle==false');
  let config = {
    url: `/productSpecification?fields=${DEFAULT_FIELDS_PARAM}${jsonFilter}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllRS = async (offset, limit, query) => {
  let config = {
    url: `/resourceSpecification?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllCFSS = async (offset, limit, type, query) => {
  let config = {
    url: `/serviceSpecification?offset=${offset}&limit=${limit}&@type=${type}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getFullCharacteristicByIdIn = async (listId) => {
  let config = {
    url: `/characteristicSpecification?id.in=${listId.join(",")}&limit=${listId.length}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findChannelsByIdIn = async (ids) => {
  let config = {
    url: `/channel?id.in=${ids}&limit=${ids.length}`,
    method: "GET",
  };
  return handleRequest(config);
}

export const findAllPOPByIds = async (listId, fields) => {
  const filterType = `@type.neq=${TypeEnum.POP_MATRIX_CELL}`;
  let config = {
    url: `/productOfferingPrice?fields=${fields}&${filterType}&id.in=${listId.join(",")}&limit=${listId.length}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findCategoriesByIdIn = async (listId) => {
  let config = {
    url: `/category?id.in=${listId}&fields=id,name,code&limit=${listId.length}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getPOPriceById = async (id) => {
  let config = {
    url: `/productOfferingPrice/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findCategory = async (offset, limit, query) => {
  let config = {
    url: `/category?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findPOByIdIn = async (listId) => {
  let config = {
    url: `/productOffering?id.in=${listId}&fields=id,name,code&limit=${listId.length}`,
    method: "GET",
  };
  return handleRequest(config, true);
};
