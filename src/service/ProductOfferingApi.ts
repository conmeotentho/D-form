import { handleRequest } from '@/plugins/axiosEPC';
import { DEFAULT_FIELDS_PARAM } from '@/components/config/constant';

const PRODUCT_OFFERING_URL = '/productOffering';

export const findAllPO = async (offset, limit, query) => {
  const replacedQuery = query.replaceAll('&&', '&');
  let config = {
    url: `${PRODUCT_OFFERING_URL}?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${replacedQuery}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createPO = async (data) => {
  let config = {
    url: PRODUCT_OFFERING_URL,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const getProductOfferingById = async (id) => {
  let config = {
    url: `${PRODUCT_OFFERING_URL}/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const updatePO = async (id, data) => {
  let config = {
    url: `${PRODUCT_OFFERING_URL}/${id}`,
    method: 'PATCH',
    data
  };
  return await handleRequest(config);
};

export const deletePO = async (id) => {
  let config = {
    url: `${PRODUCT_OFFERING_URL}/${id}`,
    method: 'DELETE'
  };
  return await handleRequest(config);
};

export const findAllPORelationship = async (id, query) => {
  let config = {
    url: `${PRODUCT_OFFERING_URL}?fields=${DEFAULT_FIELDS_PARAM}&id.neq=${id}&${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const findPOByIdIn = async (listId) => {
  let config = {
    url: `${PRODUCT_OFFERING_URL}?id.in=${listId}&fields=id,name,code&limit=${listId.length}`,
    method: 'GET'
  };
  return handleRequest(config, true);
};

export const findAllPOAttachment = async (id, query) => {
  return { status: 200, headers: { 'x-total-count': 0, 'x-result-count': 0 }, data: [] };
  let config = {
    url: `${PRODUCT_OFFERING_URL}/${id}/attachment`,
    method: 'GET'
  };
  return handleRequest(config);
};
