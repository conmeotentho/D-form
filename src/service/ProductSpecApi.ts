import { DEFAULT_FIELDS_PARAM } from "@/components/config/constant";
import { generateFilterJsonPath } from '@/layout/composables/common';
import { handleRequest } from "@/plugins/axiosEPC";

const PRODUCT_SPEC_URL = "/productSpecification";

export const findAllPS = async (offset, limit, query) => {
  const jsonFilter = generateFilterJsonPath('@.isBundle==false');
  let config = {
    url: `${PRODUCT_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}${jsonFilter}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const createProductSpec = async (data) => {
  let config = {
    url: PRODUCT_SPEC_URL,
    method: "POST",
    data,
  };
  return handleRequest(config);
};

export const getProductSpecById = async (id) => {
  let config = {
    url: `${PRODUCT_SPEC_URL}/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};


export const updateProductSpec = async (id, data) => {
  let config = {
    url: `${PRODUCT_SPEC_URL}/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const deleteProductSpec = async (id) => {
  let config = {
    url: `${PRODUCT_SPEC_URL}/${id}`,
    method: "DELETE"
  };
  return await handleRequest(config);
};

export const findAllPSRelationship = async (id, query) => {
  const jsonFilter = generateFilterJsonPath('@.isBundle==false');
  let config = {
    url: `${PRODUCT_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}${jsonFilter}&id.neq=${id}&${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const findAllPSAttachment = async (id, query) => {
  return {status: 200, headers: {'x-total-count': 0, 'x-result-count': 0}, data: []}
  let config = {
    url: `${PRODUCT_SPEC_URL}/${id}/attachment`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getAllPS = async (offset, limit, query) => {
  let config = {
    url: `${PRODUCT_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config, true);
};