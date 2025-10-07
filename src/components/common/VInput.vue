<template>
  <div class="flex items-start w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold leading-10">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1">
      <IconField>
        <slot name="prepend" />
        <InputText
          v-bind="$attrs"
          v-model="modelValue"
          :name="name"
          fluid
          @blur="formatValue"
        />
        <slot name="append" />
      </IconField>
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
  name?: string;
  customLabelClass?: string;
  label?: string;
  required?: boolean;
  form?: any;
  showError?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  customLabelClass: "min-w-[80px]",
  label: "",
  required: false,
  form: null,
  showError: false,
  errorMessage: "",
});

const modelValue = defineModel<string>();

const formatValue = () => {
  modelValue.value = modelValue.value?.trim();
  if (!props.form) return;
  props.form[props.name].value = props.form[props.name].value?.trim();
};
</script>

<style scoped></style>
