<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Mặc định"
  },
  inputValue: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["submit"]);

const inputValue = ref(props.inputValue);

watch(() => props.inputValue, (val) => {
  inputValue.value = val;
});

const handleClick = () => {
  emit("submit", inputValue.value);
};
</script>

<template>
  <div>
    <h1>{{ text }}</h1>
    <input v-model="inputValue" placeholder="Nhập dữ liệu..." />
    <button @click="handleClick">Gửi dữ liệu</button>
  </div>
</template>

<style scoped>
input {
  margin-right: 8px;
  padding: 4px;
}
button {
  padding: 4px 8px;
}
</style>