import { getFullCharacteristicByIdIn, findChannelsByIdIn, findAllPOPByIds, findCategoriesByIdIn, findPOByIdIn } from "@/service/TreeApi";
import { StatusCodeEnum, CharValueSpecTypeEnum, TypeEnum, ValueTypeEnum, CtlTypeEnum } from "@/components/config/enum";
import { DEFAULT_FIELDS_PARAM, DEFAUTL_CHAR_SPEC_VALUE } from "@/components/config/constant";
import cloneDeep from "lodash/cloneDeep";

export const encodeWithEscape = (value: any) => {
  if (typeof value !== 'string') {
    return value;
  }
  if (value === '') {
    return '';
  }
  const escaped = value.replace(/([[\]{}()<>\\^$|?*+.\-!\"':;,/@&=#~%_])/g, '\\$1');
  return encodeURIComponent(escaped);
}

export const generateFilterJsonPath = (jsonPathQuery: string) => {
  return `&filter=${encodeURIComponent(`$[?(${jsonPathQuery})]`)}`;
}

export const getSearchConfigItems = (mapName: any, feature: any) => {
  const featureItems = mapName[feature as keyof typeof mapName] ?? [];
  const result = [...featureItems, ...mapName.default];
  if (result.some((item) => item.zIndex !== undefined)) {
    result.sort((a, b) => a.zIndex - b.zIndex);
  }
  return result;
};

export const getNodeActions = (mapName: any, feature: any) => {
  const featureItems = mapName[feature as keyof typeof mapName] ?? [];
  const result = featureItems.length ? featureItems : mapName.default;
  if (result.some((item: any) => item.zIndex !== undefined)) {
    result.sort((a: any, b: any) => a.zIndex - b.zIndex);
  }
  return result;
};

export const mappedObject = (object: any, element: any, keyMap: any) => {
  return Object.keys(object).reduce((acc: { [key: string]: any }, key) => {
    const value = object[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      acc[key] = mappedObject(value, element[keyMap[key] || key] || {}, keyMap);
    } else {
      if (value !== null) {
        acc[key] = value;
      } else if (element[keyMap[key] || key]) {
        acc[key] = element[keyMap[key] || key];
      }
    }
    return acc;
  }, {});
}

export const mergedData = (data: any[]) => {
  return data.reduce((acc, item) => {
      const key = Object.keys(item)[0]; // Lấy key động
      if (!acc[key]) acc[key] = []; // Nếu chưa có key, tạo mảng rỗng
      if (item[key]) {
          acc[key].push(item[key]); // Thêm giá trị vào mảng nếu tồn tại
      }
      return acc;
  }, {});
}

export const trimValues = (data: any): any => {
  if (typeof data === "string") {
    return data.trim();
  }

  if (Array.isArray(data)) {
    return data.map(item => trimValues(item));
  }

  if (data !== null && typeof data === "object") {
    if (data instanceof Date) {
      return data;
    }
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key.trim(), trimValues(value)])
    );
  }
  return data;
};

export const getFullDetailCharacteristicSpec = async (characteristics: any, isCharUse?: boolean) => {
  if (!characteristics || characteristics.length === 0) {
    return [];
  }
  const ids = characteristics.map((item: any) => item.id);
  try {
    const response = await getFullCharacteristicByIdIn(ids);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      response.data = [];
    }
    characteristics.forEach((item: any) => {
      const found = response.data.find((elm: any) => elm.id === item.id);
      if (found) {
        item.layout = found.layout;
        if (!item.layout) {
          item.layout = { ctlType: convertValueTypeToCtlType(item.valueType) };
        }
        if (isCharUse) return;
        if (!item.characteristicValueSpecification?.length) {
          convertNewCharSpecValue(item);
        }
      } else {
        // handle old data
        item.layout = { ctlType: convertValueTypeToCtlType(item.valueType) };
        if (isCharUse) return;
        if (!item.characteristicValueSpecification?.length) {
          convertNewCharSpecValue(item);
          return;
        }
        // convert type to CHAR_VALUE_SPEC
        item.characteristicValueSpecification = item.characteristicValueSpecification.map((elm: any) => {
          return {
            ...elm,
            '@type': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
            '@baseType': CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
          }
        });
      }
    });
    return characteristics;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export const getChannelsByIdIn = async (channels: any[]) => {
  if (!channels || channels.length === 0) {
    return [];
  }
  const ids = channels.map((item: any) => item.id);
  try {
    const response = await findChannelsByIdIn(ids);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      return [];
    }
    channels.forEach((item: any) => {
      const found = response.data.find((elm: any) => elm.id === item.id);
      if (found) {
        item.code = found.code;
      }
    });
    return channels;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export const getCategoriesByIdIn = async (categories: any[]) => {
  if (!categories || categories.length === 0) {
    return [];
  }
  const ids = categories.map((item: any) => item.id);
  try {
    const response = await findCategoriesByIdIn(ids);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      return [];
    }
    categories.forEach((item: any) => {
      const found = response.data.find((elm: any) => elm.id === item.id);
      if (found) {
        item.code = found.code;
      }
    });
    return categories;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export const getDetailPOPrice = async (poPrices: any) => {
  if (!poPrices || poPrices.length === 0) {
    return [];
  }
  let results: any[] = [];
  const ids = poPrices.map((item: any) => item.id);
  try {
    const response = await findAllPOPByIds(ids, `${DEFAULT_FIELDS_PARAM},price,priceType`);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      return [];
    }
    poPrices.forEach((item: any) => {
      const found = response.data.find((elm: any) => elm.id === item.id);
      if (found) {
        results.push({
          id: found.id,
          name: found.name,
          price: found.price ?? { value: '', unit: '' },
          isMatrix: found['@type'] === TypeEnum.POP_MATRIX,
          priceType: found.priceType
        })
      }
    });
    return results;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export const convertValidFor = (validFor: any) => {
  return {
    startDateTime: validFor?.startDateTime ? new Date(validFor.startDateTime) : null,
    endDateTime: validFor?.endDateTime ? new Date(validFor.endDateTime) : null,
  }
}

export const convertValueTypeToCtlType = (valueType: string) => {
  switch (valueType) {
    case ValueTypeEnum.BOOLEAN:
      return CtlTypeEnum.CHECKBOX;
    case ValueTypeEnum.DATETIME:
      return CtlTypeEnum.DATETIME;
    case ValueTypeEnum.PICK_LIST:
      return CtlTypeEnum.COMBOBOX;
    default:
      return CtlTypeEnum.TEXTBOX;
  }
}

export const convertNewCharSpecValue = (row: any) => {
  const valueType = row.valueType;
  row.characteristicValueSpecification = [DEFAUTL_CHAR_SPEC_VALUE];
  // Boolean, Range, Number, DateTime, Text
  if (valueType === ValueTypeEnum.BOOLEAN) {
    row.characteristicValueSpecification = [
      {
        ...DEFAUTL_CHAR_SPEC_VALUE,
        valueType: ValueTypeEnum.BOOLEAN,
        value: false
      }
    ]
    return;
  }
  if (valueType === ValueTypeEnum.RANGE) {
    row.characteristicValueSpecification = [
      {
        ...DEFAUTL_CHAR_SPEC_VALUE,
        valueType: ValueTypeEnum.RANGE,
        valueFrom: null,
        valueTo: null,
      },
    ]
    return;
  }
  if (valueType === ValueTypeEnum.NUMBER) {
    row.characteristicValueSpecification = [
      {
        ...DEFAUTL_CHAR_SPEC_VALUE,
        valueType: ValueTypeEnum.NUMBER,
        value: null
      }
    ]
    return;
  }
  if (valueType === ValueTypeEnum.DATETIME) {
    row.characteristicValueSpecification = [
      {
        ...DEFAUTL_CHAR_SPEC_VALUE,
        valueType: ValueTypeEnum.DATETIME,
        value: null
      }
    ]
  }
}

export const convertCharacteristicValue = (elm: any) => {
  if (elm.valueType === ValueTypeEnum.OBJECT) {
    return JSON.stringify(elm.value);
  }
  return elm.unitOfMeasure ? `${elm.value} ${elm.unitOfMeasure}` : elm.value;
};

export const getProductOfferingsByIdIn = async (productOfferings: any[]) => {
  if (!productOfferings || productOfferings.length === 0) {
    return [];
  }
  const ids = productOfferings.map((item: any) => item.id);
  try {
    const response = await findPOByIdIn(ids);
    if (response.status !== StatusCodeEnum.SUCCESS) {
      return [];
    }
    productOfferings.forEach((item: any) => {
      const found = response.data.find((elm: any) => elm.id === item.id);
      if (found) {
        item.code = found.code;
      }
    });
    return productOfferings;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

export const convertFeatureSpecification = async (featureSpecification: any[]) => {
  if (!featureSpecification?.length) {
    return [];
  }
  const allFsCharacteristic = featureSpecification.map(fs => fs.featureSpecCharacteristic).flat();
  const filteredCharacteristic = allFsCharacteristic.filter((item: any) => item) || [];
  const uniqueFsCharacteristic = filteredCharacteristic.filter((item: any, index: number, self: any[]) =>
    index === self.findIndex((t) => t.id === item.id)
  );
  if (!uniqueFsCharacteristic?.length) {
    return featureSpecification;
  }
  const characteristicsDetail = await getFullDetailCharacteristicSpec(cloneDeep(uniqueFsCharacteristic));
  featureSpecification.forEach(fs => {
    fs.featureSpecCharacteristic = fs.featureSpecCharacteristic.map((item: any) => {
      const foundItem = characteristicsDetail.find((char: any) => char.id === item.id);
      if (!foundItem) {
        return item;
      }
      return { 
        ...foundItem, 
        characteristicValueSpecification: item.characteristicValueSpecification.length ? 
          item.characteristicValueSpecification : foundItem.characteristicValueSpecification 
      };
    });
  });
  return featureSpecification;
}
