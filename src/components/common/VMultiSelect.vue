<template>
  <div class="flex items-start w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold leading-10">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1">
      <MultiSelect
        v-bind="$attrs"
        :name="name"
        :options="options"
        fluid
        filter
        :maxSelectedLabels="5"
        :optionLabel="optionLabel"
        :optionValue="optionValue"
        :selectedItemsLabel="$t('add-modal.selected-label', { count: `{0}` })"
      >
        <template #empty>
          <div class="min-h-10 flex items-center">
            {{ $t("table-selection.no-data") }}
          </div>
        </template>
      </MultiSelect>
      <Message
        v-if="form && form[name]?.invalid"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ form[name]?.error.message }}
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
}

withDefaults(defineProps<Props>(), {
  name: "",
  customLabelClass: "min-w-[80px]",
  label: "",
  required: false,
  form: null,
  optionLabel: "label",
  optionValue: "value",
});
</script>

<style scoped></style>
