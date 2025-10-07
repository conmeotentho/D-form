<template>
  <div class="flex items-center w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1">
      <DatePicker
        :name="startDateName"
        placeholder="DD/MM/YYYY"
        dateFormat="dd/mm/yy"
        showIcon
        iconDisplay="input"
        :maxDate="maxDate"
        :minDate="new Date()"
      />
      <DatePicker
        :name="endDateName"
        placeholder="DD/MM/YYYY"
        dateFormat="dd/mm/yy"
        showIcon
        iconDisplay="input"
        :minDate="minDate"
      />
      <Message
        v-if="form[name]?.invalid"
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
import moment from "moment";
import { computed } from "vue";

interface Props {
  startDateName: string;
  endDateName: string;
  label?: string;
  required?: boolean;
  form: any;
  customLabelClass: string;
}

const props = withDefaults(defineProps<Props>(), {
  startDateName: "",
  endDateName: "",
  label: "",
  required: false,
  form: null,
  customLabelClass: "min-w-[80px]",
});

const maxDate = computed(() => {
  if (!props.form?.[props.endDateName]?.value) return null
  return moment(props.form[props.endDateName]?.value).toDate()
})

const minDate = computed(() => {
  if (!props.form?.[props.startDateName]?.value) return new Date()
  return moment(props.form[props.startDateName]?.value).toDate()
})
</script>

<style scoped></style>
