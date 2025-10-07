import { handleRequest } from '@/plugins/axiosEPC';
import { DEFAULT_FIELDS_PARAM } from '@/components/config/constant';

const RESOURCE_SPEC_URL = '/resourceSpecification';

export const findAll = async (offset, limit, query) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const getResourceSpecById = async (id) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}/${id}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const createResourceSpec = async (data) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}`,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const updateResourceSpec = async (id, data) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}/${id}`,
    method: 'PATCH',
    data
  };
  return await handleRequest(config);
};

export const deleteResourceSpec = async (id) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}/${id}`,
    method: 'DELETE'
  };
  return handleRequest(config);
};

export const findAllRSRelationship = async (id, query) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}?fields=${DEFAULT_FIELDS_PARAM}&id.neq=${id}&${query}`,
    method: 'GET'
  };
  return handleRequest(config);
};

export const validateCharSpecXml = async (data) => {
  let config = {
    url: `${RESOURCE_SPEC_URL}/featureSpecification`,
    method: 'POST',
    data
  };
  return handleRequest(config);
};

export const findAllRSAttachment = async (id, query) => {
  // let config = {
  //   url: `${RESOURCE_SPEC_URL}?.....`,
  //   method: "GET",
  // };
  // return handleRequest(config);
  return {
    status: 200,
    headers: {
      'x-total-count': 10,
      'x-result-count': 5
    },
    data: [
      {
        id: '1',
        name: 'Attachment 1',
        mimeType: 'image',
        url: 'https://mycsp.com:7070/docloader?docnum=1',
        description: 'This is an image attachment',
        '@type': 'Attachment'
      },
      {
        id: '2',
        name: 'Attachment 2',
        mimeType: 'image',
        url: 'https://mycsp.com:7070/docloader?docnum=2',
        description: 'This is an image attachment',
        '@type': 'Attachment'
      },
      {
        id: '3',
        name: 'Attachment 3',
        mimeType: 'video',
        url: 'https://mycsp.com:7070/docloader?docnum=3',
        description: 'This is a video attachment',
        '@type': 'Attachment'
      },
      {
        id: '4',
        name: 'Attachment 4',
        mimeType: 'image',
        url: 'https://mycsp.com:7070/docloader?docnum=4',
        description: 'This is an image attachment',
        '@type': 'Attachment'
      },
      {
        id: '5',
        name: 'Attachment 5',
        url: 'https://mycsp.com:7070/docloader?docnum=5',
        description: 'This is a video attachment',
        mimeType: 'video',
        '@type': 'Attachment'
      }
    ]
  };
};
