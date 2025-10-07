import { handleRequest } from '@/plugins/axiosEPC';
import { DEFAULT_FIELDS_PARAM } from '@/components/config/constant';
import { TypeEnum } from '@/components/config/enum';

const SERVICE_SPEC_URL = '/serviceSpecification';

export const findAll = async (offset, limit, type, query) => {
  let config = {
    url: `${SERVICE_SPEC_URL}?offset=${offset}&limit=${limit}&@type=${type}${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const getServiceSpecById = async (id) => {
  let config = {
    url: `${SERVICE_SPEC_URL}/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createServiceSpec = async (data) => {
  let config = {
    url: `${SERVICE_SPEC_URL}`,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const updateServiceSpec = async (id, data) => {
  let config = {
    url: `${SERVICE_SPEC_URL}/${id}`,
    method: 'PATCH',
    data
  };
  return await handleRequest(config);
};

export const deleteServiceSpec = async (id) => {
  let config = {
    url: `${SERVICE_SPEC_URL}/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const findAllSSRelationship = async (id, type, query) => {
  let config = {
    url: `${SERVICE_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}&id.neq=${id}&@type=${type}&${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const validateCharSpecXml = async (data) => {
  let config = {
    url: `${SERVICE_SPEC_URL}/featureSpecification`,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const findCFSSActive = async (query) => {
  let config = {
    url: `${SERVICE_SPEC_URL}?@type=${TypeEnum.CFS_SPEC}&lifecycleStatus=Active&${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};
