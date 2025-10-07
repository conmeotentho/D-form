import { handleRequest } from '@/plugins/axiosEPC';
import { DEFAULT_FIELDS_PARAM } from '@/components/config/constant';

const CATEGORY_URL = '/category';

export const findCategory = async (offset, limit, query) => {
  let config = {
    url: `${CATEGORY_URL}?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const getCategoryById = async (id) => {
  let config = {
    url: `${CATEGORY_URL}/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createCategory = async (data) => {
  let config = {
    url: `${CATEGORY_URL}`,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const updateCategory = async (id, data) => {
  let config = {
    url: `${CATEGORY_URL}/${id}`,
    method: 'PATCH',
    data
  };
  return await handleRequest(config);
};

export const deleteCategory = async (id) => {
  let config = {
    url: `${CATEGORY_URL}/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const getAllCategory = async (offset, limit, query) => {
  let config = {
    url: `${CATEGORY_URL}?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: 'GET'
  };
  return handleRequest(config, true);
};

export const findCategoriesByIdIn = async (listId) => {
  let config = {
    url: `${CATEGORY_URL}?id.in=${listId}&fields=id,name,code&limit=${listId.length}`,
    method: 'GET'
  };
  return handleRequest(config, true);
};
