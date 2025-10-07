<template>
  <div :draggable="true" class="drag-item w-[49%]" @dragstart="startDrag($event, element)" @dragend="endDrag">
    <Card class="cursor-move card-item">
      <template #content>
        <div class="flex">
          <div class="icon-ellipsis">
            <span class="fa fa-ellipsis-v"></span>
          </div>
          <p class="card-content">
            {{ element.id ? element.name : $t(`nodes.${element.name}`) }}
          </p>
          <div style="width: 15%">
            <span class="icon-box">
              <span class="pi pi-box text-white"></span>
            </span>
          </div>
        </div>
        <div class="card-desc" style="word-wrap: break-word; padding-right: 13px">
          {{ element.id ? (!isShowDesc ? element.code : element.description) : $t(`nodes.${element.desc}`) }}
        </div>
      </template>
      <template #footer>
        <div class="card-footer">
          <span v-if="feature === KeyEnum.RESOURCE_SPEC_KEY || feature === KeyEnum.PO_PRICE_KEY" class="text-[13px]">{{
            $t(`types.${element.type}`)
          }}</span>
          <span v-else>{{ element.id && element.version ? `Ver: ${element.version}` : '' }}</span>
          <div class="end">
            <span class="icon-remove">
              <span class="pi pi-times-circle text-red"></span>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-p-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"
                />
                <path
                  d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"
                />
              </svg>
            </span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { TYPES_SHOW_DESC } from '@/components/config/constant';
import { KeyEnum } from '@/components/config/enum';
import { store } from '@/store/store';


const props = defineProps<{
  element: any;
  feature?: string;
}>();

const isShowDesc = TYPES_SHOW_DESC.includes(props.element['@type']);

let clonedElement: HTMLElement | null = null;

const startDrag = (evt: DragEvent, item: any) => {
  if (!evt.dataTransfer || !(evt.target instanceof HTMLElement)) return;

  const draggedElement = evt.target.closest('.drag-item') as HTMLElement;
  if (!draggedElement) return;
  store.nodeDragged = item;

  // Vô hiệu hóa hình ảnh kéo mặc định
  const img = new Image();
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  evt.dataTransfer.setDragImage(img, 0, 0);

  // Tạo một div mới và sao chép nội dung từ draggedElement
  clonedElement = document.createElement('div');
  clonedElement.className = 'cloned-element';
  clonedElement.innerHTML = draggedElement.innerHTML; // Sao chép nội dung HTML
  copyStyles(draggedElement, clonedElement); // Sao chép CSS của draggedElement

  // Cấu hình clonedElement để hiển thị sắc nét
  clonedElement.style.position = 'fixed';
  clonedElement.style.top = `${evt.clientY - draggedElement.offsetHeight / 2}px`;
  clonedElement.style.left = `${evt.clientX - draggedElement.offsetWidth / 2}px`;
  clonedElement.style.width = `${draggedElement.offsetWidth}px`;
  clonedElement.style.height = `${draggedElement.offsetHeight}px`;
  clonedElement.style.pointerEvents = 'none';
  clonedElement.style.zIndex = '1000';
  clonedElement.style.opacity = '1';
  document.body.appendChild(clonedElement);

  // Cập nhật vị trí clonedElement khi kéo
  document.addEventListener('dragover', onDragOver);
};

// Cập nhật vị trí clonedElement theo con trỏ chuột
const onDragOver = (evt: DragEvent) => {
  evt.preventDefault();
  if (clonedElement) {
    clonedElement.style.top = `${evt.clientY - clonedElement.offsetHeight / 2}px`;
    clonedElement.style.left = `${evt.clientX - clonedElement.offsetWidth / 2}px`;
  }
  evt.dataTransfer!.dropEffect = 'move'; // Hiển thị icon move
};

// Sao chép toàn bộ CSS từ phần tử gốc sang clonedElement
const copyStyles = (source: HTMLElement, target: HTMLElement) => {
  const computedStyle = window.getComputedStyle(source);
  for (const prop of computedStyle) {
    target.style.setProperty(prop, computedStyle.getPropertyValue(prop));
  }
};

// Xóa clonedElement khi kết thúc kéo
const endDrag = () => {
  if (clonedElement) {
    document.body.removeChild(clonedElement);
    clonedElement = null;
  }
  document.removeEventListener('dragover', onDragOver);
};
</script>

<style scoped lang="scss">
.card-item {
  margin-bottom: 20px;
  overflow: hidden;
  height: max-content;
  border-radius: 6px !important;

  .icon-ellipsis {
    display: flex;
    align-items: center;
    width: 10%;
    margin-top: 3%;
  }

  .card-content {
    width: 75%;
    margin-top: 3%;
    font-weight: bold;
    word-wrap: break-word;
    white-space: pre-wrap;
    padding-right: 5px;
  }

  .card-desc {
    margin: 10px auto;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .icon-box {
    background-color: #797c92;
    display: flex;
    height: 25px;
    align-items: center;
    justify-content: center;
    padding: 3px;
    width: 100%;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 10px 10px 0;

    .end {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 40%;

      .icon-remove {
        padding-top: 4px;
      }
    }
  }
}

:deep(.p-card-body) {
  padding: 0 0 0 1.25rem;
  border-top: solid 3px #797c92;
}

.cloned-element {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background: white;
  overflow: hidden;
  opacity: 1 !important; // Đảm bảo không bị mờ
  transform: scale(1); // Tránh hiệu ứng zoom của trình duyệt
}

.drag-item {
  height: max-content;
}
</style>
