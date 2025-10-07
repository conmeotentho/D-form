import axios from "axios";
// import { DFPageEnum } from '@/constant/enum';

export default class SetupConfigService {
  baseUrl = "";
  axiosInstance;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_URL}/dynamic-form`;
    this.axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${this.getBearerToken("access_token")}`,
        "Content-Type": "application/json"
      }
    });
  }

  getBearerToken(tokenKey: string) {
    const currentUserStr = localStorage.getItem("user");
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      return currentUser[tokenKey];
    }
  }

  async getListConfig(limit: number, offset: number) {
    const res = await this.axiosInstance.get(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
    const totalRecord = Number(res.headers["x-total-count"]) || 0;
    console.log(res);
    let data = res.data;
    return { data, totalRecord };
  }

  async deleteConfig(id: number) {
    await this.axiosInstance.delete(`${this.baseUrl}/${id}`);

    //reload page
    // location.reload();
  }

  async saveConfig(savedData: any) {
    if (!savedData.id) {
      await this.axiosInstance.post(`${this.baseUrl}`, savedData);
    } else {
      await this.axiosInstance.patch(`${this.baseUrl}/${savedData.id}`, savedData);
    }
  }

  async getConfigByCode(code: string) {
    const res = await this.axiosInstance.get(`${this.baseUrl}`, {
      params: {
        code
      }
    });
    return res.data;
  }

  // async getConfig(id) {
  //   const res = await this.axiosInstance.get(`${this.baseUrl}/${id}`);

  //   return res.data;
  // }

  // async getListPageConfig(id) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   return baseConfig.pages;
  // }

  // getListPagePropertyParent(pages) {
  //   return pages.filter((page) => !page.parentId && page.pageType === DFPageEnum.PROPERTY);
  // }

  // async savePageConfig(id, page) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   if (!page.id) {
  //     page.id = uuidv4();
  //     if (!baseConfig.pages) {
  //       baseConfig.pages = [];
  //     }
  //     baseConfig.pages.push(page);
  //   } else {
  //     const index = baseConfig.pages.findIndex((item) => item.id === page.id);

  //     baseConfig.pages[index] = page;
  //   }

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const index = baseConfig.pages.findIndex((item) => item.id === pageId);
  //   baseConfig.pages.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }

  // async getListPageAPIConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return [];
  //   }

  //   return page?.apiList ?? [];
  // }

  // async savePageAPIConfig(id, pageId, apiList) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.apiList) {
  //     page.apiList = [];
  //   }

  //   if (!apiList.id) {
  //     apiList.id = uuidv4();
  //     page.apiList?.push(apiList);
  //   } else {
  //     const index = page.apiList?.findIndex((item) => item.id === apiList.id);

  //     page.apiList[index] = apiList;
  //   }

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageAPIConfig(id, pageId, apiId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.apiList) {
  //     return;
  //   }

  //   const index = page.apiList.findIndex((item) => item.id === apiId);
  //   page.apiList.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }

  // async getPageFilterConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return [];
  //   }

  //   return page.filter ?? [];
  // }

  // async savePageFilterConfig(id, pageId, filter) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.filter) {
  //     page.filter = [];
  //   }

  //   if (!filter.id) {
  //     filter.id = uuidv4();
  //     page.filter.push(filter);
  //   } else {
  //     const index = page.filter.findIndex((item) => item.id === filter.id);

  //     page.filter[index] = filter;
  //   }

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageFilterConfig(id, pageId, filterId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.filter) {
  //     return;
  //   }

  //   const index = page.filter.findIndex((item) => item.id === filterId);
  //   page.filter.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }

  // async getListPageGroupConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return [];
  //   }

  //   return page.groups ?? [];
  // }

  //Updated 2025-01-24
  // async savePageGroupConfig(id, pageId, groups, pageParams) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   page.groups = groups;
  //   page.column = pageParams.column;
  //   page.layoutType = pageParams.layoutType;

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageGroupConfig(id, pageId, groupId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.groups) {
  //     return;
  //   }

  //   const index = page.groups.findIndex((item) => {
  //     return item.id === groupId;
  //   });

  //   page.groups.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }

  // async getListPageListViewConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return [];
  //   }

  //   return page.listView ?? [];
  // }

  // async savePageListViewConfig(id, pageId, listView) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);
  //   if (!page) {
  //     return;
  //   }

  //   if (!page.listView) {
  //     page.listView = [];
  //   }

  //   if (!listView.id) {
  //     listView.id = uuidv4();
  //     page.listView.push(listView);
  //   } else {
  //     const index = page.listView.findIndex((item) => item.id === listView.id);
  //     page.listView[index] = listView;
  //   }

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageListViewConfig(id, pageId, listViewId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);
  //   if (!page) {
  //     return;
  //   }

  //   if (!page.listView) {
  //     return;
  //   }

  //   const index = page.listView.findIndex((item) => item.id === listViewId);
  //   page.listView.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }

  // async getListPageButtonConfig(id, pageId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return [];
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return [];
  //   }

  //   return page.ctlButtons ?? [];
  // }

  // async savePageButtonConfig(id, pageId, ctlButtons) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.ctlButtons) {
  //     page.ctlButtons = [];
  //   }

  //   if (!ctlButtons.id) {
  //     ctlButtons.id = uuidv4();
  //     page.ctlButtons?.push(ctlButtons);
  //   } else {
  //     const index = page.ctlButtons?.findIndex((item) => item.id === ctlButtons.id);

  //     page.ctlButtons[index] = ctlButtons;
  //   }

  //   await this.saveConfig(baseConfig);
  // }

  // async deletePageButtonConfig(id, pageId, buttonId) {
  //   const baseConfig = await this.getConfig(id);
  //   if (!baseConfig) {
  //     return;
  //   }

  //   const page = baseConfig.pages.find((item) => item.id === pageId);

  //   if (!page) {
  //     return;
  //   }

  //   if (!page.ctlButtons) {
  //     return;
  //   }

  //   const index = page.ctlButtons.findIndex((item) => item.id === buttonId);
  //   page.ctlButtons.splice(index, 1);

  //   await this.saveConfig(baseConfig);
  // }
}
