<template>
  <div class="drop-container"
    @drop="dropItem"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="drop-header">
      <div>
        <span class="icon-plus text-[#334155]">+</span>
        <span class="text-[#334155]">{{ isSearchTab ? $t('drop.see-details') : $t('drop.add-new')}}</span>
      </div>
      <div>
        <span class="pi pi-home"></span>
      </div>
    </div>
    <div class="drop-footer">
      <Button :label="displayValue || $t('drop.btn-label')" variant="outlined" class="btn-drop" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isSearchTab?: boolean;
  displayValue?: string
}>();

const emit = defineEmits<{
  (e: 'dropItem', event: DragEvent): void;
}>();

const dropItem = (event: DragEvent) => {
  event.preventDefault();
  emit('dropItem', event);
};
</script>

<style scoped lang="scss">
.drop-container {
  border: 1px dashed #000;
  margin: 10px;
  border-radius: 5px;
  width: 280px;
  background: #fff;

  .drop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      display: flex;
      align-items: center;
      padding: 5px 10px;
    }

    .icon-plus {
      display: inline-flex;
      width: 16px;
      border: solid 1px #000;
      border-radius: 10px;
      height: 16px;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      cursor: pointer;
      font-size: 12px;
    }
  }

  .drop-footer {
    border-top: dashed 1px #000;

    .btn-drop {
      margin: 5px 10px;
      width: 93%;
      height: 30px;
    }
  }
}

:deep(.p-button-outlined:not(:disabled):hover) {
  background: #737ddf;
  color: #fff;
}
</style>
