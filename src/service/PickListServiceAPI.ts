import { handleRequest } from '@/plugins/axiosEPC';

export const findAllPickList = async (offset, limit, query, showLoading = true) => {
  let config = {
    url: `/pickList?offset=${offset}&limit=${limit}${query}`,
    method: 'GET'
  };
  return handleRequest(config, showLoading);
};

export const createPickList = async (data) => {
  let config = {
    url: `/pickList`,
    method: 'POST',
    data: data
  };
  return handleRequest(config);
};

export const updatePickList = async (id, data) => {
  let config = {
    url: `/pickList/${id}`,
    method: 'PATCH',
    data: data
  };
  return handleRequest(config);
};

export const deletePickList = async (id) => {
  let config = {
    url: `/pickList/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const findPickListById = async (id) => {
  let config = {
    url: `/pickList/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const getPicklistByCode = async (code) => {
  let config = {
    url: `/pickList/code/${code}`,
    method: 'GET'
  };
  return handleRequest(config);
};
