<template>
  <div class="tree-action" v-show="hasAction">
    <Button class="btn-action" type="button" :label="$t('detail-tab.cancel')" @click="emit('cancelTreeData')">
      <template #icon>
        <i class="pi pi-undo" style="transform: rotate(-30deg)"></i>
      </template>
    </Button>
    <Button class="btn-action" type="button" v-if="hasPermissionEdit" :label="$t('detail-tab.save')" icon="pi pi-check"
      @click="saveTreeData" />
  </div>
  <div style="margin: 10px">
    <div class="chart-container">
      <OrganizationChart :value="dataTest" collapsible>
        <template #default="{ node }">
          <div class="drag-item" :element="node" :isChildNode="true" :id="node.key"
            @dragover.prevent="dragOverHeader(node)" @dragleave.prevent="endDrag($event, node)"
            @dragend.prevent="endDrag($event, node)" @drop="dropNode($event, node)">
            <div class="container node-box" @click.stop="onNodeClick($event, node)"
              :class="{ 'rounded-b-none': node.isShow, 'rounded-b-[5px]': !node.isShow }" :style="{
                'border-top-color': node.isRoot ? `#ff617d!important` :
                  node.isShow ? `#ff617d!important` : '#828598!important'
              }">
              <div class="flex items-center">
                <div style="position: relative;" ref="dropdownRef">
                  <span>
                    <i v-if="node.actions" class="pi pi-ellipsis-v more" @click.stop="handleShowMenu(node)"></i>
                    <i v-else class="pi pi-lock more" @click.stop></i>
                  </span>
                  <div class="dropdown-menu menu" v-if="node.isShowMore">
                    <span class="dropdown-item" @click.stop="handleAction(action.key, node)"
                      v-for="action in node.actions" :key="action.key">
                      <span :class="action.iconClass"></span>
                      {{ $t(`node-actions.${action.key}`) }}
                    </span>
                  </div>
                </div>
                <span class="font-bold title break-all whitespace-pre-wrap">{{ node.objectName }}</span>
              </div>
              <div class="header-icon" v-if="node.isRoot"
                :style="{ 'background-color': node.isShow ? '#ff617d' : '' }">
                <span class="text-[11px] font-bold">{{ node.iconText }}</span>
              </div>
              <div class="header-icon" v-else
                :style="{ 'background-color': node.isShow ? '#ff617d' : '#828598' }">
                <span class="text-[11px] font-bold">{{ node.iconText }}</span>
              </div>
            </div>
          </div>
          <!-- Chi tiết node -->
          <div v-if="node.isShow" class="container detail" @dragover.prevent="allowDrop($event, node)"
            @dragleave.prevent="endDrag($event, node)" @dragend.prevent="endDrag($event, node)"
            @drop="dropNode($event, node)">
            <div class="flex items-center w-full">
              <span v-if="node.isIconFa" :class="node.dynamicComponent" class="text-[#92929e]"></span>
              <component v-else :is="node.dynamicComponent" :stroke="'#92929e'" />
              <span class="text-black font-bold pl-[10px]">{{ $t(`sidebar.${node.title}`) }}</span>
            </div>
            <div class="flex w-full mb-[20px]">
              <span class="text-black whitespace-normal text-start pl-[23px] pt-[10px] break-all whitespace-pre-wrap">{{
                TYPES_SHOW_DESC.includes(node['@type']) ? node.description : node.code }}</span>
            </div>
            <!--config params-->
            <div class="w-full" style="border-top: solid 1px #ccc" v-for="config in node.manualConfigParams"
              v-if="node.manualConfigParams?.length">
              <div class="flex items-center justify-start text-[#000] text-bold">
                <span class="config-title">{{ config.label }}</span>
              </div>
              <div class="flex flex-col items-center w-full" style="margin: 10px" v-for="elm in config.properties"
                :key="elm.name">
                <div class="w-full flex items-center ml-[10px]">
                  <span class="config-lbl"> {{ $t(`node-info.${elm.label}`) }}</span>
                </div>
                <div class="w-full">
                  <InputNumber :placeholder="$t(`node-info.number-placeholder`)" v-model="elm.value"
                    :disabled="elm.isDisabled" @input="validateConfigValue(node, config.properties, elm, $event)" />
                </div>
                <div class="w-full flex" v-if="elm.errorMsg?.length" v-for="err in elm.errorMsg" :key="err">
                  <small class="text-red-500 w-[200px] ml-[5px]">
                    {{ $t(`node-info.error.${err.msgKey}`, {
                      param1: err.param1, param2: err.param2
                    }) }}
                  </small>
                </div>
              </div>
            </div>
            <!--groups-->
            <div class="w-full" style="border-top: solid 1px #ccc" v-if="node.groups?.length">
              <div class="container child-group-box flex-col" v-for="child in node.groups" :key="child.id">
                <!--header-->
                <div class="header" :class="{ 'active': child.isShow }" @click.stop="showChildGroupNode(child)"
                  :id="child.key">
                  <div class="flex items-center w-full">
                    <div class="flex items-center w-[87%]">
                      <div style="position: relative;" ref="dropdownGroupRef">
                        <i class="pi pi-ellipsis-v more" @click.stop="handleShowMenu(child)"></i>
                        <div class="dropdown-menu menu" v-if="child.isShowMore">
                          <span class="dropdown-item" @click.stop="handleAction(action.key, child)"
                            v-for="action in child.actions" :key="action.key">
                            <span :class="action.iconClass"></span>
                            {{ $t(`node-actions.${action.key}`) }}
                          </span>
                        </div>
                      </div>
                      <span class="font-bold title">{{ child.objectName }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-[11px] font-bold">{{ child.iconText }}</span>
                    </div>
                  </div>
                </div>
                <!--body-->
                <div v-if="child.isShow" style="margin: 10px 5px">
                  <div class="flex items-center w-full mb-[15px]">
                    <span v-if="child.isIconFa" :class="child.dynamicComponent" class="text-[#92929e]"></span>
                    <component v-else :is="child.dynamicComponent" :stroke="'#92929e'" />
                    <span class="text-black font-bold pl-[10px]">{{ $t(`sidebar.${child.title}`)
                    }}</span>
                  </div>
                  <div class="w-full" style="border-top: solid 1px #ccc" v-for="config in child.manualConfigParams"
                    v-if="child.manualConfigParams?.length">
                    <div class="flex items-center justify-start text-[#000] text-bold">
                      <span class="config-title">{{ config.label }}</span>
                    </div>
                    <div class="flex flex-col items-center w-full" style="margin: 10px" v-for="elm in config.properties"
                      :key="elm.name">
                      <div class="w-full flex items-center ml-[10px]">
                        <span class="config-lbl"> {{ $t(`node-info.${elm.label}`) }}</span>
                      </div>
                      <div class="w-full">
                        <InputNumber :placeholder="$t(`node-info.number-placeholder`)" v-model="elm.value"
                          :disabled="elm.isDisabled"
                          @input="validateConfigValue(child, config.properties, elm, $event)" />
                      </div>
                      <div class="w-full flex" v-if="elm.errorMsg?.length" v-for="err in elm.errorMsg" :key="err">
                        <small class="text-red-500 w-[200px] ml-[5px]">
                          {{ $t(`node-info.error.${err.msgKey}`, {
                            param1: err.param1, param2:
                              err.param2
                          }) }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center w-[90%] ml-[20px] mr-[20px]" v-show="node.isShowButton">
              <Button :label="$t('drop.btn-label')" variant="outlined" class="w-full h-[30px]" />
            </div>
          </div>
        </template>
        <template #toggleicon="slotProps">
          <i class="expand-icon" :class="!slotProps.expanded ? 'pi pi-plus' : 'pi pi-minus'"></i>
        </template>
      </OrganizationChart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNodeActions, mappedObject, mergedData, trimValues } from '@/layout/composables/common';
import { getCategoryById } from "@/service/TreeApi";
import { getProductOfferingById, updatePO } from "@/service/TreeApi";
import { getProductSpecById } from "@/service/TreeApi";
import { getResourceSpecById } from "@/service/TreeApi";
import { getServiceSpecById } from "@/service/TreeApi";
import { store } from '@/store/store';
import cloneDeep from 'lodash/cloneDeep';
// import { useToast } from 'primevue/usetoast';
import { v4 as uuidv4 } from 'uuid';
import { computed, nextTick, onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { TYPES_SHOW_DESC } from './config/constant';
import { SchemaLocationEnum, StatusCodeEnum, TreeNodeActionEnum, TypeEnum } from './config/enum';
import { mapTreeChildNodeActions, mapTreeNodeActions } from './config/search';
import { mapTreeObjects } from './config/tree';

const props = defineProps<{
  parentObject: any,
  hasPermissionEdit?: boolean,
  hasPermissionDelete?: boolean,
}>();

const emit = defineEmits<{
  (e: 'saveTreeData', payload: any): void;
  (e: 'deleteNode', node: any): void;
  (e: 'cancelTreeData'): void;
  (e: 'extendCharacteristicData', parentObj: any): void;
}>();

const selectedNode = ref<any>({});
// const toast = useToast();
const { t } = useI18n();
const isShowConfirmDialog = ref(false);
const isShowModal = ref(false);

const dataTest = ref<TreeCard>({
  key: '', // Ensure key is initialized
  typeObject: '',
});
const iconExpandClass = ".p-organizationchart-node-toggle-button";

const hasAction = computed(() => {
  const configType = getTreeNodeObject(dataTest.value);
  return !configType.hasNotAction;
});

const dropdownRef = ref<any>(null);
const dropdownGroupRef = ref<any>(null);

onMounted(async () => {
  handleShowTreeCard();
  await nextTick();
  await changeStatusIconExpand();
  updateDynamicComponent([dataTest.value]);
  updateNodeActions([dataTest.value]);
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutsideChildGroup);
  document.addEventListener("click", handleClickToggleButton);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("click", handleClickOutsideChildGroup);
  document.removeEventListener("click", handleClickToggleButton);
});

onActivated(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleClickOutsideChildGroup);
  document.addEventListener("click", handleClickToggleButton);
});

onDeactivated(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("click", handleClickOutsideChildGroup);
  document.removeEventListener("click", handleClickToggleButton);
});

const handleShowTreeCard = () => {
  if (!props.parentObject) {
    return;
  }
  dataTest.value = {
    key: 'root',
    id: props.parentObject.id,
    '@type': props.parentObject['@type'],
    '@baseType': props.parentObject['@baseType'],
    href: props.parentObject.href,
    objectName: props.parentObject.name || '',
    description: props.parentObject.description,
    code: props.parentObject.code,
    version: props.parentObject.version,
    isRoot: true,
    parentKey: 'root',
    expanded: false,
    children: getChildrenNode(props.parentObject, 'root'),
    typeObject: props.parentObject['typeObject'] || props.parentObject['@type'],
    nodeData: props.parentObject,
  };
};

watch(
  () => props.parentObject,
  (newVal, oldVal) => {
    if (newVal) {
      handleShowTreeCard();
      updateDynamicComponent([dataTest.value]);
      updateNodeActions([dataTest.value]);
    }
  },
  { deep: true } 
);

const updateNodeActions = (nodes: any[]) => {
  nodes.forEach((node: any) => {
    if (node.children && node.children.length) {
      updateNodeActions(node.children);
    }
    if (node.actions?.length) {
      return;
    }
    // root node
    if (node.isRoot) {
      node.actions = getNodeActions(mapTreeNodeActions, null);
      if (!props.hasPermissionDelete) {
        node.actions = node.actions.filter((action: any) => action.key !== TreeNodeActionEnum.DELETE);
      }
      return;
    }
    // child node of root node
    if (node.parentKey === dataTest.value.key) {
      if (checkBPSNodes(node)) {
        return;
      }
      node.actions = getNodeActions(mapTreeChildNodeActions, node['@type']);
      return;
    }
    if (node['@type'] !== TypeEnum.BUNDLED_GROUP_PO) {
      if (checkBPSNodes(node)) {
        return;
      }
      node.actions = getNodeActions(mapTreeChildNodeActions, 'others');
      return;
    }
    node.actions = null;
  });
};

const checkBPSNodes = (node: any) => {
  const parentNode = findNodeByKey(dataTest.value, node.parentKey);
  if (node.typeObject === TypeEnum.PRODUCT_SPEC && parentNode && parentNode.typeObject === TypeEnum.BUNDLE_PO) {
    node.title = "bundle-ps";
    node.iconText = 'BPS';
    node.actions = null;
    return true;
  }
  return false;
};

const updateChildGroupNodeActions = (nodes: any) => {
  nodes.forEach((child: any) => {
    if (child.actions?.length) {
      return;
    }
    const parentNode = findNodeByKey(dataTest.value, child.parentKey);
    // parent node is child of root node
    if (parentNode && parentNode.parentKey === dataTest.value.key) {
      child.actions = getNodeActions(mapTreeChildNodeActions, 'BundledGroupProductOffering');
      return;
    }
    child.actions = null;
  });
}

const updateDynamicComponent = (nodes: any) => {
  nodes.forEach((node: any) => {
    const treeNodeObject = getTreeNodeObject(node);
    node.dynamicComponent = treeNodeObject.iconComponent;
    node.isIconFa = typeof treeNodeObject.iconComponent === 'string';
    node.title = treeNodeObject.key;
    node.iconText = treeNodeObject.iconText;
    checkBPSNodes(node);
    if (node.children) {
      updateDynamicComponent(node.children);
    }
  });
};

// Xử lý khi click bên ngoài dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeMenuActions([dataTest.value]);
  }
};

const handleClickOutsideChildGroup = (event: MouseEvent) => {
  if (dropdownGroupRef.value && !dropdownGroupRef.value.includes(event.target)) {
    closeMenuActions([dataTest.value]);
  }
};

const handleClickToggleButton = async (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('p-organizationchart-node-toggle-button') || target.classList.contains('expand-icon')) {
    await handleExpandIconClick(event);
    await nextTick();
    const nodeElement = getSiblingsByElement(event.target);
    if (!nodeElement) {
      return;
    }
    // lấy thông tin và update children của node hiện tại
    const currentNode = getCurrentNode([dataTest.value], nodeElement.id);
    if (!currentNode) {
      return;
    }
    currentNode.expanded = isExpandNode(currentNode);
    if (currentNode.expanded && !currentNode.isShow) {
      closeNodes([dataTest.value]);
      currentNode.isShow = true;
      await expandNode(currentNode);
      handleAfterExpandNode(currentNode);
    } else if (!currentNode.expanded && currentNode.isShow) {
      currentNode.isShow = false;
    }
    await nextTick();
    handleCollapse();
  }
};

const handleCollapse = () => {
  document.querySelectorAll('.p-organizationchart-node-children').forEach(el => {
    if (getComputedStyle(el).visibility === 'hidden') {
      (el as HTMLElement).style.display = 'none';
    } else {
      (el as HTMLElement).style.removeProperty('display');
    }
  });
}

const isExpandNode = (node: any) => {
  const elementCurNode = document.getElementById(node.key);
  if (elementCurNode && elementCurNode.parentElement) {
    // Lấy div cha
    const parent = elementCurNode.parentElement;

    const iconExpanNode = parent.querySelector(iconExpandClass) as HTMLElement;
    if (!iconExpanNode) {
      return false;
    }
    const iconExpands: any[] = Array.from(iconExpanNode.childNodes).filter((child: any) => child.nodeName === 'I');
    if (!iconExpands.length) {
      return false;
    }
    if (iconExpands[0].className.includes('pi-minus')) {
      return true;
    }
    if (iconExpands[0].className.includes('pi-plus')) {
      return false;
    }
  }
};


const changeStatusIconExpand = async (currentNode?: any) => {
  if (!currentNode) {
    const allIcons = document.querySelectorAll(iconExpandClass);
    allIcons.forEach((icon: any) => {
      const iconExpands: any[] = Array.from(icon.childNodes).filter((child: any) => child.nodeName === 'I');
      if (!iconExpands.length) {
        return;
      }
      // close parent node when drop parent or reload page
      if (iconExpands[0].className.includes('pi-minus')) {
        icon.click();
      }
      if (iconExpands[0].className.includes('pi-plus')) {
        icon.click();
      }
    });
  } else {
    const elementCurNode = document.getElementById(currentNode.key);
    if (elementCurNode && elementCurNode.parentElement) {
      // Lấy div cha
      const parent = elementCurNode.parentElement;

      const iconExpanNode = parent.querySelector(iconExpandClass) as HTMLElement;
      if (!iconExpanNode) {
        return;
      }
      const iconExpands: any[] = Array.from(iconExpanNode.childNodes).filter((child: any) => child.nodeName === 'I');
      if (!iconExpands.length) {
        return;
      }
      if (iconExpands[0].className.includes('pi-minus')) {
        iconExpanNode.click();
      }
      if (iconExpands[0].className.includes('pi-plus')) {
        iconExpanNode.click();
      }
    }
  }
};

const handleExpandIconClick = async (event: any) => {
  await nextTick();
  // lấy thông tin node hiện tại
  const nodeElement = getSiblingsByElement(event.target);
  if (!nodeElement) {
    return;
  }
  // lấy thông tin và update children của node hiện tại
  const currentNode = getCurrentNode([dataTest.value], nodeElement.id);
  selectedNode.value = currentNode;

  // expand node
  if (currentNode?.isShow) {
    await expandNode(currentNode);
    handleAfterExpandNode(currentNode);
  }
};

const handleAfterExpandNode = async (currentNode: any) => {
  // update dom, actions, dynamic component
  await nextTick();
  updateDOM();
  // close other child nodes if has children
  if (currentNode && currentNode.children?.length) {
    currentNode.children.forEach((child: any) => {
      if (child.children?.length) {
        closeOtherNodes([child]);
      }
    });
  }
  updateNodeActions([dataTest.value]);
  updateDynamicComponent([dataTest.value]);
};

const getSiblingsByElement = (event: any) => {
  const node = event.closest(".p-organizationchart-node");
  if (!node) {
    return null;
  }
  const siblings = node.parentElement.querySelectorAll(".drag-item");
  return siblings[0];
};

const getCurrentNode = (nodes: any, key: string): any => {
  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const foundNode = getCurrentNode(node.children, key);
      if (foundNode) {
        return foundNode;
      }
    }
  }
  return null;
};

const isValidDropNode = (node: any) => {
  let message = null;
  if (!isDropNode(node)) {
    message = 'prevent-drop';
  }
  if (existChildNodes(dataTest.value)) {
    message = 'exist-child-node';
  }
  if (message) {
    node.isShowButton = false;
    showAlertMessage('warn', 'summary-label', message);
    return false;
  }
  return true;
};

const dragOverHeader = (node: any) => {
  if (!node.isRoot) {
    return;
  }
  node.isShow = true;
  node.isDropHeader = !node.expanded;
};

const dropNode = async (event: any, node: any) => {
  if (node['@type'] === TypeEnum.BUNDLED_GROUP_PO) {
    if (!isValidDropNode(node)) {
      return;
    }
    node.isShowButton = false;
    onDropInGroup(event, node);
    return;
  }

  // only allow drop to root node
  if (!node.isRoot) {
    showAlertMessage('warn', 'summary-label', 'not-root-node');
    node.isShowButton = false;
    return;
  }

  // create group PO if have
  const itemDrop = store.nodeDragged as any;
  if (itemDrop && itemDrop.isNotCreatable) {
    if (!node.expanded) {
      showAlertMessage('warn', 'summary-label', 'open-root');
      node.isShowButton = false;
      node.isShow = node.expanded;
      return;
    }
    isShowModal.value = true;
    return;
  }

  // other validation
  if (!isValidDropNode(node)) {
    node.isShow = node.expanded;
    return;
  }
  node.isShowButton = false;

  if (node.isDropHeader && !node.expanded && node.children?.length) {
    node.isDropHeader = false;
    await onDropTree(event, node, true);
    await nextTick();
    node.isShow = false;
    onNodeClick(event, node, true);
    return;
  }

  node.isDropHeader = false;
  await onDropTree(event, node);
  await nextTick();
  closeNodeAfterDrop(node);
  // update dom, actions, dynamic component
  updateDOM();
  // close child node of dragged node
  const newNode = (store.nodeDragged as any);
  if (newNode && newNode.children?.length) {
    closeOtherNodes([newNode]);
  }
  updateNodeActions([dataTest.value]);
  updateDynamicComponent([dataTest.value]);
};

const closeNodeAfterDrop = (node: any) => {
  const allNodes = getAllNodes(dataTest.value.children);
  if (allNodes.some((item: any) => !item.isRoot && item.isShow)) {
    node.isShow = false;
  }
};

const getAllNodes = (nodes: any) => {
  let allNodes: any[] = [];
  nodes.forEach((node: any) => {
    allNodes.push(node);
    if (node.children) {
      allNodes = [...allNodes, ...getAllNodes(node.children)];
    }
  });
  return allNodes;
};

const closeOtherNodes = async (nodes?: any) => {
  nodes.forEach((node: any) => {
    const elementCurNode = document.getElementById(node.key);
    if (elementCurNode && elementCurNode.parentElement) {
      // Lấy div cha
      const parent = elementCurNode.parentElement;

      const iconExpanNode = parent.querySelector(iconExpandClass) as HTMLElement;
      if (!iconExpanNode) {
        return;
      }
      const iconExpands: any[] = Array.from(iconExpanNode.childNodes).filter((child: any) => child.nodeName === 'I');
      if (!iconExpands.length) {
        return;
      }
      if (iconExpands[0].className.includes('pi-minus')) {
        iconExpanNode.click();
      }
    }
  });
};

const existChildNodes = (node: any) => {
  const itemDrop = store.nodeDragged as any;
  if (!itemDrop) {
    return false;
  }
  if (node.id === itemDrop.id) {
    return true;
  }
  let allChildNodes: any[] = [];
  if (node.children) {
    allChildNodes.push(...node.children);
    node.children.forEach((child: any) => {
      allChildNodes = [...allChildNodes, ...child.groups ?? []];
    });
  }
  return allChildNodes.some((child: any) => child.id === itemDrop.id);
};

const isDropNode = (node: any) => {
  const itemDrop = store.nodeDragged as any;
  if (!itemDrop) {
    return false;
  }
  const configByType = getTreeNodeObject(node);
  const keyTypes = configByType.children.map((item: any) => Object.keys(item)[0]);
  const typeObject = itemDrop['typeObject'] || itemDrop['@type'];
  return keyTypes.includes(typeObject);
}

const updateDOM = () => {
  removeAfterElement();
  removeBeforeElement();
  const rows = document.querySelectorAll('.p-organizationchart-node-children');
  rows.forEach((row: any) => {
    if (!row.childNodes.length) {
      return;
    }
    const tdElements = Array.from(row.childNodes).filter((child: any) => child.nodeName === 'TD');
    if (tdElements.length > 0) {
      tdElements.forEach((td: any, index: number) => {
        if (index == tdElements.length - 1) {
          return;
        }
        createAfterElement(td);
      });
      createBeforeElement(tdElements);
    }
  });
};

const onNodeClick = (event: any, node: any, isDropHeader?: boolean) => {
  closeMenuActions([dataTest.value]);
  if (node.isShow) {
    return;
  }
  // close detail div của tất cả các node
  closeNodes([dataTest.value]);
  node.isShow = true;
  // open node => open all children of node
  if (isDropHeader || !node.expanded) {
    changeStatusIconExpand(node);
  }
};

const closeNodes = (nodes: any) => {
  nodes.forEach((node: any) => {
    node.isShow = false;
    if (node.children) {
      closeNodes(node.children);
    }
  })
};

const allowDrop = (event: any, node: any) => {
  if (!node.isRoot) {
    return;
  }
  if (!node.isShow) {
    node.isShow = true;
  }
  node.isShowButton = true;
};

const endDrag = (event: any, node: any) => {
  if (!node.isRoot) {
    return;
  }
  node.isShowButton = false;
  if (!node.expanded) {
    node.isShow = false;
  }
};

const createBeforeElement = (tdElements: any) => {
  const firstTd = tdElements[0] as any;
  firstTd.style.position = 'relative';
  const beforeElement = document.createElement('div');
  beforeElement.className = 'before-element';
  beforeElement.style.content = '""';
  beforeElement.style.position = 'absolute';
  beforeElement.style.top = '20px';
  beforeElement.style.height = '11px';
  beforeElement.style.width = '50px';
  beforeElement.style.left = '-40px';
  beforeElement.style.borderBottom = '1px solid #92929e';
  firstTd.appendChild(beforeElement);
};

const createAfterElement = (td: any) => {
  td.style.position = 'relative';
  const afterElement = document.createElement('div');
  afterElement.className = 'after-element';
  afterElement.style.content = '""';
  afterElement.style.position = 'absolute';
  afterElement.style.top = '25px';
  afterElement.style.height = '100%';
  afterElement.style.width = '1px';
  afterElement.style.left = '-14px';
  afterElement.style.borderLeft = '1px solid #92929e';
  td.appendChild(afterElement);
};

const removeBeforeElement = () => {
  const afterElements = document.querySelectorAll('.before-element');
  afterElements.forEach((element: any) => {
    element.parentElement.removeChild(element);
  });
};

const removeAfterElement = () => {
  const afterElements = document.querySelectorAll('.after-element');
  afterElements.forEach((element: any) => {
    element.parentElement.removeChild(element);
  });
};

const handleAction = async (key: any, node: any) => {
  await nextTick();
  node.isShowMore = false;
  switch (key) {
    case TreeNodeActionEnum.UNLINK:
    case TreeNodeActionEnum.DELETE: {
      confirmDeleteNode(node);
      break;
    }
    default:
      break;
  }
};

const handleShowMenu = (node: any) => {
  closeMenuActions([dataTest.value]);
  node.isShowMore = !node.isShowMore;
};

const closeMenuActions = (nodes: any[]) => {
  nodes.forEach((node: any) => {
    node.isShowMore = false;
    if (node.children) {
      closeMenuActions(node.children);
    }
    if (node.groups) {
      closeMenuActions(node.groups);
    }
  })
};

const expandNode = async (node: any) => {
  if (!node) {
    return;
  }
  if (node.hasChildrenData) {
    return;
  }
  if (node.children) {
    const responses = await Promise.all(node.children.map((elm: any) => getChildNodeInfoById(elm)));
    node.hasChildrenData = true;
    node.children.forEach((child: any) => {
      const response = responses.find((item: any) => item && item.id === child.id);
      if (response) {
        child['@type'] = response['@type'];
        child.description = response.description;
        child.code = response.code;
        child.parentKey = node.key;
        child.typeObject = response['typeObject'] || response['@type'];
        child.children = getChildrenNode(response, child.key);
        if (!child['@type'] || child['@type'] !== TypeEnum.BUNDLED_GROUP_PO) {
          child.nodeData = response;
        }
        handleConfigParams(child);
        updateConfigValue(child);
      } else {
        child.id = null;
      }
    });
    // Loại bỏ các node không có id
    node.children = node.children.filter((child: any) => child.id);
    node.children.forEach((childGrp: any) => {
      if (!childGrp['@type'] || childGrp['@type'] !== TypeEnum.BUNDLED_GROUP_PO) {
        return;
      }
      handleGroupNode(childGrp, childGrp.nodeData);
    });
  }
};

const handleGroupNode = (node: any, object: any) => {
  // lấy các key trong configByType
  const configByType = getTreeNodeObject(node);
  const propertyValues = configByType.children.map((item: any) => (Object.values(item)[0] as any).property);
  // Loại bỏ giá trị trùng lặp bằng Set
  const uniqueValues = [...new Set(propertyValues)];

  let groups: any[] = [];
  uniqueValues.forEach(((item: any) => {
    if (!object[item]) {
      return;
    }
    const filteredDatas = filterData(configByType.children, item, cloneDeep(object[item]));
    filteredDatas.forEach((elm: any) => {
      const childGroup = {
        key: generateUniqueId(),
        id: elm.id,
        '@type': elm['@type'],
        '@baseType': elm['@baseType'],
        href: elm.href,
        objectName: elm.name,
        version: elm.version,
        parentKey: node.key,
        isShow: false,
        typeObject: elm['@referredType'],
        canChangeData: true
      };
      handleConfigParams(childGroup);
      updateConfigValue(childGroup);
      groups.push(childGroup);
    })
  }));
  node.groups = groups;
  updateChildGroupNodeActions(node.groups);
  updateDynamicComponent(node.groups);
};

const handleConfigParams = (node: any) => {
  const configByType = getTreeNodeObject(node);
  if (configByType.manualConfigParams) {
    node.manualConfigParams = updateManualConfigParams(node, configByType.manualConfigParams);
  }
};

const createManualConfigParams = (node: any) => {
  const configByType = getTreeNodeObject(node);
  if (configByType.manualConfigParams) {
    node.manualConfigParams = configByType.manualConfigParams.map((item: any) => {
      const key = Object.keys(item)[0]; // for example: bundledProductOffering
      const propertyKeys = Object.keys(item[key].properties);
      return {
        label: item[key].label,
        properties: propertyKeys.map((pKey: any) => {
          const property = item[key].properties[pKey];
          return {
            ...property,
            label: property.label,
            value: null,
            typeValue: property.typeValue,
            key: pKey
          }
        })
      }
    })
  }
};

// only validate children of root node
const isValidConfigData = () => {
  return dataTest.value.children?.every((node: any) => {
    const isValidChildOfRoot = node.manualConfigParams?.every((config: any) => {
      if (config.properties.some((property: any) => property.isRequired && property.value === null)) {
        config.properties.forEach((elm: any) => {
          if (elm.isRequired && elm.value === null) {
            elm.errorMsg = [{
              msgKey: 'required'
            }];
          } else {
            elm.errorMsg = [];
          }
        });
      }
      return config.properties.every((elm: any) => {
        return !elm.errorMsg?.length;
      });
    });
    const isValidChildOfGroup = node['@type'] !== TypeEnum.BUNDLED_GROUP_PO ||
      !node.groups || node.groups.every((child: any) => {
        return child.manualConfigParams?.every((config: any) => {
          return config.properties.every((elm: any) => {
            return !elm.errorMsg?.length;
          });
        });
      });
    return isValidChildOfRoot && isValidChildOfGroup;
  });
};

const validateConfigValue = (node: any, properties: any, elmSelected: any, event: any) => {
  if (elmSelected.isRequired && event.value === null) {
    elmSelected.errorMsg = [{
      msgKey: 'required'
    }];
    return;
  }
  elmSelected.errorMsg = [];
  properties.forEach((elm: any) => {
    if (elmSelected.key === elm.key) {
      elm.value = event.value;
    }
    if (elm.isRequired && elm.value === null) {
      return;
    }
    elm.errorMsg = [];
  });
  // update value
  updateConfigValue(node);
  properties.forEach((elm: any) => {
    if (elmSelected.key === elm.key) {
      handleValidateConfigValue(node, elm);
    }
  });
};

const handleValidateConfigValue = (node: any, elm: any) => {
  const configByType = getTreeNodeObject(node);
  if (!elm.validate.length) {
    return;
  }
  configByType.manualConfigParams.forEach((item: any) => {
    const key = Object.keys(item)[0]; // for example: bundledProductOffering
    const attribute = item[key].attribute; // for example: bundledProductOfferingOption
    const nodeValue = node[attribute];
    elm.validate.forEach((elementV: any) => {
      if (!nodeValue[elm.key] || !nodeValue[elementV.with]) {
        return;
      }
      switch (elementV.operator) {
        case 'lte':
          if (elm['value'] > nodeValue[elementV.with]) {
            elm.errorMsg.push({
              msgKey: 'invalid-lte',
              param1: elm.acronym,
              param2: elementV.acronym
            });
          }
          break;
        case 'gte':
          if (elm['value'] < nodeValue[elementV.with]) {
            elm.errorMsg.push({
              msgKey: 'invalid-gte',
              param1: elm.acronym,
              param2: elementV.acronym
            });
          }
          break;
        default:
          elm.errorMsg = [];
          break;
      }
    });
  });
};

const updateConfigValue = (node: any) => {
  if (!node.manualConfigParams) {
    return;
  }
  const configByType = getTreeNodeObject(node);
  if (configByType.manualConfigParams) {
    configByType.manualConfigParams.map((item: any) => {
      const key = Object.keys(item)[0]; // for example: bundledProductOffering
      const attribute = item[key].attribute; // for example: bundledProductOfferingOption
      const result = node.manualConfigParams.map((element: any) => {
        let object = {};
        element.properties.forEach((elm: any) => {
          object = { ...object, [elm.key]: elm.value }
        });
        return object;
      })
      node[attribute] = result.reduce((acc: any, obj: any) => {
        return { ...acc, ...obj }; // Gộp object vào acc
      }, {});
    })
  }
};

const updateManualConfigParams = (node: any, manualConfigParams: any[]) => {
  const parentNode = findNodeByKey(dataTest.value, node.parentKey);
  const isChildOfRootNode = node.canChangeData || parentNode && parentNode.isRoot;
  return manualConfigParams.map((item: any) => {
    const key = Object.keys(item)[0]; // for example: bundledProductOffering
    const attribute = item[key].attribute; // for example: bundledProductOfferingOption
    const nodeDatasByKey = parentNode.nodeData[key];
    if (!nodeDatasByKey || !nodeDatasByKey.length) {
      return null;
    }
    const propertyKeys = Object.keys(item[key].properties);
    const properties = propertyKeys.map(pKey => {
      const property = item[key].properties[pKey];
      const data = nodeDatasByKey.find((elm: any) => elm.id === node.id);
      if (!data) {
        return {
          ...property,
          label: property.label,
          value: null,
          typeValue: property.typeValue,
          key: pKey,
          isDisabled: !isChildOfRootNode,
        };
      }
      return {
        ...property,
        label: property.label,
        value: data[attribute] ? data[attribute][pKey] : null,
        typeValue: property.typeValue,
        key: pKey,
        isDisabled: !isChildOfRootNode,
      };
    });
    const result = properties.filter((item: any) => item);
    if (!result.length) {
      return null;
    }
    return {
      label: item[key].label,
      properties: result
    }
  }).filter((item: any) => item);
};


const getChildNodeInfoById = async (item: any) => {
  try {
    let response = null;
    switch (item['@type']) {
      case TypeEnum.RESOURCE_SPEC:
      case TypeEnum.RESOURCE_SPEC_REF:
        response = await getResourceSpecById(item.id);
        break;
      case TypeEnum.SERVICE_SPEC:
      case TypeEnum.SERVICE_SPEC_REF:
      case TypeEnum.SERVICE_SPEC_RELATIONSHIP:
        response = await getServiceSpecById(item.id);
        break;
      case TypeEnum.CATE:
      case TypeEnum.CATE_REF:
        response = await getCategoryById(item.id);
        break;
      case TypeEnum.PRODUCT_SPEC:
      case TypeEnum.PRODUCT_SPEC_REF:
        response = await getProductSpecById(item.id);
        break;
      case TypeEnum.PRODUCT_OFFERING:
      case TypeEnum.BUNDLED_PO:
        response = await getProductOfferingById(item.id);
        if (response.status === StatusCodeEnum.SUCCESS) {
          return {
            ...response.data,
            typeObject: response.data.isBundle ? TypeEnum.BUNDLE_PO : TypeEnum.SIMPLE_PO
          };
        }
        break;
      case TypeEnum.BUNDLED_GROUP_PO:
        return { ...item, typeObject: TypeEnum.BUNDLED_GROUP_PO };
      default:
        break;
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

const getChildrenNode = (object: any, parentKey: any) => {
  let children: any[] = [];
  const configByType = getTreeNodeObject(object);
  if (!configByType.children?.length) {
    return children;
  }
  const propertyValues = configByType.children.map((item: any) => (Object.values(item)[0] as any).property);

  // Loại bỏ giá trị trùng lặp bằng Set
  const uniqueValues = [...new Set(propertyValues)];

  uniqueValues.forEach((item: any) => {
    if (!object[item]) {
      return;
    }
    const filteredDatas = filterData(configByType.children, item, cloneDeep(object[item]));
    filteredDatas.forEach((elm: any) => {
      const uniqueKey = generateUniqueId();
      children.push({
        key: uniqueKey,
        id: elm.id,
        '@type': elm['@type'],
        '@baseType': elm['@baseType'],
        href: elm.href,
        objectName: elm.name,
        description: elm.description,
        code: elm.code,
        version: elm.version,
        parentKey: parentKey,
        isShow: false,
        children: getChildrenNode(elm, uniqueKey),
        typeObject: elm['typeObject'] || elm['@type'],
        nodeData: elm,
      })
    })
  });
  return children;
}

const filterData = (childrenConfig: any[], item: any, data: any) => {
  if (typeof data === 'object' && !Array.isArray(data)) {
    data = [data];
  }
  // case no children config
  if (!childrenConfig.length) {
    return data;
  }
  let results = data;
  childrenConfig.filter(cg => (Object.values(cg)[0] as any).filters).forEach((config: any) => {
    const value = Object.values(config)[0] as any;
    // filters by property
    if (value.property !== item) {
      results = data;
      return;
    }
    // filter data by filters config
    results = data.filter((elm: any) => value.filters.every((filter: any) => elm[filter.key] === filter.value));
  });
  return results;
};

const generateUniqueId = () => {
  return `key-${uuidv4()}`;
};

const onDropTree = async (evt: DragEvent, targetNode: any, isDropHeader?: boolean) => {
  evt.preventDefault();
  const itemDrop = store.nodeDragged as any;
  if (!itemDrop) {
    return;
  }
  if (!Object.keys(dataTest).length) {
    return;
  }
  // Thêm node vào `children` của node mục tiêu
  if (!targetNode.children) {
    targetNode.children = [];
  }
  // kéo thả các node trong cây
  if (store.isChildNode) {
    // remove node from current parent node
    const parentNode = findNodeByKey(dataTest.value, itemDrop.parentKey);
    if (parentNode) {
      parentNode.children = parentNode.children.filter((child: any) => child.id !== itemDrop.id);
    }
    // cập nhật target node
    itemDrop.parentKey = targetNode.key;
    targetNode.children.push(itemDrop);
    return;
  }
  // kéo thả từ danh sách bên trái
  let newNode = {
    key: generateUniqueId(),
    id: itemDrop.id,
    '@type': itemDrop['@type'],
    '@baseType': itemDrop['@baseType'],
    href: itemDrop.href,
    objectName: itemDrop.name,
    description: itemDrop.description,
    code: itemDrop.code,
    version: itemDrop.version,
    parentKey: targetNode.key,
    isShow: false,
    children: [] as any[],
    characteristics: [],
    typeObject: itemDrop['typeObject'] || itemDrop['@type']
  } as TreeCard

  createManualConfigParams(newNode);

  // validate if target node is not root node (Category)
  if (targetNode["@baseType"] === TypeEnum.CATE || targetNode["@type"] === TypeEnum.CATE) {
    const parentObj = await getCategoryById(targetNode.id);
    if (parentObj.data.isRoot === false) {
      showAlertMessage('error', 'summary-label', 'not-root-node');
      return;
    }
  }

  const childObj = await getChildNodeInfo(itemDrop);
  if (!childObj) {
    showAlertMessage('error', 'summary-label', 'not-exist-node');
    return;
  }
  if (typeof childObj === 'string') {
    return;
  }
  newNode.children = getChildrenNode(childObj, newNode.key);
  newNode.characteristics = childObj.characteristics ? childObj.characteristics : [];
  newNode.nodeData = childObj;

  // nếu node mục tiêu không có children thì mở rộng node mục tiêu
  if (!targetNode.children.length) {
    targetNode.expanded = true;
  }
  targetNode.children.push(newNode);
  (store.nodeDragged as any) = newNode;
  emit("extendCharacteristicData", newNode.characteristics);

  if (isDropHeader) {
    newNode['@type'] = childObj['@baseType'];
  } else {
    targetNode.hasChildrenData = true;
  }
};

const onDropInGroup = async (evt: DragEvent, targetNode: any) => {
  evt.preventDefault();
  const itemDrop = store.nodeDragged as any;
  if (!itemDrop) {
    return;
  }
  // Thêm node vào `children` của node mục tiêu
  if (!targetNode.groups) {
    targetNode.groups = [];
  }
  // kéo thả từ danh sách bên trái
  let newNode = {
    key: generateUniqueId(),
    id: itemDrop.id,
    '@type': itemDrop['@type'],
    '@baseType': itemDrop['@baseType'],
    href: itemDrop.href,
    objectName: itemDrop.name,
    version: itemDrop.version,
    isShow: false,
    parentKey: targetNode.key,
    typeObject: itemDrop['typeObject'] || itemDrop['@type']
  } as TreeCard
  createManualConfigParams(newNode);
  targetNode.groups.push(newNode);
  updateChildGroupNodeActions(targetNode.groups);
  updateDynamicComponent(targetNode.groups);
};

const getChildNodeInfo = async (itemDrop: any) => {
  switch (itemDrop["@baseType"]) {
    case TypeEnum.SERVICE_SPEC:
      const respSS = await getServiceSpecById(itemDrop.id)
      if (respSS.status === StatusCodeEnum.SUCCESS) {
        return { ...respSS.data, characteristics: respSS.data.specCharacteristic };
      }
    case TypeEnum.RESOURCE_SPEC:
      const respRS = await getResourceSpecById(itemDrop.id);
      if (respRS.status === StatusCodeEnum.SUCCESS) {
        return { ...respRS.data, characteristics: respRS.data.resourceSpecCharacteristic };
      }
    case TypeEnum.CATE:
      const respCategory = await getCategoryById(itemDrop.id);
      if (respCategory.status === StatusCodeEnum.SUCCESS) {
        if (respCategory.data.isRoot === true) {
          showAlertMessage('error', 'summary-label', 'cannot-drop-root-node');
          return 'error';
        } else if (respCategory.data.isRoot === false && respCategory.data.parent) {
          showAlertMessage('error', 'summary-label', 'exist-parent-node');
          return 'error';
        } else {
          return { ...respCategory.data, subCategory: respCategory.data.subCategory };
        }
      }
    case TypeEnum.PRODUCT_OFFERING:
      const respPO = await getProductOfferingById(itemDrop.id);
      if (respPO.status === StatusCodeEnum.SUCCESS) {
        return {
          ...respPO.data,
          typeObject: respPO.data.isBundle ? TypeEnum.BUNDLE_PO : TypeEnum.SIMPLE_PO,
          characteristics: respPO.data.productOfferingCharacteristic,
          nodeData: respPO.data,
        };
      }
    default:
      return null;
  }
}

const findNodeByKey = (node: any, nodeKey: string) => {
  if (node.key === nodeKey) {
    return node;
  }
  if (node.children) {
    for (const child of node.children) {
      const result: any = findNodeByKey(child, nodeKey);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

const confirmDeleteNode = async (node: any) => {
  if (!node.id) {
    return;
  }
  if (!node.isRoot) {
    // remove node from current parent node
    const parentNode = findNodeByKey(dataTest.value, node.parentKey);
    if (parentNode.children) {
      parentNode.children = parentNode.children.filter((child: any) => child.id !== node.id);
    }
    if (parentNode.groups) {
      parentNode.groups = parentNode.groups.filter((child: any) => child.id !== node.id);
    }
    await nextTick();
    updateDOM();
    return;
  }
  isShowConfirmDialog.value = true;
  await nextTick();
  updateDOM();
};

const saveTreeData = async () => {
  if (!dataTest.value) {
    return;
  }
  if (!isValidConfigData()) {
    return;
  }
  const childrens = getDataChildrenNodes(dataTest.value);
  if (!childrens) {
    return;
  }
  const payload = {
    '@type': dataTest.value['@type'],
    ...childrens
  }
  emit('saveTreeData', payload);
};

const convertDataChildGroup = (child: any) => {
  const configByType = getTreeNodeObject(child);
  let results: any[] = [];
  const keyMap: { [key: string]: string } = {
    name: "objectName",  // Map "name" -> "objectName"
  };
  child.groups.forEach((element: any) => {
    const config = configByType.children.find((item: any) => Object.keys(item)[0] === element['typeObject']);
    if (config) {
      const key = Object.keys(config)[0];
      results.push({
        [config[key].property]: mappedObject(config[key].params, element, keyMap)
      });
    }
  });
  return results.reduce((acc, curr) => {
    const property = Object.keys(curr)[0];
    if (!acc[property]) {
      acc[property] = [];
    }
    acc[property].push(curr[property]);
    return acc;
  }, {});
}

const getDataChildrenNodes = (node: any) => {
  const childrens: any[] = [];
  const configByType = getTreeNodeObject(node);
  if (!node.children?.length) {
    handleDataBeforeMerged(configByType, childrens);
    return mergedData(childrens);
  }
  const keyMap: { [key: string]: string } = {
    name: "objectName",  // Map "name" -> "objectName"
    '@referredType': "typeObject",     // Map "@referredType" -> "@type"
  };
  node.children.forEach((element: any) => {
    if (element.groups?.length) {
      element = { ...element, ...convertDataChildGroup(element) };
    }
    const config = configByType.children.find((item: any) => Object.keys(item)[0] === element['typeObject']);
    if (config) {
      const key = Object.keys(config)[0];
      if (config[key].hasNotChange) {
        return;
      }
      childrens.push({
        [config[key].property]: mappedObject(config[key].params, element, keyMap)
      });
    }
  });
  handleDataBeforeMerged(configByType, childrens);
  return mergedData(childrens);
};

const handleDataBeforeMerged = (configByType: any, childrens: any[]) => {
  const properties = configByType.children.map((item: any) => {
    const key = Object.keys(item)[0];
    if (item[key].hasNotChange) {
      return null;
    }
    return item[key].property;
  }).filter((item: any) => item);
  [...new Set(properties)].forEach(property => {
    if (!childrens.some(child => child.hasOwnProperty(property))) {
      childrens.push({
        [property as string]: null
      });
    }
  });
};

const showAlertMessage = (severity: any, summary: any, warningMessage: any, group?: any) => {
  // toast.add({
  //   group: group,
  //   severity: severity,
  //   summary: t(`error-msg.${summary}`),
  //   detail: t(`error-msg.${warningMessage}`),
  //   life: 3000,
  // });
  // if (!group) {
  //   toast.removeGroup(group);
  // }
};

const getTreeNodeObject = (object: any) => {
  const type = typeof object === 'string' ? object : object['typeObject'] || object['@type'];
  return mapTreeObjects[type as keyof typeof mapTreeObjects] ?? {};
}

const saveNewBundledGroupPO = async (newObject: any) => {
  // create payload
  const uuid = uuidv4();
  const payload = {
    '@type': dataTest.value['@type'],
    bundledGroupProductOffering: [
      {
        '@type': TypeEnum.BUNDLED_GROUP_PO,
        '@baseType': TypeEnum.BUNDLED_GROUP_PO,
        '@schemaLocation': SchemaLocationEnum.BUNDLED_GROUP_PO,
        id: uuid,
        name: newObject.name,
        description: newObject.description
      }
    ]
  }
  // call API to save data
  try {
    const response = await updatePO(dataTest.value.id, trimValues(payload));
    if (response.status !== StatusCodeEnum.SUCCESS) {
      if (response.status === StatusCodeEnum.BAD_REQUEST) {
        return
      }
      return;
    }
    isShowModal.value = false;
    generateGroupNode(response.data, uuid);
  } catch (error) {
    console.error("Failed to create data", error);
  }
};

const generateGroupNode = async (data: any, uuid: string) => {
  const bundledGroupPO = data.bundledGroupProductOffering.find((item: any) => item.id === uuid) ?? null;
  if (!bundledGroupPO) {
    return;
  }
  let groupNode = {
    key: generateUniqueId(),
    id: bundledGroupPO.id,
    '@type': bundledGroupPO['@type'],
    '@baseType': bundledGroupPO['@baseType'],
    href: bundledGroupPO.href,
    objectName: bundledGroupPO.name,
    description: bundledGroupPO.description,
    parentKey: dataTest.value.key,
    isShow: false,
    children: [] as any[],
    typeObject: bundledGroupPO['@type']
  } as TreeCard

  createManualConfigParams(groupNode);
  if (!dataTest.value.children) {
    dataTest.value.children = [];
  }
  dataTest.value.children.push(groupNode);
  // update dom, actions, dynamic component
  await nextTick();
  updateDOM();
  updateNodeActions([groupNode]);
  updateDynamicComponent([groupNode]);
  onNodeClick(null, groupNode);
  if ((groupNode as any).manualConfigParams?.length) {
    (groupNode as any).manualConfigParams.forEach((config: any) => {
      config.properties.forEach((elm: any) => {
        if (elm.isRequired && elm.value === null) {
          elm.errorMsg = [{
            msgKey: 'required'
          }];
          return;
        }
      });
    });
  }
}

const showChildGroupNode = (node: any) => {
  node.isShow = !node.isShow;
};
</script>

<style scoped lang="scss">
.chart-container {
  display: flex;
  position: relative;

  .container {
    // padding: 8px;
    padding: 4px 8px;
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    color: #fff;

    &.node-box {
      position: relative;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: max-content;
      background: #ff617d;
      cursor: pointer;

      .fa-ellipsis-v {
        padding: 5px 10px;
        font-size: 16px;
      }

      .fa-lock {
        padding: 5px 7px;
        font-size: 16px;
      }

      .dropdown-menu {
        position: absolute;
        top: 20px;
        left: 10px;
        float: left;
        min-width: 10rem;
        padding: .5rem 0;
        margin: .125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: .25rem;
        z-index: 1;
      }

      .dropdown-item {
        display: block;
        width: 100%;
        padding: .25rem 1.5rem;
        clear: both;
        font-weight: 400;
        color: #212529;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;

        &:hover {
          color: #16181b;
          text-decoration: none;
          background-color: #e9ecef;
        }

        &:active {
          color: #fff;
          text-decoration: none;
          background-color: #007bff;
        }
      }

      .header-icon {
        background-color: rgba(255, 255, 255, 0.2);
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 2px 0 2px;
        white-space: nowrap;
        width: fit-content;
        min-width: 25px;
        height: 24px;
        border-top-right-radius: 6px;
        border-bottom-left-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .title {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1rem;
        margin-right: 16px;
      }
    }

    &.child-group-box {
      position: relative;
      height: max-content;
      cursor: pointer;
      color: #000 !important;
      border: solid 1px #ccc;
      margin: 10px 5px;
      width: 95% !important;
      padding: 0 !important;
      border-radius: 20px;

      .fa-ellipsis-v {
        padding: 5px 10px;
        font-size: 16px;
      }

      .dropdown-menu {
        position: absolute;
        top: 20px;
        left: 10px;
        float: left;
        min-width: 10rem;
        padding: .5rem 0;
        margin: .125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: .25rem;
        z-index: 1;
      }

      .dropdown-item {
        display: block;
        width: 100%;
        padding: .25rem 1.5rem;
        clear: both;
        font-weight: 400;
        color: #212529;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;

        &:hover {
          color: #16181b;
          text-decoration: none;
          background-color: #e9ecef;
        }

        &:active {
          color: #fff;
          text-decoration: none;
          background-color: #007bff;
        }
      }

      .header {
        height: 40px;
        display: flex;
        border-radius: 20px;

        &.active {
          background: #ff617d;
          border-bottom-right-radius: unset;
          border-bottom-left-radius: unset;
        }
      }

      .title {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 1rem;
        margin-right: 25px;
      }
    }

    &.detail {
      background-color: #fff;
      flex-direction: column;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border: solid 1px #ff617d;
    }

    .config-lbl {
      font-size: 13px;
      color: #000;
    }

    .config-title {
      margin-left: 10px;
      margin-top: 5px;
      font-weight: bold !important;
    }
  }

  .expand-icon {
    font-size: 10px !important;
    color: #fff;
  }
}

.tree-action {
  position: absolute;
  right: 10px;
  top: 10px;
}

.btn-action {
  color: #fff;
  background: #000;
  margin-left: 10px;
  padding: 0.4rem 0.7rem;
}

:deep(.p-organizationchart-node) {
  background-color: unset;
  border: unset;
  width: max-content;
  margin-left: -25px;
  position: relative;
}

:deep(.p-organizationchart-node-toggle-button) {
  background: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 19px;
  inset-block-end: 25px;
  margin-inline-start: 139px;
  pointer-events: auto !important;
  opacity: 1 !important;
}

:deep(.p-organizationchart-node-toggle-button:hover) {
  background: #666;
}

:deep(.p-organizationchart-list .p-organizationchart-node-content) {
  background-color: #f0f8ff;
  /* Màu nền xanh nhạt */
  border-radius: 8px;
}

:deep(.p-organizationchart-node-children) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 14px;
}

:deep(.p-organizationchart-table > tbody) {
  display: flex;
}

:deep(.p-organizationchart-connectors) {
  display: none;
}

:deep(.p-organizationchart-connectors:nth-child(2)) {
  display: none;
}

:deep(.p-organizationchart-node-children .p-organizationchart-table > tbody > tr.p-organizationchart-node-children:nth-child(2n + 1)) {
  position: absolute;
  right: 18%;
}

:deep(.p-organizationchart-node-children .p-organizationchart-node::before) {
  content: "";
  position: absolute;
  top: 20px;
  left: -10px;
  width: 25px;
  height: 11px;
  border-bottom: 1px solid #92929e;
  border-left: 1px solid #92929e;
  border-bottom-left-radius: 10px;
}

// Style cho node con
:deep(.p-organizationchart-node-children .node-box) {
  border-top: 3px solid !important;
  color: #000 !important;
  border-radius: 0 !important;
  box-shadow: 0px 3px 5px rgba(40, 39, 55, 0.1) !important;
  background: #fff !important;
}

:deep(.p-organizationchart-node-children .node-box .header-icon) {
  border-radius: 0 !important;
  border-bottom-left-radius: 5px !important;
}

:deep(.p-organizationchart-node-children .node-box .header-icon svg) {
  padding-bottom: 2px;
}

:deep(.p-organizationchart-node-children .detail) {
  border: 1px solid #E1E8F3 !important;
  box-shadow: 0px 3px 5px rgba(40, 39, 55, 0.1) !important;
  width: 252px !important;
  margin-left: -1px !important;
}

:deep(.p-organizationchart-node-children .detail span) {
  font-weight: 400 !important;
}

@media (max-width: 768px) {
  :deep(.p-organizationchart-node-toggle-button) {
    position: unset !important;
  }
}

:deep(.p-inputnumber-input) {
  flex: none !important;
  width: 95% !important;
  height: 35px !important;
}

:deep(#root) {
  width: unset !important;
  height: unset !important;
  margin: unset !important;
  padding: unset !important;
}
</style>