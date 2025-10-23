<template>
  <div class="h-[100vh] resize-x" :style="{ width: width + 'px' }">
    <div class="tab-content-parent search-multi">
      <div class="head">
        <IsaxElementIcon class="cursor-pointer" stroke="#fff" @click="handleHiddenContent" />
        <span class="title" v-if="isShowContent"
          >{{ isSearchTab ? $t('searchMulti.search') : $t('searchMulti.add-title') }}
          <span class="sub"></span>
        </span>
        <div class="actions" v-if="isShowContent">
          <button class="btn btn-more" @click="handleHiddenContent">
            <span class="pi pi-chevron-left"></span>
          </button>
        </div>
      </div>

      <div class="box-content">
        <div class="tabs nav">
          <div
            class="item"
            :class="{ active: isSearchTab }"
            data-toggle="tab"
            data-target="#page-search"
            :title="$t('searchMulti.search')"
            @click="changeSearchTab"
          >
            <span class="pi pi-search !text-lg !font-bold"></span>
          </div>
          <div
            v-if="hasPermissionCreate"
            class="item"
            :class="{ active: isAddNewTab }"
            data-toggle="tab"
            data-target="#page-add"
            :title="$t('searchMulti.add-title')"
            @click="changeAddNewTab"
          >
            <span class="pi pi-plus !text-lg !font-bold"></span>
          </div>
        </div>
        <div v-if="isShowContent" class="tab-content-box p-scrollbar">
          <div class="pages tab-content">
            <div class="tab-pane active" id="page-search" v-if="isSearchTab">
              <div class="catalog-plugin w-full">
                <div class="top-filter">
                  <div class="search-box">
                    <InputText
                      class="w-[80%]"
                      :placeholder="$t(`searchMulti.${searchConfig?.placeholder}`)"
                      v-model="searchValue"
                      @keyup.enter="searchByConditions"
                    />
                    <div class="btn bg-[#282737] text-white cursor-pointer" @click="searchByConditions">
                      <span class="pi pi-search !text-lg"></span>
                    </div>
                    <div
                      :class="{ 'btn btn-filter cursor-pointer': true, 'bg-[#282737]': isFilter }"
                      @click="toggleFilter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                          :style="{ fill: isFilter ? '#fff' : 'currentColor' }"
                          d="M13.5 16a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5zm3-5a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1 0-1.5zm3-5a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1 0-1.5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="filter-bottom">
                    <div class="w-[76%]">
                      <span class="text-m text-[12px] text-[#92929e]">{{ $t('searchMulti.object') }}</span>
                      <div class="select-custom">
                        <MultiSelect
                          class="custom-multiselect"
                          display="chip"
                          ref="objectSelectRef"
                          v-model="selectedObjects"
                          :options="objects"
                          :optionLabel="getOptionObjectLabel"
                          :placeholder="$t('searchMulti.select-object')"
                          @change="handleSelection"
                          :showToggleAll="false"
                        >
                          <template #option="slotProps">
                            <div class="flex items-center">
                              <div>{{ $t(`sidebar.${slotProps.option.key}`) }}</div>
                            </div>
                          </template>
                        </MultiSelect>
                      </div>
                    </div>
                  </div>
                  <AdvancedSearchComponent
                    v-if="isFilter"
                    :feature="selectedObjects[0]?.type"
                    v-model:queryAdvanced="queryAdvanced"
                    v-model:querySorted="querySorted"
                  />
                </div>
                <div class="plugin-body" id="search-tab">
                  <Panel toggleable v-for="item in props.listObjects" :key="item.key" style="margin-bottom: 10px">
                    <template #header>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-[#334155]">{{ $t(`sidebar.${item.key}`) }}</span>
                      </div>
                    </template>
                    <template #footer>
                      <div>
                        {{ $t('table-selection.items') }}
                        <span style="font-weight: bold">
                          {{ item.totalRecords > 0 ? currentPage * rowsPerPage + 1 : 0 }} -
                          {{ item.value.length + rowsPerPage * currentPage }}</span
                        >
                        / {{ item.totalRecords }}
                      </div>
                      <Paginator
                        v-if="item.totalRecords > 0"
                        :rows="rowsPerPage"
                        :first="item.resultCount + currentPage * rowsPerPage - 1"
                        :totalRecords="item.totalRecords"
                        :pageLinkSize="3"
                        @page="onPageChange"
                      />
                    </template>
                    <div class="list-items">
                      <CardComponent
                        v-for="element in item.value"
                        :key="element.id"
                        :element="element"
                        :feature="item.key"
                      />
                    </div>
                  </Panel>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="page-add" v-if="isAddNewTab">
              <CardComponent v-for="(element, key) in mapNewNodes[props.feature]" :key="key" :element="element" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { encodeWithEscape, getSearchConfigItems } from '../../layout/composables/common';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { mapNewNodes } from '../config/card';
import { ROWS_PER_PAGE } from '../config/constant';
import { mapObjects, searchCardConfig } from '../config/search';
import IsaxElementIcon from '../icons/IsaxElementIcon.vue';
import AdvancedSearchComponent from '../common/AdvancedSearchComponent.vue';
import CardComponent from '../common/CardComponent.vue';

const { t } = useI18n();

interface ObjectType {
  label: string;
  key: string;
  type: string;
  funcPath?: string;
}

interface PanelObject {
  key: string;
  value: any;
  totalRecords: number;
  resultCount: number;
}

const props = defineProps<{
  listObjects?: PanelObject[];
  feature?: string;
  width?: number;
  isSearchTab?: boolean;
  hasPermissionCreate: boolean;
}>();

const emit = defineEmits(['searchMultiple', 'changeTab', 'collapsed']);
const searchValue = ref('');
const objectSelectRef: any = ref(null);
const currentPage = ref(0);
const rowsPerPage = ref(ROWS_PER_PAGE);

const objects = ref<ObjectType[]>([]);
const selectedObjects = ref<ObjectType[]>([]);
const queryAdvanced = ref<string>('');
const querySorted = ref<string>('');
const isFilter = ref(false);
const isHidden = ref(false);
const isSearchTab = ref(true);
const isAddNewTab = ref(false);
const isShowContent = computed(() => !isHidden.value && props.width && props.width > 50);
const searchConfig = ref<any>(null);

onMounted(() => {
  objects.value = getSearchConfigItems(mapObjects, props.feature);
  objects.value.forEach(async (item) => {
    if (!item.funcPath) {
      return;
    }
    // const hasReadPermission = await checkReadPermissionByPathFunc(item.funcPath);
    // if (!hasReadPermission) {
    //   objects.value = objects.value.filter((obj) => obj !== item);
    // }
  });
  selectedObjects.value = [objects.value[0]];
  searchConfig.value = searchCardConfig[props.feature] ?? searchCardConfig.default;
});
watch(
  () => props.isSearchTab,
  (newVal) => {
    isSearchTab.value = newVal;
    isAddNewTab.value = !newVal;
  }
);

const handleHiddenContent = () => {
  isHidden.value = !isHidden.value;
  emit('collapsed');
};

const onPageChange = (event: any) => {
  currentPage.value = event.page;
  emitSearchMultipleEvent();
};

const searchByConditions = () => {
  currentPage.value = 0;
  emitSearchMultipleEvent();
};

const emitSearchMultipleEvent = () => {
  if (selectedObjects.value.length === 0) {
    currentPage.value = 0;
    emit('searchMultiple', currentPage.value, rowsPerPage.value, selectedObjects.value);
    return;
  }
  let query = '';
  if (searchValue.value) {
    query = `&${generateSearchQuery(searchValue.value)}`;
  }
  const conditions = queryAdvanced.value ? `&${queryAdvanced.value}` : '';
  query += `${conditions}${querySorted.value}`;
  emit('searchMultiple', currentPage.value, rowsPerPage.value, selectedObjects.value, query);
};

const generateSearchQuery = (keyword: string) => {
  if (!keyword) return '';
  keyword = keyword.trim();
  return searchConfig.value.property.map((prop: any) => `${prop}.like.or=${encodeWithEscape(keyword)}`).join('&');
};

const toggleFilter = () => {
  isFilter.value = !isFilter.value;
  queryAdvanced.value = '';
  querySorted.value = '';
};

const getOptionObjectLabel = (option: any) => {
  return t(`sidebar.${option.key}`);
};

const changeSearchTab = () => {
  isSearchTab.value = true;
  isAddNewTab.value = false;
  emit('changeTab', isSearchTab.value);
};

const changeAddNewTab = () => {
  isSearchTab.value = false;
  isAddNewTab.value = true;
  emit('changeTab', isSearchTab.value);
};

const handleSelection = () => {
  if (selectedObjects.value.length > 1) {
    selectedObjects.value = [selectedObjects.value[selectedObjects.value.length - 1]];
  }
  objectSelectRef?.value.hide();
};
</script>

<style scoped lang="scss">
.tab-content-parent {
  box-shadow: 0px 2px 5px rgba(40, 39, 55, 0.1);
  background-color: #fff;
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
    height: 43px;
    background: #ff617d;

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

    .actions {
      .btn {
        padding: 4px;
        color: #fff;
      }

      .btn:not(:disabled):not(.disabled) {
        cursor: pointer;
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

      .item.active {
        background-color: #fdf5f3;
        color: #f3876e;
        border-left-color: #f3876e;
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
      }
    }

    .tab-content-box {
      height: 100%;
      flex: 1;
      min-width: 0px;
      padding: 10px;
      overflow: auto;
      border-left: 1px solid #e1e8f3;

      &.p-scrollbar {
        position: relative;
      }

      .catalog-plugin {
        background-color: var(--p-card-background);
        display: flex;
        flex-direction: column;
        box-shadow: 0px 2px 5px rgba(40, 39, 55, 0.1);

        .top-filter {
          padding: 10px;
          border-bottom: 1px solid #dfe3e8;

          .search-box {
            display: flex;
            column-gap: 10px;
            align-items: center;

            .btn {
              width: 34px;
              height: 34px;
              padding: 0px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              font-size: 16px;
              flex-shrink: 0;
            }
          }

          .filter-bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .select-custom {
              position: relative;
            }
          }
        }

        .plugin-body {
          padding: 10px;
          flex: 1;

          .list-items {
            display: flex;
            column-gap: 5px;
            flex-wrap: wrap;
            margin-top: 15px;

            &.cursor-move {
              cursor: move;
            }
          }
        }
      }
    }
  }
}

#page-add {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

:deep(.p-multiselect) {
  width: 100%;
}

:deep(.p-multiselect-label) {
  display: block;
}

:deep(.p-multiselect-chip-item) {
  display: block;
  margin-bottom: 8px;
}

:deep(.p-multiselect-chip) {
  display: flex;
  justify-content: space-between;
}

:deep(.p-multiselect-chip-item:last-child) {
  margin-bottom: 30px;
}

:deep(.p-multiselect-dropdown) {
  align-items: unset;
  margin-top: 10px;
}

:deep(.p-chip-label) {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.p-select) {
  width: 100%;
}

:deep(.p-panel-header) {
  background: lightgray;
  height: 35px;
}
</style>
