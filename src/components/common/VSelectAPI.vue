<template>
  <div class="flex items-start w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold leading-10">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div
      class="flex flex-col gap-1 flex-1 overflow-hidden"
      :class="customDropDownClass"
    >
      <Dropdown
        ref="dropdownRef"
        v-bind="$attrs"
        v-model="selectedValue"
        :name="name"
        :options="selectOptions"
        optionLabel="label"
        optionValue="value"
        :filter="false"
        panelClass="customDropdown"
        :emptyMessage="$t('add-modal.filter-no-data')"
        class="w-full"
        @show="attachScrollListener"
        @click="initSelectOptions"
      >
        <template #value="slotProps">
          <div
              class="min-h-6 w-full truncate"
              v-if="slotProps.value"
              v-tooltip.top="getLabelSelected(slotProps, true)"
          >
            {{ getLabelSelected(slotProps) }}
          </div>
          <div v-else class="min-h-6 w-full truncate text-gray-400">{{ slotProps.placeholder }}</div>
        </template>
        <template v-if="filterable" #header>
          <div class="flex items-center gap-2 p-4">
            <Checkbox
              v-if="multiple"
              v-model="checkedAll"
              :binary="true"
              @change="handleSelectAll"
            />
            <VInput
              v-model="filterValue"
              @input="handleFilter"
              :placeholder="$t(`searchMulti.search-placeholder`)"
            >
              <template #append>
                <InputIcon class="pi pi-search" />
              </template>
            </VInput>
          </div>
        </template>
        <template #option="slotProps">
          <div
            class="flex items-center gap-2 w-full py-2 px-3"
            @mousedown.prevent.stop="handleCustomSelect(slotProps.option)"
          >
            <Checkbox
              v-if="multiple"
              v-model="slotProps.option.checked"
              :binary="true"
              @click.stop="handleCustomSelect(slotProps.option)"
            />
            <div
              class="w-full truncate max-w-[250px]"
              :title="slotProps?.option?.label"
              @click.stop
            >
              {{ slotProps?.option?.label }}
            </div>
          </div>
        </template>
      </Dropdown>
      <Message
        v-if="form?.[name]?.invalid || showError"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ form?.[name]?.error.message || errorMessage }}
      </Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, onMounted, computed } from "vue";
import { StatusCodeEnum } from "@/components/config/enum";
import { Options } from "@/components/interface/char-catalog";
import debounce from "lodash/debounce";
import { useI18n } from "vue-i18n";

interface Props {
  name: string;
  customLabelClass: string;
  label?: string;
  required?: boolean;
  form: any;
  multiple: boolean;
  customDropDownClass: string;
  filterable: boolean;
  convertQuerySearch: (query: any) => any;
  showError: boolean;
  errorMessage: string;
}

interface ModelValue {
  displayValue: string;
  currentPage: number;
  search: string;
  loading: boolean;
  maxPage: number;
  pageSize: number;
  showLoading?: boolean;
  optionLabel: string | ((args: any) => string);
  optionValue: string | string[];
  fetchDataAPI: (...args: any[]) => Promise<any>;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  customLabelClass: "min-w-[80px]",
  label: "",
  required: false,
  multiple: false,
  form: null,
  filterable: false,
  convertQuerySearch: () => {},
  showError: false,
  errorMessage: "",
});

const emits = defineEmits(["multiSelected", "change"]);

const { t } = useI18n();
const selectOptions = ref<Options[]>([]);
const filterData = defineModel<ModelValue>();
const selectedValue = defineModel("selectedValue");
const filterValue = ref("");
const checkedAll = ref(false);
const dropdownRef = ref();

const attachScrollListener = async () => {
  await nextTick(() => {
    const listContainer = document.querySelector(
      ".p-select-list-container, .p-multiselect-list-container"
    );
    if (listContainer) {
      listContainer.removeEventListener("scroll", onScrollDropdown);
      listContainer.addEventListener("scroll", onScrollDropdown);
    }
  });
};

const initSelectOptions = () => {
  if (!selectedValue.value && props.form) {
    selectedValue.value = props.form[props.name]?.value;
  }
  if (!!selectOptions.value?.length) return;
  getOptions();
};

const getLabelSelected = (slotProps, isTooltip = false) => {
  const { value, placeholder } = slotProps;
  if (!value && !isTooltip) return placeholder || ""

  if (!props.multiple) {
    const optionSelected = selectOptions.value.find((opt) => opt.value === value);
    return optionSelected?.label || filterData.value?.displayValue;
  }
  const listSelected = selectOptions.value
    .filter((item) => value?.includes(item.value))
    .map((item) => item.label);

  if (listSelected?.length < 4 || isTooltip) return listSelected.join(", ");
  return t("pages.promotion.itemsSelected", {
    value: listSelected?.length || 0,
  });
};

const getAllDataSelected = (id: string) => {
  const optionSelected = selectOptions.value.find(
    (opt) => opt.item[filterData.value?.optionValue] === id
  );
  return optionSelected?.item;
};

const handleCustomSelect = (option) => {
  if (!props.multiple) {
    selectedValue.value = option.value;
    if (props?.form?.[props.name]) props.form[props.name].value = option.value;
    emits("change", { value: option.value });
    dropdownRef.value?.hide();
    return;
  }
  checkedAll.value = false;
  option.checked = !option.checked;
  selectedValue.value = selectOptions.value
    .filter((item) => item.checked)
    .map((item) => item.value);

  if (selectedValue.value?.length === selectOptions.value?.length) {
    checkedAll.value = true;
  }
  emits("multiSelected", selectedValue.value);
  setTimeout(() => {
    dropdownRef.value?.show();
  }, 100);
};

const handleSelectAll = () => {
  selectOptions.value = selectOptions.value.map((item) => ({
    ...item,
    checked: checkedAll.value,
  }));
  selectedValue.value = checkedAll.value
    ? selectOptions.value.map((item) => item.value)
    : [];
  emits("multiSelected", selectedValue.value);
};

const handleFilter = debounce(() => {
  const searchValue = filterValue.value?.trim();
  filterData.value.currentPage = 0;
  filterData.value.search = props.convertQuerySearch(searchValue);
  getOptions();
}, 300);

const onScrollDropdown = async (event: any) => {
  const scrollElement = event.target;
  const nearBottom =
    scrollElement.scrollTop + scrollElement.clientHeight >=
    scrollElement.scrollHeight - 10;

  if (nearBottom && !filterData.value.loading) {
    if (filterData.value.currentPage >= filterData.value.maxPage) return;
    filterData.value.currentPage++;
    filterData.value.loading = true;
    await getOptions(true);
    filterData.value.loading = false;
  }
};

const getOptions = async (isMore = false) => {
  try {
    const response = await filterData.value.fetchDataAPI(
      filterData.value.currentPage,
      filterData.value.pageSize,
      filterData.value.search,
      !filterData.value?.showLoading
    );

    if (response.status !== StatusCodeEnum.SUCCESS) return;

    const total = parseInt(response.headers["x-total-count"], 10);
    filterData.value.maxPage = Math.ceil(total / filterData.value.pageSize);

    const optionData = response?.data?.map((item) => {
      let optionVal = item[filterData.value.optionValue];
      if (Array.isArray(filterData.value.optionValue)) {
        optionVal = filterData.value.optionValue.reduce(
          (acc, cur) => ((acc[cur] = item[cur]), acc),
          {}
        );
      }

      let labelValue = item[filterData.value.optionLabel];
      if (typeof filterData.value.optionLabel !== "string") {
        labelValue = filterData.value.optionLabel(item);
      }
      return {
        label: labelValue,
        value: optionVal,
        checked: false,
        item,
      };
    });

    if (!isMore) {
      selectOptions.value = optionData;
      return;
    }
    selectOptions.value = [...selectOptions.value, ...optionData];
  } catch (error) {}
};

defineExpose({ getAllDataSelected });
</script>

<style lang="scss">
.customDropdown {
  .p-select-list {
    gap: 0 !important;
  }
  .p-select-option {
    padding: 0 !important;
  }
}
</style>
