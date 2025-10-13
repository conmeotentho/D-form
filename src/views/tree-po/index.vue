<template>
    <!-- search section -->
    <div class="flex h-[100vh]">
      <SearchMultiple
        :width="450"
        :feature="typeTree"
        :hasPermissionCreate="true"
        :listObjects="listObjects"
        @changeTab="changeTab"
        @searchMultiple="searchByConditions"
      />
      <div class="content" style="overflow: auto">
        <div style="display: flex; height: max-content">
          <DropComponent :isSearchTab="isSearchTab" @dropItem="onDrop" />
        </div>
        <TreeComponent v-if="dataSelected" :parentObject="dataSelected" :hasPermissionEdit="true" />
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SearchMultiple from '@/components/common/SearchMultiple.vue';
import DropComponent from '@/components/DropComponent.vue';
import { TypeEnum, KeyEnum, StatusCodeEnum, CharValueSpecTypeEnum, RelationshipTypeEnum, CtlTypeEnum, ValueTypeEnum } from '@/components/config/enum';
import { store } from '@/store/store';
import { PRICE_UNITS, KEYS_CHANGED } from '@/components/config/constant';
import { 
  findAllPO, 
  findAllPOP, 
  findAllPS, 
  findAllRS, 
  findAllCFSS, 
  findCategory,
  getProductOfferingById, 
  getPOPriceById,
  getCategoryById,
  getProductSpecById,
  getServiceSpecById,
  getResourceSpecById
} from '@/service/TreeApi';
import { 
  generateFilterJsonPath, 
  getFullDetailCharacteristicSpec, 
  getChannelsByIdIn, 
  getCategoriesByIdIn, 
  getDetailPOPrice,
  convertValidFor,
  convertCharacteristicValue,
  getProductOfferingsByIdIn,
  convertFeatureSpecification
} from '@/layout/composables/common';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from "lodash/cloneDeep";

const props = defineProps<{
  typeTree: string;
}>();

const isSearchTab = ref<boolean>(true);
const listObjects = ref<PanelObject[]>([]);
const dataSelected = ref<any>(null);

const changeTab = (isSearch: boolean) => {
  isSearchTab.value = isSearch;
};

const onDrop = (evt: DragEvent) => {
  evt.preventDefault();
  const itemDrop = store.nodeDragged as any;
  if (!itemDrop) {
    return;
  }
  if (!itemDrop.id) {
    return;
  }
  if (props.typeTree === TypeEnum.SIMPLE_PO || props.typeTree === TypeEnum.BUNDLED_PO) {
    getSimplePODetail(itemDrop.id);
  }
  if (props.typeTree === TypeEnum.PO_PRICE) {
    getPOPriceDetail(itemDrop.id);
  }
  if (props.typeTree === TypeEnum.CATE) {
    getCategoryDetail(itemDrop.id)
  }
  if (props.typeTree === TypeEnum.PRODUCT_SPEC) {
    getProductSpecDetail(itemDrop.id);
  }
  if (props.typeTree === TypeEnum.CFS_SPEC) {
    getServiceSpecDetail(itemDrop.id)
  }
  if (props.typeTree === TypeEnum.RFS_SPEC) {
    getRFSSDetail(itemDrop.id)
  }
  if (props.typeTree === TypeEnum.RESOURCE_SPEC) {
    getResourceSpecDetail(itemDrop.id)
  }
};

const getSimplePODetail = async (id: string) => {
  try {
    const response = await getProductOfferingById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    dataSelected.value = props.typeTree === TypeEnum.SIMPLE_PO ? await convertSPOResponseData(response.data) : await convertBPOResponseData(response.data);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const getPOPriceDetail = async (id: string) => {
  try {
    const response = await getPOPriceById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    dataSelected.value = await convertPOPResponseData(response.data);
    // if (poPriceSelected.value?.isMatrix) {
    //   listDetailTabs.value = generateDetailTabs(POPM_DETAIL_TABS);
    // }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}

const getCategoryDetail = async (id: string) => {
  try {
    const response = await getCategoryById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    dataSelected.value = await convertCatResponseData(response.data);
    console.log(dataSelected.value);
    // isHiddenDetailTab.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const getProductSpecDetail = async (id: string) => {
  try {
    const response = await getProductSpecById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }

    dataSelected.value = await convertPSResponseData(response.data);
    // isHiddenDetailTab.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const getServiceSpecDetail = async (id: string) => {
  try {
    const response = await getServiceSpecById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    handleDataDetail(response);
    // isHiddenDetailTab.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const handleDataDetail = async (response: any) => {
  const data = await convertCFSSResponseData(response.data);
  dataSelected.value = cloneDeep(data);
  // handle data relationship
  const relationships = data.serviceSpecRelationship.filter((elm: any) => elm.relationshipType !== RelationshipTypeEnum.REQUIRES);
  data.serviceSpecRelationship = cloneDeep(relationships);
  // serviceSpecSelected.value = cloneDeep(data);
}

const getRFSSDetail = async (id: string) => {
  try {
    const response = await getServiceSpecById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    dataSelected.value = await convertRFSSResponseData(response.data);
    // isHiddenDetailTab.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const getResourceSpecDetail = async (id: string) => {
  try {
    const response = await getResourceSpecById(id);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.NOT_FOUND) {
        return;
      }
      return;
    }
    dataSelected.value = await convertRSResponseData(response.data);
    // isHiddenDetailTab.value = false;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const convertSPOResponseData = async (response: any) => {
  const productOfferingCharacteristic = response.productOfferingCharacteristic || [];
  const prodSpecCharValueUse = response.prodSpecCharValueUse || [];
  const allCharacteristics = productOfferingCharacteristic.concat(prodSpecCharValueUse);
  const [characteristics, channels, categories, poPrices] = await Promise.all([
    getFullDetailCharacteristicSpec(allCharacteristics),
    getChannelsByIdIn(response.channel || []),
    getCategoriesByIdIn(response.category || []),
    getDetailPOPrice(response.productOfferingPrice || [])
  ]);

  const filteredProdSpecCharValueUse = response.prodSpecCharValueUse ?
  characteristics.filter((elm: any) => elm['@type'] === TypeEnum.CHARACTERISTIC_USE) : [];
  filteredProdSpecCharValueUse?.forEach((elm: any) => {
    elm.productSpecCharacteristicValue = elm.productSpecCharacteristicValue?.map((prodCharValue: any) => {
      return {
        ...prodCharValue,
        '@type': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
        '@baseType': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
      }
    }) || [];
    elm.characteristicValueSpecification = elm.productSpecCharacteristicValue;
  });
  return {
    ...response,
    version: response.version ? response.version : null,
    validFor: convertValidFor(response.validFor),
    statusReason: response.statusReason ? response.statusReason : null,
    place: response.place || [],
    productSpecification: response.productSpecification || [],
    prodSpecId: response.productSpecification ? response.productSpecification.id : null,
    channel: channels || [],
    category: categories || [],
    productOfferingTerm: response.productOfferingTerm ?
      response.productOfferingTerm.map((term: any) => {
          return { 
              ...term, 
              id: uuidv4(),
              validFor: convertValidFor(term.validFor)
          };
      }) : [],
    productOfferingPrice: poPrices || [],
    agreement: response.agreement || [],
    attachment: response.attachment || [],
    marketSegment: response.marketSegment || [],
    bundledProductOffering: response.bundledProductOffering || [],
    productOfferingRelationship: response.productOfferingRelationship || [],
    productOfferingCharacteristic: response.productOfferingCharacteristic ?
      characteristics.filter((elm: any) => elm['@type'] === TypeEnum.CHARACTERISTIC) : [],
    prodSpecCharValueUse: filteredProdSpecCharValueUse,
    policy: response.policy || [],
    allowedAction: response.allowedAction || [],
    externalIdentifiers: response.externalIdentifiers || [],
    typeObject: TypeEnum.SIMPLE_PO
  } as SimpleProductOffering;
};
const convertBPOResponseData = async (response: any) => {
  const productOfferingCharacteristic = response.productOfferingCharacteristic || [];
  const prodSpecCharValueUse = response.prodSpecCharValueUse || [];
  const allCharacteristics = productOfferingCharacteristic.concat(prodSpecCharValueUse);
  const [characteristics, channels, categories, poPrices] = await Promise.all([
    getFullDetailCharacteristicSpec(allCharacteristics),
    getChannelsByIdIn(response.channel || []),
    getCategoriesByIdIn(response.category || []),
    getDetailPOPrice(response.productOfferingPrice || [])
  ]);
  const filteredProdSpecCharValueUse = response.prodSpecCharValueUse ?
    characteristics.filter((elm: any) => elm['@type'] === TypeEnum.CHARACTERISTIC_USE) : [];
  filteredProdSpecCharValueUse?.forEach((elm: any) => {
    elm.productSpecCharacteristicValue = elm.productSpecCharacteristicValue?.map((prodCharValue: any) => {
      return {
        ...prodCharValue,
        '@type': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
        '@baseType': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
      }
    }) || [];
    elm.characteristicValueSpecification = elm.productSpecCharacteristicValue;
  });
  return {
    ...response,
    validFor: convertValidFor(response.validFor),
    version: response.version ? +response.version : null,
    attachment: response.attachment || [],
    productOfferingRelationship: response.productOfferingRelationship || [],
    productOfferingCharacteristic: response.productOfferingCharacteristic ?
      characteristics.filter((elm: any) => elm['@type'] === TypeEnum.CHARACTERISTIC) : [],
    prodSpecCharValueUse: filteredProdSpecCharValueUse,
    category: categories || [],
    productSpecification: response.productSpecification ? [response.productSpecification] : [],
    bundledProductOffering: response.bundledProductOffering || [],
    typeObject: response.isBundle ? TypeEnum.BUNDLE_PO : TypeEnum.SIMPLE_PO,
    pricingType: response.pricingType || "bundle",
    productOfferingPrice: poPrices || [],
    productOfferingTerm: response.productOfferingTerm ?
      response.productOfferingTerm.map((term: any) => {
        return {
          ...term,
          id: uuidv4(),
          validFor: convertValidFor(term.validFor)
        };
      }) : [],
    channel: channels || [],
    policy: response.policy || []
  } as BundleProductOffering;
}
const convertPOPResponseData = async (response: any) => {
  const isMatrix = response['@type'] === TypeEnum.POP_MATRIX;
  const characteristics = await getFullDetailCharacteristicSpec(response.prodSpecCharValueUse, true);
  let result = {
    ...response,
    isMatrix: isMatrix,
    validFor: convertValidFor(response.validFor),
    version: response.version ? +response.version : null,
    price: response.price || {
      value: 0,
      unit: PRICE_UNITS[0].label,
    },
    percentage: response.percentage === undefined ? null : response.percentage,
    popRelationship: response.popRelationship?.filter((item: any) => item.relationshipType !== RelationshipTypeEnum.MATRIX_CELL) || [],
    tax: response.tax || [],
    productOfferingTerm: response.productOfferingTerm ?
      response.productOfferingTerm.map((term: any) => {
        return {
          ...term,
          id: uuidv4(),
          validFor: convertValidFor(term.validFor)
        };
      }) : [],
    prodSpecCharValueUse: isMatrix ? characteristics : cloneDeep(convertPOPCharacteristics(characteristics)) || [],
    policy: response.policy || []
  };
  if (result?.isMatrix) {
    result.matrixCell = convertMatrixCell(response.matrixCell || [], characteristics);
  }
  return result;
}
const convertCatResponseData = async (response: any) => {
  const productOffering = await getProductOfferingsByIdIn(response.productOffering || []);
  return {
    ...response,
    version: response.version ? response.version : null,
    validFor: convertValidFor(response.validFor),
    type: {
      label: response["@type"],
      key: "category",
    },
    parent: response.parent ? response.parent : null,
    parentId: response.parent ? response.parent.id : null,
    subCategory: response.subCategory || [],
    productOffering: productOffering || []
  };
};
const convertPOPCharacteristics = (characteristics: any) => {
  const characteristicClone = cloneDeep(characteristics);
  return characteristicClone.map((item: any) => {
    const ctlType = item.layout?.ctlType;
    const savedProdCharValueUse = cloneDeep(item.productSpecCharacteristicValue)?.map((prodVal: any) => convertCharacteristicValue(prodVal)) || [];
    if (ctlType === CtlTypeEnum.COMBOBOX) {
      item.productSpecCharacteristicValue = item.productSpecCharacteristicValue?.map((charVal: any) => {
        charVal.selected = savedProdCharValueUse.some((val: any) => {
          return val == convertCharacteristicValue(charVal);
        });
        return charVal;
      }) || [];
      return item;
    }
    return item;
  })
}
const convertMatrixCell = (matrixCells: any[], characteristics: any) => {
  if (!matrixCells || matrixCells.length === 0) {
    return [];
  }
  return matrixCells.map((rowData: any) => {
    const result1 = rowData.prodSpecCharValueUse.map((charValueUse: any) => {
      const found = characteristics.find((char: any) => char.id === charValueUse.id);
      return {
        id: charValueUse.id,
        layout: found?.layout || CtlTypeEnum.TEXTBOX,
        name: charValueUse.name,
        productSpecCharacteristicValue: charValueUse.productSpecCharacteristicValue
      }
    });
    const result2 = KEYS_CHANGED.map((elm: any) => {
      return {
        layout: {
          ctlType: CtlTypeEnum.NUMBER
        },
        name: elm.value,
        productSpecCharacteristicValue: [{
          value: rowData?.price[elm.key],
          valueType: ValueTypeEnum.NUMBER
        }]
      }
    });
    return {
      id: rowData.id,
      data: [...result1, ...result2]
    };
  });
};
const convertPSResponseData = async (response: any) => {
  return {
    ...response,
    validFor: convertValidFor(response.validFor),
    version: response.version ? +response.version : null,
    attachment: response.attachment || [],
    productSpecificationRelationship: response.productSpecificationRelationship || [],
    productSpecCharacteristic: response.productSpecCharacteristic ?
      await getFullDetailCharacteristicSpec(response.productSpecCharacteristic) 
      : [],
    relatedParty: response.relatedParty || [],
    policy: response.policy || [],
  } as ProductSpecification;
}
const convertCFSSResponseData = async (response: any) => {
  const featureSpec = await convertFeatureSpecification(response.featureSpecification);
  return {
    ...response,
    version: response.version ? response.version : null,
    validFor: convertValidFor(response.validFor),
    type: {
      label: response["@type"],
      key: "service-spec",
    },
    attachment: response.attachment || [],
    relatedParty: response.relatedParty || [],
    serviceSpecRelationship: response.serviceSpecRelationship || [],
    serviceLevelSpecification: response.serviceLevelSpecification || [],
    constraint: response.constraint || [],
    entitySpecRelationship: response.entitySpecRelationship || [],
    featureSpecification: featureSpec.map((fsItem: any) => {
      return {
        ...fsItem,
        validFor: convertValidFor(fsItem.validFor),
      }
    }),
    specCharacteristic: response.specCharacteristic ?
      await getFullDetailCharacteristicSpec(response.specCharacteristic) 
      : []
  };
};
const convertRFSSResponseData = async (response: any) => {
  const featureSpec = await convertFeatureSpecification(response.featureSpecification);
  return {
    ...response,
    version: response.version ? response.version : null,
    validFor: convertValidFor(response.validFor),
    type: {
      label: response["@type"],
      key: "service-spec",
    },
    attachment: response.attachment || [],
    relatedParty: response.relatedParty || [],
    serviceSpecRelationship: response.serviceSpecRelationship || [],
    serviceLevelSpecification: response.serviceLevelSpecification || [],
    constraint: response.constraint || [],
    entitySpecRelationship: response.entitySpecRelationship || [],
    featureSpecification: featureSpec.map((fsItem: any) => {
      return {
        ...fsItem,
        validFor: convertValidFor(fsItem.validFor),
      }
    }),
    specCharacteristic: response.specCharacteristic ?
      await getFullDetailCharacteristicSpec(response.specCharacteristic) 
      : []
  };
};
const convertRSResponseData = async (response: any) => {
  const featureSpec = await convertFeatureSpecification(response.featureSpecification);
  return {
    ...response,
    validFor: convertValidFor(response.validFor),
    version: response.version ? +response.version : null,
    type: {
      label: response['@type'],
      key: response['@type'] === TypeEnum.LOGICAL_RESOURCE_SPEC ? 'logical-rs' : 'physical-rs'
    },
    attachment: response.attachment || [],
    resourceSpecRelationship: response.resourceSpecRelationship || [],
    relatedParty: response.relatedParty || [],
    resourceSpecCharacteristic: response.resourceSpecCharacteristic ?
      await getFullDetailCharacteristicSpec(response.resourceSpecCharacteristic)
      : [],
    featureSpecification: featureSpec.map((fsItem: any) => {
      return {
        ...fsItem,
        validFor: convertValidFor(fsItem.validFor),
      }
    })
  };
}

const searchByConditions = async (
  offset: number,
  limit: number,
  selectedObjects: ObjectItem[],
  query: string
) => {
  if (!props.typeTree) return
  listObjects.value = [];
  const listKeys = selectedObjects.map((item) => item.key);
  switch (listKeys[0]) {
    case KeyEnum.BUNDLE_PO_KEY:
      await findAllSimpleProd(offset, limit, query, true);
      break;
    case KeyEnum.SIMPLE_PO_KEY:
      await findAllSimpleProd(offset, limit, query, false);
      break;
    case KeyEnum.PO_PRICE_KEY:
      await findAllProductOP(offset, limit, query);
      break;
    case KeyEnum.CATE_KEY:
      await findAllCategory(offset, limit, query);
      break;
    case KeyEnum.PRODUCT_SPEC_KEY:
      await findAllProdSpec(offset, limit, query);
      break;
    case KeyEnum.RESOURCE_SPEC_KEY:
      await findAllResourceSpec(offset, limit, query);
      break;
    case KeyEnum.CFS_SPEC_KEY:
      if (props.typeTree === TypeEnum.PRODUCT_SPEC) await findAllCFS(offset, limit, query);
      else await findAllServiceSpec(offset, limit, TypeEnum.CFS_SPEC, query)
      break;
    case KeyEnum.RFS_SPEC_KEY:
      await findAllServiceSpec(offset, limit, TypeEnum.RFS_SPEC, query);
      break;
    case KeyEnum.RESOURCE_SPEC_KEY:
      await findAllResourceSpec(offset, limit, query);
      break;
    case KeyEnum.TEMPLATE_RESOURCE_SPEC_KEY:
      listObjects.value.push({
        key: KeyEnum.TEMPLATE_RESOURCE_SPEC_KEY,
        value: [],
        totalRecords: 0,
        resultCount: 0
      });
      break;
    default:
      break;
  }
};

const findAllSimpleProd = async (
  offset: number,
  limit: number,
  query: string,
  isBundle: boolean
) => {
  try {
    query += generateFilterJsonPath(`@.isBundle==${isBundle}`);
    const response = await findAllPO(offset, limit, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: isBundle ? KeyEnum.BUNDLE_PO_KEY : KeyEnum.SIMPLE_PO_KEY,
      value: response.data.map((item: any) => {
        return {
          ...item,
          typeObject: isBundle ? TypeEnum.BUNDLE_PO : TypeEnum.SIMPLE_PO
        };
      }),
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"]
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const findAllProductOP = async (
  offset: number,
  limit: number,
  query: string
) => {
  try {
    const response = await findAllPOP(offset, limit, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: KeyEnum.PO_PRICE_KEY,
      value: response.data.map((item: any) => {
        return { ...item, type: item["@type"] === TypeEnum.PO_PRICE ? 'pop' : 'matrix' };
      }),
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"]
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const findAllCategory = async (
    offset: number,
    limit: number,
    query: string
) => {
  try {
    const response = await findCategory(offset, limit, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: KeyEnum.CATE_KEY,
      value: response.data,
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"],
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const findAllProdSpec = async (
  offset: number,
  limit: number,
  query: string
) => {
  try {
    const response = await findAllPS(offset, limit, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: KeyEnum.PRODUCT_SPEC_KEY,
      value: response.data,
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"]
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const findAllResourceSpec = async (
  offset: number,
  limit: number,
  query: string
) => {
  try {
    const response = await findAllRS(offset, limit, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: KeyEnum.RESOURCE_SPEC_KEY,
      value: response.data.map((item: any) => {
          return { ...item, type: item["@type"] === TypeEnum.LOGICAL_RESOURCE_SPEC ? 'logic' : 'physical' };
      }),
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"]
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const findAllCFS = async (
  offset: number,
  limit: number,
  query: string
) => {
  try {
    const response = await findAllCFSS(offset, limit, TypeEnum.CFS_SPEC, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key: KeyEnum.CFS_SPEC_KEY,
      value: response.data,
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"]
    });
  } catch (error) {
      console.error("Failed to fetch data", error);
  }
};

const findAllServiceSpec = async (
  offset: number,
  limit: number,
  type: string,
  query: string
) => {
  try {
    const response = await findAllCFSS(offset, limit, type, query);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    listObjects.value.push({
      key:
        type === TypeEnum.CFS_SPEC
          ? KeyEnum.CFS_SPEC_KEY
          : KeyEnum.RFS_SPEC_KEY,
      value: response.data,
      totalRecords: +response.headers["x-total-count"],
      resultCount: +response.headers["x-result-count"],
    });
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");

.simple-po {
  font-family: "Inter", sans-serif;
  display: flex;
  height: calc(100% - 40px);

  .content {
    overflow: auto;
    border-top: solid 4px;
    background-image: url(../assets/images/bg-dot.svg);
    background-repeat: repeat;
    border-color: #ff617d;
    position: relative;
  }

  .detail-info {
    min-width: 40px;
    border-color: #ff617d;

    .tab-content-parent {
      box-shadow: 0px 2px 5px rgba(40, 39, 55, 0.1);
      background-color: var(--p-card-background);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;

      .head {
        display: flex;
        padding: 7px 10px;
        column-gap: 9px;
        color: #fff;
        align-items: center;
        flex-wrap: wrap;
        background-color: #ff617d;
        height: 43px;

        .title {
          flex: 1;
          min-width: 0px;
          font-weight: 600;

          .sub {
            font-size: 12px;
            opacity: 0.6;
            font-weight: normal;
          }
        }
      }

      .box-content {
        flex: 1;
        display: flex;
        overflow: hidden;

        .tabs {
          width: 40px;
          flex-direction: column;

          &.nav {
            display: flex;
            flex-wrap: wrap;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
          }

          .item {
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            cursor: pointer;
            position: relative;
            border-left: 2px solid transparent;

            &.active {
              background-color: #fdf5f3;
              color: #f3876e;
              border-left-color: #f3876e;
            }
          }
        }

        .tab-content-box {
          height: 100%;
          flex: 1;
          min-width: 0px;
          padding: 10px;
          overflow: auto;
          border-left: 1px solid #e1e8f3;

          .general-info {
            position: relative;
            height: calc(100% - 40px);
          }

          &.p-scrollbar {
            position: relative;
          }
        }
      }

      .footer {
        display: flex;
        padding: 7px 10px;
        column-gap: 9px;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
}

:deep(.p-autocomplete .p-inputtext) {
  width: 100%;
}

:deep(.footer .p-button) {
  color: #fff;
  background: #000;
  margin-left: 10px;
  padding: 0.4rem 0.7rem;
}

:deep(.price .p-inputnumber-input) {
  width: 50% !important;
}

:deep(.tabs .pi) {
  font-size: 20px!important;
}
</style>
