<template>
  <div class="flex items-start w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold leading-10">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1 truncate">
      <Select
        v-model="modelValue"
        v-bind="$attrs"
        :name="name"
        :options="options"
        fluid
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        v-tooltip.top="(form && form[name]?.value) || modelValue || ''"
      >
        <template #empty>
          <div class="min-h-10 flex items-center">
            {{ $t("table-selection.no-data") }}
          </div>
        </template>
        <template #option="slotProps">
          <div
            class="w-full truncate max-w-[180px]"
            :title="slotProps?.option[optionLabel]"
          >
            {{ slotProps?.option[optionLabel] }}
          </div>
        </template>
      </Select>
      <Message
        v-if="(form && form[name]?.invalid) || showError"
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
interface Props {
  name: string;
  customLabelClass: string;
  label?: string;
  required?: boolean;
  options: {
    label: string;
    value: string;
  }[];
  form: any;
  optionLabel: string;
  optionValue: string;
  showError: boolean;
  errorMessage: string;
}

withDefaults(defineProps<Props>(), {
  name: "",
  customLabelClass: "min-w-[80px]",
  label: "",
  required: false,
  form: null,
  optionLabel: "label",
  optionValue: "value",
  showError: false,
  errorMessage: "",
});

const modelValue = defineModel<string>();
</script>

<style scoped></style>
