import { handleRequest } from "@/plugins/axiosEPC";
import { DEFAULT_FIELDS_PARAM } from "@/components/config/constant";
import { TypeEnum } from "@/components/config/enum";

export const getCriteriaSet = async (offset, limit, query) => {
  const config = {
    url: `/criteriaSet?offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getCriteriaSetById = async (id) => {
  const config = {
    url: `/criteriaSet/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const createCriteriaSet = async (data) => {
  const config = {
    url: "/criteriaSet",
    method: "POST",
    data: data,
  };
  return handleRequest(config);
};

export const updateCriteriaSet = async (id, data) => {
  const config = {
    url: `/criteriaSet/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const deleteCriteriaSet = async (id) => {
  const config = {
    url: `/criteriaSet/${id}`,
    method: "DELETE",
  };
  return handleRequest(config);
};

export const createCriteria = async (data) => {
  const config = {
    url: "/criteria",
    method: "POST",
    data: data,
  };
  return handleRequest(config);
};

export const updateCriteria = async (id, data) => {
  const config = {
    url: `/criteria/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const deleteCriteria = async (id) => {
  const config = {
    url: `/criteria/${id}`,
    method: "DELETE",
  };
  return handleRequest(config);
};

export const getCriteriaById = async (id) => {
  const config = {
    url: `/criteria/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getActionType = async (offset, limit, query) => {
  const config = {
    url: `/actionType?offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getActionTypeById = async (id) => {
  const config = {
    url: `/actionType/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const createActionType = async (data) => {
  const config = {
    url: "/actionType",
    method: "POST",
    data: data,
  };
  return handleRequest(config);
};

export const updateActionType = async (id, data) => {
  const config = {
    url: `/actionType/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const deleteActionType = async (id) => {
  const config = {
    url: `/actionType/${id}`,
    method: "DELETE",
  };
  return handleRequest(config);
};

export const getPromotion = async (offset, limit, query) => {
  const config = {
    url: `/promotion?offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const createPromotion = async (data) => {
  const config = {
    url: "/promotion",
    method: "POST",
    data: data,
  };
  return handleRequest(config);
};

export const getPromotionById = async (id) => {
  const config = {
    url: `/promotion/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const updatePromotion = async (id, data) => {
  const config = {
    url: `/promotion/${id}`,
    method: "PATCH",
    data,
  };
  return await handleRequest(config);
};

export const deletePromotion = async (id) => {
  const config = {
    url: `/promotion/${id}`,
    method: "DELETE",
  };
  return handleRequest(config);
};

export const getChannel = async (offset, limit, query) => {
  const config = {
    url: `/channel?offset=${offset}&limit=${limit}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getChannelById = async (id) => {
  const config = {
    url: `/channel/${id}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getCustomerServiceSpec = async (offset, limit, query) => {
  let config = {
    url: `/serviceSpecification?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}&@type=${TypeEnum.CFS_SPEC}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};

export const getResourceServiceSpec = async (offset, limit, query) => {
  let config = {
    url: `/serviceSpecification?fields=${DEFAULT_FIELDS_PARAM}&offset=${offset}&limit=${limit}&@type=${TypeEnum.RFS_SPEC}${query}`,
    method: "GET",
  };
  return handleRequest(config);
};
