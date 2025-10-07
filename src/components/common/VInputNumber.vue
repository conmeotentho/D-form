<template>
  <div class="flex items-start w-full gap-4">
    <span v-if="label" :class="customLabelClass" class="font-bold leading-10">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="flex flex-col gap-1 flex-1">
      <InputNumber
        v-model="currentValue"
        :name="name"
        v-bind="$attrs"
        :min="minValue"
        :max="maxValue"
        :useGrouping="useGrouping"
        :disabled="disabled"
        inputId="numeric"
        inputMode="decimal"
        :allowEmpty="true"
        @keydown="handleKeyDown"
        @blur="onBlur"
      />
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
interface Props {
  name: string;
  label?: string;
  required?: boolean;
  customLabelClass: string;
  form: any;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  integerOnly?: boolean;
  positiveOnly?: boolean;
  useGrouping?: boolean;
  showError: boolean;
  errorMessage: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  customLabelClass: "min-w-[80px]",
  form: null,
  disabled: false,
  minValue: -Infinity,
  maxValue: Infinity,
  integerOnly: true,
  positiveOnly: true,
  useGrouping: false,
  showError: false,
  errorMessage: "",
});

const currentValue = defineModel<number | null>();

const handleKeyDown = (event: KeyboardEvent) => {
  const keyCode = event.keyCode || event.which;
  const invalidKeys = [69, 231, 107, 187]; // e, ê, +,...
  const blockNegative = props.positiveOnly && [189, 109].includes(keyCode);
  const blockDecimal =
    props.integerOnly && [46, 188, 190, 110].includes(keyCode);

  if (invalidKeys.includes(keyCode) || blockNegative || blockDecimal) {
    event.preventDefault();
  }
};

const onBlur = () => {
  if (+currentValue.value < +props.minValue) {
    currentValue.value = +props.minValue;
  } else if (+currentValue.value > +props.maxValue) {
    currentValue.value = +props.maxValue;
  }
};
</script>

<style scoped></style>
