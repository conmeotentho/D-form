<template>
    <div class="flex flex-col w-[98%]">
        <div class="filter-bottom">
            <div class="w-[50%]">
                <span class="text-m text-[12px] text-[#92929e]">{{ $t('searchMulti.order') }}</span>
                <div class="select-custom">
                    <Dropdown v-model="selectedAttribute" :options="attributes" :optionLabel="getOptionAttributeLabel"
                        v-tooltip.top="tooltipText(selectedAttribute, attributes, 'attribute-options')"/>
                </div>
            </div>
            <div class="w-[45%]">
                <span class="text-m text-[12px] text-[#92929e]">{{ $t('searchMulti.sort') }}</span>
                <div class="select-custom">
                    <Dropdown v-model="selectedSort" :options="sortOptions" :optionLabel="getOptionSortLabel"
                        v-tooltip.top="tooltipText(selectedSort, sortOptions, 'sort-options')"/>
                </div>
            </div>
        </div>
        <div class="tree-conditions">
            <div class="tree-conditions-isroot">
                {{$t('searchMulti.and')}} <span class="pi pi-caret-down"></span>
                <button class="btn btn-add" @click="addNewTreeNode">
                    <span class="pi pi-plus"></span> {{$t('searchMulti.add-action')}}</button>
            </div>
            <div class="tree-list">
                <div class="tree-conditions-node" v-for="(node, index) in treeNodes" :key="node.id">
                    <span class="icon-org">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path fill="#92929e" d="M10 2a3 3 0 0 0-.5 5.96V9.5h-3A1.5 1.5 0 0 0 5 11v1.042a3.001 3.001 0 1 0 1 0V11a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.042a3.001 3.001 0 1 0 1 0V11a1.5 1.5 0 0 0-1.5-1.5h-3V7.96A3.001 3.001 0 0 0 10 2ZM8 5a2 2 0 1 1 4 0a2 2 0 0 1-4 0ZM3.5 15a2 2 0 1 1 4.001 0A2 2 0 0 1 3.5 15Zm11-2a2 2 0 1 1 0 4.001a2 2 0 0 1 0-4.001Z"/>
                        </svg>
                    </span>
                    <div class="tree-node">
                        <Dropdown v-model="node.selectedOption" :options="node.validOptions"
                            :optionLabel="getOptionParamLabel" @change="changeOptions(node)" style="width: 35%"
                            v-tooltip.top="tooltipText(node.selectedOption, node.validOptions, 'param-option')"/>
                        <div class="operators" style="width: 63px">
                            <Dropdown v-model="node.selectedOperator" :options="node.operators"
                            v-tooltip.top="tooltipText(node.selectedOperator, node.operators, 'param-option')" 
                            :optionLabel="getOptionParamLabel"/>
                        </div>
                        <InputText type="text" :placeholder="$t(`param-option.${node.selectedOption.key}-placeholder`)"
                            v-model="node.value" v-if="node.selectedOption?.valueType === ValueTypeEnum.TEXT"
                            style="width: 47%" />
                        <Dropdown :placeholder="$t(`param-option.${node.selectedOption.key}-placeholder`)"
                            v-model="node.value"
                            :optionLabel="node.selectedOption.hasI18n ? getOptionParamLabel : 'label'"
                            :options="node.selectedOption.valueOptions" optionValue="label"
                            v-tooltip.top="tooltipTextForPickList(node)"
                            v-if="node.selectedOption?.valueType === ValueTypeEnum.PICK_LIST" style="width: 39%"/>
                        <div class="w-[47%]" v-if="node.selectedOption?.valueType === ValueTypeEnum.TOGGLE_SWITCH">
                            <ToggleSwitch v-model="node.value"/>
                        </div>
                        <!--Actions-->
                        <Dropdown class="custom-dropdown" :options="nodeActions" optionLabel="label"
                        @change="onChangeOption(index)" v-model="selectedAction">
                            <template #dropdownicon>
                                <i class="pi pi-ellipsis-v"></i>
                            </template>
                            <template #option="slotProps">
                                <div class="flex items-center">
                                    <i :class="slotProps.option.iconClass" style="padding-right: 10px;"></i>
                                    <div>{{ slotProps.option.label }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { encodeWithEscape, generateFilterJsonPath, getSearchConfigItems } from '@/layout/composables/common';
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ValueTypeEnum } from '@/components/config/enum';
import { mapAttributes, mapNodeActions, mapOperators, mapParamOptions, mapSortOptions } from '@/components/config/search';

const { t } = useI18n();
const attributes = ref<SearchAttribute[]>([]);
const sortOptions = ref<SortOption[]>([]);
const nodeActions = ref<NodeAction[]>([]);
const selectedAttribute = ref<SearchAttribute>();
const selectedSort = ref<SortOption>();
const treeNodes = ref<TreeNode[]>([]);
const paramOptions = ref<ParamOption[]>([]);
const queryAdvanced = defineModel<string>('queryAdvanced', { default: () => '' });
const querySorted = defineModel<string>('querySorted', { default: () => '' });
const selectedAction = ref<any>();

const props = defineProps<{
    feature?: string
}>();

const getOptionsByConfig = (feature: any) => {
    if (!feature) {
        return;
    }
    attributes.value = getSearchConfigItems(mapAttributes, feature);
    sortOptions.value = getSearchConfigItems(mapSortOptions, feature);
    nodeActions.value = getSearchConfigItems(mapNodeActions, feature);
    paramOptions.value = getSearchConfigItems(mapParamOptions, feature);
};

onMounted(() => {
    getOptionsByConfig(props.feature);
    selectedAttribute.value = attributes.value[0];
    selectedSort.value = sortOptions.value.find(item => item.default) || sortOptions.value[0];
});

watch(() => props.feature, (newFeature) => {
    treeNodes.value = [];
    getOptionsByConfig(newFeature);
    selectedAttribute.value = attributes.value[0];
    selectedSort.value = sortOptions.value.find(item => item.default) || sortOptions.value[0];
});

watch(treeNodes, () => {
    let jsonPathQueryString = '';
    let simpleQueryString: any[] = [];
    treeNodes.value.forEach((node) => {
        if (!node.selectedOption) {
            return '';
        }
        if (node.selectedOption) {
            switch (node.selectedOption.valueType) {
                case ValueTypeEnum.TEXT:
                    const textSearch = node.value ? encodeWithEscape(node.value.trim()) : '';
                    if (textSearch) {
                        if (node.selectedOption.jsonpath) {
                            let value = `@.${node.selectedOption.key}=~/.*${textSearch}.*/i`; // i: case-insensitive
                            if (node.selectedOperator?.label === '=') {
                                jsonPathQueryString += value; // contains a part of the entered value
                            } else {
                                jsonPathQueryString += `!(${value})`; // not contains a part of the entered value
                            }
                        } else {
                            if (node.selectedOperator?.key === 'like') {
                                simpleQueryString.push(`${node.selectedOption.key}.like=${textSearch}`);
                            } else {
                                simpleQueryString.push(`${node.selectedOption.key}${node.selectedOperator?.key}${textSearch}`);
                            }
                        }
                    }
                    break;
                case ValueTypeEnum.PICK_LIST:
                    const valueSearch = node.value ? encodeWithEscape(node.value.trim()) : '';
                    if (valueSearch) {
                        if (node.selectedOption.jsonpath) {
                            jsonPathQueryString += `@.${node.selectedOption.key}=='${valueSearch}'`;
                        } else {
                            simpleQueryString.push(`${node.selectedOption.key}${node.selectedOperator?.label}${valueSearch}`);
                        }
                    }
                    break;
                case ValueTypeEnum.TOGGLE_SWITCH:
                    const toggleValue = node.value ?? false;
                    if (node.selectedOption.jsonpath) {
                        jsonPathQueryString += `@.${node.selectedOption.key}==${toggleValue}`;
                    } else {
                        simpleQueryString.push(`${node.selectedOption.key}${node.selectedOperator?.key}${toggleValue}`);
                    }
                default:
                    break;
            }
        }
    });
    jsonPathQueryString = jsonPathQueryString.length ? generateFilterJsonPath(jsonPathQueryString) : '';
    if (simpleQueryString.length && jsonPathQueryString.length) {
        queryAdvanced.value = `${simpleQueryString.join('&')}${jsonPathQueryString}`;
    } else {
        queryAdvanced.value = simpleQueryString.join('&') || jsonPathQueryString.slice(1);
    }
}, { deep: true });

watch([selectedAttribute, selectedSort], () => {
    if (selectedAttribute.value && selectedSort.value) {
        const prefixSort = selectedSort.value.key === 'asc' ? '' : '-';
        querySorted.value = `&sort=${prefixSort}${selectedAttribute.value.value}`;
    }
});

const addNewTreeNode = () => {
    if (treeNodes.value.length === paramOptions.value.length) {
        return;
    }
    const validOptions = treeNodes.value.length > 0 ?
        paramOptions.value.filter(item => {
            return !treeNodes.value.some(node => node.selectedOption && node.selectedOption.key === item.key);
        })
        : paramOptions.value;
    const newNode: TreeNode = {
        id: Math.random().toString(),
        selectedOption: validOptions[0],
        value: null,
        validOptions: validOptions,
        selectedOperator: null,
        operators: []
    }
    newNode.operators = getOperatorsForNode(newNode);
    newNode.selectedOperator = newNode.operators[0] || null,
    treeNodes.value.push(newNode);
    changeOptions();
};


const changeOptions = (currentNode?: any) => {
    if (currentNode) {
        currentNode.value = null;
    }
    treeNodes.value.forEach((item) => {
        const selectedOptions = treeNodes.value.filter((node) => node.id !== item.id).map((item) => item.selectedOption);
        const filteredList = paramOptions.value.filter((item) => !selectedOptions.some((option) => option && option.key === item.key));
        item.validOptions = filteredList;
        item.operators = getOperatorsForNode(item);
        if (item.operators?.length) {
            item.selectedOperator = item.operators[0];
        } else {
            item.selectedOperator = null;
        }
    });
}

const getOperatorsForNode = (node: any) => {
  if (!node.selectedOption) {
    return [];
  }
  return mapOperators[node.selectedOption.key as keyof typeof mapOperators] || mapOperators.default || [];
};

const onChangeOption = (nodeIndex: number) => {
    if (!selectedAction.value) {
        return;
    }
    switch (selectedAction.value.key) {
        case 'delete':
            treeNodes.value = treeNodes.value.filter((item, index) => index !== nodeIndex);
            break;
        default:
            break;
    }
    selectedAction.value = null;
    changeOptions();
};

const getOptionAttributeLabel = (option: any) => {
    return t(`attribute-options.${option.key}`);
};

const getOptionSortLabel = (option: any) => {
    return t(`sort-options.${option.key}`);
};

const getOptionParamLabel = (option: any) => {
    return t(`param-option.${option.key}`);
};

const tooltipText = (item: any, options: any[], prefix: any) => {
  const selected = options.find((type: any) => type.key === item.key);
  return selected ? t(`${prefix}.${selected.key}`) : '';
}

const tooltipTextForPickList = (node: any) => {
    const options = node.selectedOption.valueOptions;
    if (!options || options.length === 0) {
        return '';
    }
    const selected = node.selectedOption.valueOptions.find((type: any) => type.label === node.value);
    return selected ? node.selectedOption.hasI18n ? t(`param-option.${selected.key}`) : selected.label : '';
};
</script>

<style scoped lang="scss">
.filter-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .select-custom {
        position: relative;
    }
}

.tree-conditions {
    padding-top: 5px;
    display: block;
    position: relative;
    margin-top: 10px;

    .tree-conditions-isroot {
        width: max-content;
        height: 40px;
        display: flex;
        align-items: center;
        background-color: #282737;
        color: #fff;
        column-gap: 9px;
        margin-bottom: 10px;
        padding: 2px 5px;
        border-radius: 6px;

        .btn-add {
            background-color: #828598;
            color: #f9f8f8;
        }

        .btn {
            display: inline-flex;
            justify-content: center;
            column-gap: 7px;
            align-items: center;
            border-radius: 6px;
            padding: 4px 14px;
        }
    }

    .tree-list {
        .tree-conditions-node {
            &:only-child .icon-org {
                top: 70px;
            }

            &:not(:last-child) .icon-org {
                top: 85px;
            }

            &:last-child .icon-org {
                top: 70px;
            }

            &:not(:last-child) {
                position: relative;
            }

            &:before {
                content: "";
                height: 1px;
                width: 20px;
                position: absolute;
                left: 21px;
                border-bottom: 1px solid #92929e;
            }

            &:only-child::before {
                top: 82px;
            }

            &:not(:last-child)::before {
                top: 95px;
            }

            &:last-child::before {
                top: 82px;
            }

            &:after {
                content: "";
                position: absolute;
                top: 45px;
                bottom: 35px;
                left: 10px;
                width: 1px;
                border-left: 1px solid #92929e;
            }

            .icon-org {
                width: 24px;
                height: 24px;
                border: 1px solid #92929e;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                background-color: #fff;
                color: #92929e;
                z-index: 2;
                position: absolute;
                left: -1px;
                box-shadow: 0px 2px 3px rgba(40, 39, 55, 0.1);
            }

            .tree-node {
                border: 1px dashed #92929e;
                padding: 10px;
                border-radius: 4px;
                position: relative;
                background-color: #f9fafd;
                font-size: 12px;
                display: flex;
                column-gap: 5px;
                align-items: center;
                margin-bottom: 10px;
                width: 90%;
                margin-left: 40px;

                .custom-dropdown {
                    width: 10px;
                    background: #828598;
                    border: none;
                    height: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}

:deep(.tree-node .p-inputtext) {
    font-size: 12px;
}


:deep(.custom-dropdown .p-select-label) {
    display: none;
}

:deep(.custom-dropdown .p-select-dropdown) {
    width: unset;
    color: #fff;
}

:deep(.operators .p-select .p-select-dropdown) {
    width: 24px;
}

:deep(.p-select) {
    width: 100%;
}

@media (max-width: 768px) {
    .tree-list .tree-conditions-node .icon-org {
        z-index: 0!important;
    }
}

/* toggle OFF */
:deep(.p-toggleswitch .p-toggleswitch-slider) {
    background-color: #d1d5db !important;
}

/* toggle ON */
:deep(.p-toggleswitch-checked .p-toggleswitch-slider) {
    background-color: v-bind(primaryColor) !important;
}
</style>