import { DEFAULT_ACTIONS_LIST, ENUMERATED_STATUSES_FILTER, LIFECYCLE_STATUSES_FILTER } from './constant';
import { SortOrderEnum, TypeEnum, ValueTypeEnum, KeyEnum, TreeNodeActionEnum } from './enum';

export const mapObjects = {
  ResourceSpecification: [
    {
      label: "Resource Specification",
      key: KeyEnum.RESOURCE_SPEC_KEY,
      type: "ResourceSpecification",
    },
    {
      label: "Template Resource Specification",
      key: KeyEnum.TEMPLATE_RESOURCE_SPEC_KEY,
    },
  ],
  CustomerFacingService: [
    {
      label: "Customer Facing Service Specification",
      key: KeyEnum.CFS_SPEC_KEY,
      type: "CustomerFacingService",
    },
    {
      label: "Resource Facing Service Specification",
      key: KeyEnum.RFS_SPEC_KEY,
      type: "ResourceFacingService",
    },
  ],
  ResourceFacingService: [
    {
      label: "Resource Facing Service Specification",
      key: KeyEnum.RFS_SPEC_KEY,
      type: "ResourceFacingService",
    },
    {
      label: "Resource Specification",
      key: KeyEnum.RESOURCE_SPEC_KEY,
      type: "ResourceSpecification",
      funcPath: "/resourceSpecification",
    },
  ],
  Category: [{ label: "Category", key: KeyEnum.CATE_KEY, type: "Category" }],
  ProductSpecification: [
    {
      label: "Product Specification",
      key: KeyEnum.PRODUCT_SPEC_KEY,
      type: "ProductSpecification",
    },
    {
      label: "Resource Specification",
      key: KeyEnum.RESOURCE_SPEC_KEY,
      type: "ResourceSpecification",
      funcPath: "/resourceSpecification",
    },
    {
      label: "Customer Facing Service Specification",
      key: KeyEnum.CFS_SPEC_KEY,
      type: "CustomerFacingService",
      funcPath: "/serviceSpecification",
    },
  ],
  SimpleProductOffering: [
    {
      label: "Simple Product Offering",
      key: KeyEnum.SIMPLE_PO_KEY,
      type: "ProductOffering",
    },
  ],
  BundleProductOffering: [
    {
      label: "Bundle Product Offering",
      key: KeyEnum.BUNDLE_PO_KEY,
      type: "BundleProductOffering",
    },
    {
      label: "Simple Product Offering",
      key: KeyEnum.SIMPLE_PO_KEY,
      type: "SimpleProductOffering",
    },
  ],
  ProductOfferingPrice: [
    {
      label: "Product Offering Price",
      key: KeyEnum.PO_PRICE_KEY,
      type: "ProductOfferingPrice",
    },
  ],
  Promotion: [
    {
      label: "Promotion",
      key: KeyEnum.PROMOTION_KEY,
      type: TypeEnum.PROMOTION,
    },
    {
      label: "Product Offering",
      key: KeyEnum.PRODUCT_OFFERING_KEY,
      type: TypeEnum.PO,
    },
    {
      label: "Product Specification",
      key: KeyEnum.PRODUCT_SPEC_KEY,
      type: TypeEnum.PRODUCT_SPEC,
    },
    {
      label: "Product Category",
      key: KeyEnum.PRODUCT_CATEGORY_KEY,
      type: TypeEnum.PRODUCT_CATEGORY,
    },
    {
      label: "Channel",
      key: KeyEnum.CHANNEL_KEY,
      type: TypeEnum.CHANNEL,
    },
    {
      label: "Place",
      key: KeyEnum.PLACE_KEY,
      type: TypeEnum.PLACE,
    },
    {
      label: "Individual",
      key: KeyEnum.INDIVIDUAL_KEY,
      type: TypeEnum.INDIVIDUAL,
    },
    {
      label: "Organization",
      key: KeyEnum.ORGANIZATION_KEY,
      type: TypeEnum.ORGANIZATION,
    },
    {
      label: "Customer Facing Service Specification",
      key: KeyEnum.CFS_SPEC_KEY,
      type: TypeEnum.CFS_SPEC,
    },
    {
      label: "Resource Facing Service Specification",
      key: KeyEnum.RFS_SPEC_KEY,
      type: TypeEnum.RFS_SPEC,
    },
    {
      label: "Resource Specification",
      key: KeyEnum.RESOURCE_SPEC_KEY,
      type: TypeEnum.RESOURCE_SPEC,
    },
  ],
  default: [],
};

export const mapAttributes = {
  [TypeEnum.MY_TASK]: [
    { label: 'Create Date', value: 'id', key: 'createDate' },
    { label: 'Due Date', value: 'dueDate', key: 'dueDate' },
    { label: 'Priority', value: 'priority', key: 'priority' }
  ],
  [TypeEnum.ASSIGN_TASK]: [
    { label: 'Create Date', value: 'id', key: 'createDate' },
    { label: 'Due Date', value: 'dueDate', key: 'dueDate' },
    { label: 'Priority', value: 'priority', key: 'priority' }
  ],
  list: [
    { label: 'Create Date', value: 'id', key: 'createDate' },
    { label: 'Name', value: 'name', key: 'name' },
    { label: 'Code', value: 'code', key: 'code' }
  ],
  default: [
    { label: "Create Date", value: "id", key: "createDate" },
    { label: "Name", value: "name", key: "name" },
  ],
};

export const mapNodeActions = {
  default: [{ label: 'Delete', key: 'delete', iconClass: 'pi pi-trash' }]
};

export const mapOperators = {
  description: [
    { label: 'like', key: 'like', zIndex: 1 },
    { label: '=', key: '=', zIndex: 2 }
  ],
  name: [
    { label: "like", key: "like", zIndex: 1 },
    { label: "=", key: "=", zIndex: 2 },
  ],
  "relatedProject.name": [
    { label: "like", key: "like", zIndex: 1 },
    { label: "=", key: "=", zIndex: 2 },
  ],
  default: [{ label: "=", key: "=", zIndex: 1 }],
};

export const mapParamOptionsForList = {
  default: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
    {
      label: "Trạng thái vòng đời",
      key: "lifecycleStatus",
      valueType: ValueTypeEnum.PICK_LIST,
      valueOptions: LIFECYCLE_STATUSES_FILTER,
      hasI18n: true,
    },
  ],
  PickList: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
  ],
  PropertySpecification: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
  ],
  MyTask: [
    { label: "Name", key: "name", valueType: ValueTypeEnum.TEXT },
    {
      label: "Product Design",
      key: "relatedProject.name",
      valueType: ValueTypeEnum.TEXT,
    },
    {
      label: "Status",
      key: "status",
      valueType: ValueTypeEnum.PICK_LIST,
      optionValue: "value",
      valueOptions: [
        {
          label: "All",
          value: "ALL",
          key: "ALL",
        },
        {
          label: "open",
          value: "OPEN",
          key: "OPEN",
        },
        {
          label: "pending",
          value: "PENDING",
          key: "PENDING",
        },
        {
          label: "rejected",
          value: "REJECTED",
          key: "REJECTED",
        },
        {
          label: "completed",
          value: "COMPLETED",
          key: "COMPLETED",
        },
        {
          label: "in-progress",
          value: "IN_PROGRESS",
          key: "IN_PROGRESS",
        },
      ],
      hasI18n: true,
    },
    {
      label: "Priority",
      key: "priority",
      valueType: ValueTypeEnum.PICK_LIST,
      optionValue: "value",
      valueOptions: [
        {
          label: "All",
          value: "ALL",
          key: "ALL",
        },
        {
          label: "high",
          value: "High",
          key: "HIGH",
        },
        {
          label: "medium",
          value: "Medium",
          key: "MEDIUM",
        },
        {
          label: "low",
          value: "Low",
          key: "LOW",
        },
      ],
      hasI18n: true,
    },
    {
      label: "Due Date",
      key: "dueDate",
      valueType: ValueTypeEnum.RANGE_DATETIME,
    },
  ],
  AssignTask: [
    { label: "Name", key: "name", valueType: ValueTypeEnum.TEXT },
    {
      label: "Product Design",
      key: "relatedProject.name",
      valueType: ValueTypeEnum.TEXT,
    },
    {
      label: "Status",
      key: "status",
      valueType: ValueTypeEnum.PICK_LIST,
      optionValue: "value",
      valueOptions: [
        {
          label: "All",
          value: "ALL",
          key: "ALL",
        },
        {
          label: "open",
          value: "OPEN",
          key: "OPEN",
        },
        {
          label: "pending",
          value: "PENDING",
          key: "PENDING",
        },
        {
          label: "rejected",
          value: "REJECTED",
          key: "REJECTED",
        },
        {
          label: "completed",
          value: "COMPLETED",
          key: "COMPLETED",
        },
        {
          label: "in-progress",
          value: "IN_PROGRESS",
          key: "IN_PROGRESS",
        },
        {
          label: "unassigned",
          value: "UNASSIGNED",
          key: "UNASSIGNED",
        },
      ],
      hasI18n: true,
    },
    {
      label: "Priority",
      key: "priority",
      valueType: ValueTypeEnum.PICK_LIST,
      optionValue: "value",
      valueOptions: [
        {
          label: "All",
          value: "ALL",
          key: "ALL",
        },
        {
          label: "high",
          value: "High",
          key: "HIGH",
        },
        {
          label: "medium",
          value: "Medium",
          key: "MEDIUM",
        },
        {
          label: "low",
          value: "Low",
          key: "LOW",
        },
      ],
      hasI18n: true,
    },
    {
      label: "Due Date",
      key: "dueDate",
      valueType: ValueTypeEnum.RANGE_DATETIME,
    },
  ],
  PolicyAction: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
  ],
  PolicyCondition: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
  ],
  PolicyEvent: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
  ],
  PolicyRule: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
    {
      label: "Trạng thái vòng đời",
      key: "state",
      valueType: ValueTypeEnum.PICK_LIST,
      valueOptions: LIFECYCLE_STATUSES_FILTER,
      hasI18n: true,
    },
  ],
  ProposalGroup: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    {
      label: "Trạng thái vòng đời",
      key: "state",
      valueType: ValueTypeEnum.PICK_LIST,
      valueOptions: LIFECYCLE_STATUSES_FILTER,
      hasI18n: true,
    },
  ],
  Proposal: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    {
      label: "Trạng thái vòng đời",
      key: "lifecycleStatus",
      valueType: ValueTypeEnum.PICK_LIST,
      valueOptions: ENUMERATED_STATUSES_FILTER,
      hasI18n: true,
      optionValue: "key",
    },
  ],
  // WorkProject: [
  //   {
  //     label: "Trạng thái vòng đời",
  //     key: "status",
  //     valueType: ValueTypeEnum.PICK_LIST,
  //     valueOptions: [
  //       { key: STATUS_WORK.OPEN, label: STATUS_WORK.OPEN },
  //       { key: STATUS_WORK.COMPLETED, label: STATUS_WORK.COMPLETED },
  //       { key: STATUS_WORK.IN_PROGRESS, label: STATUS_WORK.IN_PROGRESS },
  //       { key: STATUS_WORK.REJECTED, label: STATUS_WORK.REJECTED },
  //     ],
  //     hasI18n: true,
  //   },
  // ],
};

export const mapSortOptions = {
  default: [
    { label: "Ascending", value: SortOrderEnum.ASC, key: "asc" },
    { label: "Descending", value: SortOrderEnum.DESC, key: "desc", default: true },
  ],
};

export const searchListConfig = {
  PolicyAction: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  PolicyCondition: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  PolicyRule: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  CharacteristicCategory: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  PickList: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  PropertySpecification: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST.filter((item: any) => item.key !== "delete"),
  },
  ProductProperty: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  PolicyEvent: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  ProductGroup: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  CharacteristicCatalog: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  ProposalGroup: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  Proposal: {
    property: ["name"],
    placeholder: "search",
    actions: [
      {
        key: "refresh",
        iconClass: "pi pi-undo",
        label: "Refresh",
        styleObject: { transform: "rotate(-30deg)" },
      },
    ],
  },
  ProcessFlowSpecification: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  CriteriaSet: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  WorkProject: {
    property: ["name", "code"],
    placeholder: "search",
    actions: DEFAULT_ACTIONS_LIST,
  },
  MyTask: {
    property: ["name", "status", "priority", "relatedProject.name"],
    placeholder: "search",
    actions: [
       {
         key: "delete",
         iconClass: "pi pi-times",
         label: "Reject",
       },
      {
        key: "refresh",
        iconClass: "pi pi-undo",
        label: "Refresh",
        styleObject: { transform: "rotate(-30deg)" },
      },
    ],
  },
  AssignTask: {
    property: ["name", "status", "priority", "relatedProject.name"],
    placeholder: "search",
    actions: [
       {
         key: "delete",
         iconClass: "pi pi-times",
         label: "Reject",
       },
      {
        key: "refresh",
        iconClass: "pi pi-undo",
        label: "Refresh",
        styleObject: { transform: "rotate(-30deg)" },
      },
    ],
  },
  default: {
    property: ["name"],
    placeholder: "search-by-name",
    actions: DEFAULT_ACTIONS_LIST,
  },
};

export const searchCardConfig = {
  default: {
    property: ["name", "code"],
    placeholder: "search",
  },
};

export const mapParamOptions = {
  default: [
    { label: "Mô tả", key: "description", valueType: ValueTypeEnum.TEXT },
    { label: "Phiên bản", key: "version", valueType: ValueTypeEnum.TEXT },
    {
      label: "Trạng thái vòng đời",
      key: "lifecycleStatus",
      valueType: ValueTypeEnum.PICK_LIST,
      valueOptions: LIFECYCLE_STATUSES_FILTER,
      hasI18n: true,
    },
  ],
};

export const mapTreeChildNodeActions = {
  default: [
    {
      label: "Unlink",
      key: TreeNodeActionEnum.UNLINK,
      iconClass: "fa fa-unlink",
    },
    { label: "Detail", key: TreeNodeActionEnum.DETAIL, iconClass: "fa fa-eye" },
  ],
  ProductSpecificationRef: [
    { label: "Detail", key: TreeNodeActionEnum.DETAIL, iconClass: "fa fa-eye" },
  ],
  BundledGroupProductOffering: [
    {
      label: "Unlink",
      key: TreeNodeActionEnum.UNLINK,
      iconClass: "fa fa-unlink",
    },
  ],
  // use for child of child node
  others: [
    { label: "Detail", key: TreeNodeActionEnum.DETAIL, iconClass: "fa fa-eye" },
  ],
};

export const mapTreeNodeActions = {
  default: [
    {
      label: "Delete",
      key: TreeNodeActionEnum.DELETE,
      iconClass: "pi pi-trash",
    },
  ],
};
