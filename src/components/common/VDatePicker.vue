<template>
  <div class="flex items-center w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1">
      <DatePicker
        v-bind="$attrs"
        :name="endDateName"
        placeholder="DD/MM/YYYY"
        dateFormat="dd/mm/yy"
        showIcon
        iconDisplay="input"
      />
      <Message
        v-if="(form && form?.[name]?.invalid) || showError"
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
import moment from "moment";
import { computed } from "vue";

interface Props {
  startDateName: string;
  endDateName: string;
  label?: string;
  required?: boolean;
  form: any;
  customLabelClass: string;
  showError: boolean;
  errorMessage: string;
}

const props = withDefaults(defineProps<Props>(), {
  startDateName: "",
  endDateName: "",
  label: "",
  required: false,
  form: null,
  customLabelClass: "min-w-[80px]",
  showError: false,
  errorMessage: "",
});
</script>

<style scoped></style>
