import { ActionTypeAcronymEnum, CharValueSpecTypeEnum, DetailTabEnum, KeyLayoutEnum, LifecycleStatusEnum, TypeEnum } from "./enum";

export const ROWS_PER_PAGE = 10;

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

export const RS_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS, DetailTabEnum.FEATURE_SPECIFICATION,
  DetailTabEnum.RELATED_PARTY, DetailTabEnum.RELATIONSHIP, 
  // DetailTabEnum.ATTACHMENT
]

export const CFSS_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS, DetailTabEnum.FEATURE_SPECIFICATION,
  DetailTabEnum.RELATED_PARTY, DetailTabEnum.RELATIONSHIP, 
  // DetailTabEnum.ATTACHMENT
];

export const RFSS_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS, DetailTabEnum.FEATURE_SPECIFICATION,
  DetailTabEnum.RELATED_PARTY, DetailTabEnum.RELATIONSHIP, 
  // DetailTabEnum.ATTACHMENT
];

export const CATE_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.PRODUCT_OFFERING
];

export const SPO_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.PRICE, DetailTabEnum.CHARACTERISTICS,
  DetailTabEnum.CHARACTERISTICS_USE, DetailTabEnum.RELATIONSHIP,
  DetailTabEnum.TERMS,
  DetailTabEnum.CHANNEL, DetailTabEnum.CATEGORY, DetailTabEnum.POLICY_RULE,
  // DetailTabEnum.PLACE, sau tab terms
];

export const PS_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS, DetailTabEnum.RELATED_PARTY, DetailTabEnum.RELATIONSHIP, 
  // DetailTabEnum.ATTACHMENT
  DetailTabEnum.POLICY_RULE
];

export const BPO_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.PRICE, DetailTabEnum.CHARACTERISTICS,
  DetailTabEnum.CHARACTERISTICS_USE, DetailTabEnum.RELATIONSHIP,
  DetailTabEnum.TERMS,
  DetailTabEnum.CHANNEL, DetailTabEnum.CATEGORY, DetailTabEnum.POLICY_RULE,
  // DetailTabEnum.PLACE, sau tab terms
];

export const POP_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS_USE, DetailTabEnum.TAX,
  DetailTabEnum.RELATIONSHIP, DetailTabEnum.TERMS, DetailTabEnum.POLICY_RULE,
  // DetailTabEnum.PLACE, trước tab terms
];

export const POPM_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.TAX,
  DetailTabEnum.RELATIONSHIP, DetailTabEnum.TERMS, DetailTabEnum.POLICY_RULE,
  // DetailTabEnum.PLACE, trước tab terms
];

export const CC_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTICS
];

export const PROPOSAL_GROUP_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.PROPOSAL_SPEC
];

export const CHAR_CATALOG_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.CHARACTERISTIC_SPEC
];

export const POLICY_EVENT_TAB = [
  DetailTabEnum.GENERAL
]

export const VS_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.VARIABLE
];

export const POLICY_RULE_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.POLICY_EVENT, DetailTabEnum.POLICY_CONDITION,
  DetailTabEnum.ACTION, DetailTabEnum.NOTE
]

export const POLICY_CONDITION_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.NOTE
];

export const POLICY_CONDITION_ATOMIC_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.STATEMENT, DetailTabEnum.NOTE
]

export const CC_PICKLIST_DETAIL_TABS = [
  DetailTabEnum.GENERAL, DetailTabEnum.PICK_LIST_ITEM
]

export const POLICY_ACTION_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.POLICY_CONDITION, DetailTabEnum.NOTE
]

export const POLICY_ACTION_ATOMIC_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.POLICY_CONDITION,
  DetailTabEnum.ACTION, DetailTabEnum.NOTE
]

export const PROPERTY_SPEC_TAB = [
  DetailTabEnum.GENERAL
]

export const PRODUCT_PROPERTY_TAB = [
  DetailTabEnum.GENERAL, DetailTabEnum.PROPERTY_SPEC
]

export const LIFECYCLE_STATUSES = [
  {
    id: "9",
    name: LifecycleStatusEnum.IN_STUDY,
    key: "inStudy",
    nextStatus: ["inDesign"]
  },
  {
    id: "10",
    name: LifecycleStatusEnum.IN_DESIGN,
    key: "inDesign",
    nextStatus: ["inTest"]
  },
  {
    id: "11",
    name: LifecycleStatusEnum.IN_TEST,
    key: "inTest",
    nextStatus: ["inDesign", "active", "rejected"]
  },
  {
    id: "12",
    name: LifecycleStatusEnum.ACTIVE,
    key: "active",
    nextStatus: ["launch", "retired"]
  },
  {
    id: "13",
    name: LifecycleStatusEnum.LAUNCH,
    key: "launch",
    nextStatus: ["retired"]
  },
  {
    id: "14",
    name: LifecycleStatusEnum.REJECTED,
    key: "rejected",
    nextStatus: []
  },
  {
    id: "15",
    name: LifecycleStatusEnum.RETIRED,
    key: "retired",
    nextStatus: ["obsolete"]
  },
  {
    id: "16",
    name: LifecycleStatusEnum.OBSOLETE,
    key: "obsolete",
    nextStatus: []
  }
];

export const LIFECYCLE_STATUSES_FILTER = LIFECYCLE_STATUSES.map((item) => {
  return {
    label: item.name,
    value: item.key,
    key: item.key,
  }
});

export const ENUMERATED_STATUSES = [
  {
    id: "1",
    name: "Rejected",
    key: "Rejected",
    nextStatus: []
  },
  {
    id: "2",
    name: "In Design",
    key: "In design",
    nextStatus: []
  },
  {
    id: "3",
    name: "Pending Design Approval",
    key: "PendingDesignApproval",
    nextStatus: []
  },
  {
    id: "4",
    name: "Design Rejected",
    key: "DesignRejected",
    nextStatus: []
  },
  {
    id: "5",
    name: "Configuration",
    key: "Configuration",
    nextStatus: []
  },
  {
    id: "6",
    name: "Pending Configuration Approval",
    key: "PendingConfigurationApproval",
    nextStatus: []
  },
  {
    id: "7",
    name: "Configuration Rejected",
    key: "ConfigurationRejected",
    nextStatus: []
  },
  {
    id: "8",
    name: "In Test",
    key: "In test",
    nextStatus: []
  },
  {
    id: "9",
    name: "Test Rejected",
    key: "TestRejected",
    nextStatus: []
  },
  {
    id: "10",
    name: "Active",
    key: "Active",
    nextStatus: []
  }
]

export const ENUMERATED_STATUSES_FILTER = ENUMERATED_STATUSES.map((item) => {
  return {
    label: item.name,
    value: item.key,
    key: item.key,
  }
});

export const RS_TYPES = [
  { label: 'PhysicalResourceSpecification', key: 'physical-rs' },
  { label: 'LogicalResourceSpecification', key: 'logical-rs' }
]

export const RELATIONSHIP_TYPES = [
  { label: 'Migration', value: 'migration' },
  { label: 'Substitution', value: 'substitution' },
  { label: 'Dependency', value: 'dependency' },
  { label: 'Exclusivity', value: 'exclusivity' }
]

export const FILE_UPLOAD_TYPES = [
  { label: '', value: '' },
  { label: 'Ảnh', value: 'image' },
  { label: 'Video', value: 'video' },
]

export const DEFAULT_PANEL_VALUE = { 
  key: '', 
  value: [], 
  totalRecords: 0, 
  resultCount: 0 
};

export const DEFAULT_FIELDS_PARAM = "id,name,@type,@baseType,href,description,version,lifecycleStatus,isBundle,code,isRoot,isLeaf";

export const ATTACHMENT_STYLE = {
  height: 'max-content',
  marginBottom: '10px',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
};

export const CHARACTERISTICS_STYLE = {
  height: 'max-content',
  marginBottom: '10px',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
}

export const PICKLIST_STYLE = {
  height: 'max-content',
  marginBottom: '10px',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
}


export const ICON_BY_TAB = {
  [DetailTabEnum.GENERAL]: 'fa fa-info-circle',
  [DetailTabEnum.CHARACTERISTICS]: 'fa fa-list-alt',
  [DetailTabEnum.CHARACTERISTICS_USE]: 'fa fa-copyright',
  [DetailTabEnum.RELATED_PARTY]: 'fa fa-university',
  [DetailTabEnum.RELATIONSHIP]: 'fa fa-share-alt',
  [DetailTabEnum.ATTACHMENT]: 'fa fa-paperclip',
  [DetailTabEnum.CATEGORY]: 'fa fa-clone',
  [DetailTabEnum.PRODUCT_OFFERING]: 'fa fa-th-large',
  [DetailTabEnum.FEATURE_SPECIFICATION]: 'fa fa-cogs',
  [DetailTabEnum.PICK_LIST]: 'fa fa-list-alt',
  [DetailTabEnum.PROPOSAL_SPEC]: 'fa fa-list-alt',
  [DetailTabEnum.CHARACTERISTIC_SPEC]: 'fa fa-list-alt',

  [DetailTabEnum.OPTION]: 'fa fa-gears',
  [DetailTabEnum.PRICE]: 'fa fa-usd',
  [DetailTabEnum.TERMS]: 'fa fa-calendar-check-o',
  [DetailTabEnum.PLACE]: 'fa fa-map',
  [DetailTabEnum.MARKET_SEGMENT]: 'fa fa-tags',
  [DetailTabEnum.CHANNEL]: 'pi pi-shop',
  [DetailTabEnum.AGREEMENT]: 'fa fa-file-text-o',
  [DetailTabEnum.PROMOTION]: 'fa fa-gift',
  [DetailTabEnum.QUALIFICATION_RULE]: 'fa fa-check-square-o',
  [DetailTabEnum.PRICE_RULE]: 'fa fa-btc',
  [DetailTabEnum.ATTRIBUTE_RULE]: 'fa fa-list-ol',
  [DetailTabEnum.TAX]: 'fa fa-money',
  [DetailTabEnum.REPLACEMENT_PRICE]: 'fa fa-clone',
  [DetailTabEnum.VARIABLE]: 'fa fa-cubes',
  [DetailTabEnum.POLICY_RULE]: 'fa fa-list-ul',

  [DetailTabEnum.DOMAIN]: 'fa fa-globe',
  [DetailTabEnum.ACTION]: 'fa fa-forward',
  [DetailTabEnum.POLICY_CONDITION]: 'fa fa-random',
  [DetailTabEnum.POLICY_EVENT]: 'fa fa-calendar',
  [DetailTabEnum.NOTE]: 'fa fa-file-text',
  [DetailTabEnum.STATEMENT]: 'fa fa-list-alt',
  [DetailTabEnum.PICK_LIST_ITEM]: 'fa fa-list-ul',
  [DetailTabEnum.PROPERTY_SPEC]: 'fa fa-list-alt',
};

export const POP_PRICE_TYPES = [
  { label: 'onetime', key: 'onetime' },
  { label: 'recurring', key: 'recurring' },
  { label: 'usage', key: 'usage' },
  { label: 'discount', key: 'discount' },
  { label: 'replacement', key: 'replacement' },
]

export const MATRIX_PRICE_TYPES = [
  { label: 'onetime', key: 'onetime' },
  { label: 'recurring', key: 'recurring' },
  { label: 'usage', key: 'usage' }
]

export const PRICE_UNITS = [
  { label: 'VND', key: 'VND' },
  { label: 'USD', key: 'USD' },
]

export const POP_TYPES = [
  { label: 'ProductOfferingPrice', key: 'pop' },
  { label: 'ProductOfferingPriceMatrix', key: 'matrix' }
]

export const POP_RELATIONSHIP_TYPES = [
  { label: 'Override', value: 'override' },
  { label: 'Discount', value: 'discount' },
  { label: 'Discount Tax', value: 'discountTax' },
]

export const POP_RELATIONSHIP_ROLES = [
  { label: 'A-Charge', value: 'A-Charge' },
]

export const PERIOD_TYPES = [
  { label: 'hourly', key: 'hourly' },
  { label: 'daily', key: 'daily' },
  { label: 'weekly', key: 'weekly' },
  { label: 'monthly', key: 'monthly' },
  { label: 'yearly', key: 'yearly' }
]

export const DURATION_OPTIONS = [
  { label: 'day', key: 'day' },
  { label: 'month', key: 'month' },
]

export const TAX_CATEGORIES = [
  { label: 'VAT', key: 'VAT' }
]

export const PRICING_TYPES = [
  { label: 'bundle', key: 'bundle' },
  { label: 'simple', key: 'simple' },
  { label: 'hybrid', key: 'hybrid' }
]

export const KEYS_CHANGED = [
  { key: 'value', value: 'Price', default: null },
  { key: 'blockSize', value: 'Block Size', default: 1 },
  { key: 'overagePrice', value: 'Overage Price', default: 0 },
]

export const PROCESS_FLOW_TYPES = [
  { label: 'Đăng ký mới', key: 'registry' },
  { label: 'Gia hạn', key: 'renew' },
  { label: 'Hủy', key: 'retirement' }
]

export const FS_RELATIONSHIP_TYPES = [
  { label: 'Excluded', value: 'excluded' },
  { label: 'Includes', value: 'includes' },
  { label: 'May Include', value: 'may include' },
  { label: 'Requires', value: 'requires' },
]

export const DOMAINS = [
  { label: 'epc', key: 'epc' },
  { label: 'inv', key: 'inv' },
  { label: 'com', key: 'com' },
  { label: 'iam', key: 'iam' },
  { label: 'cpr', key: 'cpr' },
  { label: 'crm', key: 'crm' }
]

export const DATA_TYPES = [
  { label: 'String', key: 'string' },
  { label: 'Number', key: 'number' },
  { label: 'Object', key: 'object' }
];

export const TYPE_CONDITION = [
  { label: 'Atomic', key: 'Atomic' },
  { label: 'Composite', key: 'Composite' }
]

export const PROMOTION_TYPE = [
  { key: 'award', value: 'Award' },
  { key: 'discount', value: 'Discount' },
  { key: 'reduction', value: 'Reduction' }
]


export const ACTION_TYPE = [
  { label: 'Operation', key: 'Operation' },
  { label: 'Promotion', key: 'Promotion' }
]

export const EXCLUCDED_PRICE_TYPES = ['discount', 'replacement'];

export const OPERATORS = [
  { label: '=', key: '==', isFilter: true },
  { label: '<=', key: '<=' },
  { label: '<', key: '<' },
  { label: '>', key: '>' },
  { label: '>=', key: '>=' },
  { label: '!=', key: '!=', isFilter: true },
  { label: 'IN', key: 'IN', isFilter: true },
  { label: 'NOT IN', key: 'NOT IN', isFilter: true },
  { label: 'Range', key: 'Range' }
];

export const OPERATOR_LIST = ['IN', 'NOT IN'];

export const VALUE_TYPES = [
  { label: 'String', key: 'String' },
  { label: 'Number', key: 'Number' },
  { label: 'Object', key: 'Object' },
  { label: 'Datetime', key: 'Datetime' },
  { label: 'Collection', key: 'Collection' }
];

export const LAYOUTS = [
  { label: 'Select list', key: KeyLayoutEnum.SELECT_LIST },
  { label: 'Select list of value', key: KeyLayoutEnum.SELECT_LOV },
  { label: 'Textbox', key: KeyLayoutEnum.TEXTBOX },
  { label: 'Datetime', key: KeyLayoutEnum.DATETIME },
];

export const EXECUTION_STRATEGY = [
  { label: 'Any of', key: 'anyOf' },
  { label: 'None of', key: 'noneOf' },
  { label: 'All of', key: 'allOf' },
  { label: 'One of', key: 'oneOf' }
];

export const CONDITION_STRATEGY = [
  { label: 'Any of', key: 'anyOf' },
  { label: 'None of', key: 'noneOf' },
  { label: 'All of', key: 'allOf' },
  { label: 'One of', key: 'oneOf' }
];

export const SEQ_ACTIONS = [
  { label: '1- Mandatory', key: 1 },
  { label: '2- Recommended', key: 2 },
  { label: '3- Best Effort', key: 3 }
];

export const VARIABLE_TYPES = [
  { label: 'Variable', key: 'Variable' },
  { label: 'Function', key: 'Function' }
];

export const PROPOSAL_GROUP_TYPES = [
  { label: 'Common', key: 'common', sortOrder: 6 },
  { label: 'Price', key: 'price', sortOrder: 4 },
  { label: 'Interest', key: 'interest', sortOrder: 3 },
  { label: 'Commitment', key: 'commitment', sortOrder: 5 },
  { label: 'Qualification', key: 'qualification', sortOrder: 2 },
  { label: 'OtherQualification', key: 'otherQualification', sortOrder: 7 },
  { label: 'Other', key: 'other', sortOrder: 8 },
  { label: 'ProductInfo', key: 'productInfo', sortOrder: 1 },
];

export const PROPOSAL_ATTRIBUTE_DATA_TYPES = [
  { label: 'String', key: 'String' },
  { label: 'Number', key: 'Number' },
  { label: 'Array', key: 'Array' }
];

export const PROPOSAL_ATTRIBUTE_LAYOUT = [
  { label: 'Textbox', key: KeyLayoutEnum.TEXTBOX },
  { label: 'Select list', key: KeyLayoutEnum.SELECT_LIST },
  { label: 'Select list of value', key: KeyLayoutEnum.SELECT_LOV }
];

export const OPERATION = [
  { label: 'Add', key: 'Add' },
  { label: 'Remove', key: 'Remove' },
  { label: 'Replace', key: 'Replace' }
]

export const PROMOTION_ACTION_TYPE = [
  { label: 'Voice (minute)', key: 'voice_minute' },
  { label: 'Data (MB)', key: 'data_mb' },
  { label: 'Data (GB)', key: 'data_gb' },
  { label: 'SMS', key: 'sms' },
  { label: 'Bonus point', key: 'bonus_point' },
  { label: 'Physical gift', key: 'physical_gift' },
  { label: 'Voucher', key: 'voucher' },
  { label: 'Promotion code', key: 'promotion_code' },
  { label: 'Existing offering', key: 'existing_offering' },
  { label: 'Currency', key: 'currency' },
]

export const ENTITY_TYPE = [
  { label: TypeEnum.SIMPLE_PO, key: 'simple-po' },
  { label: TypeEnum.BUNDLE_PO, key: 'bundle-po'},
  { label: TypeEnum.PRODUCT_SPEC, key: 'product-spec' },
  { label: TypeEnum.CFS_SPEC, key: 'customer-fs' },
  { label: TypeEnum.RFS_SPEC, key: 'resource-fs' },
  { label: TypeEnum.RESOURCE_SPEC, key: 'resource-spec' }
]

export const DATA_TYPES_ACTION = [
  { label: 'String', key: 'String' },
  { label: 'Number', key: 'Number' },
  { label: 'Object', key: 'Object' }
];

export const DEFAUTL_CHAR_SPEC_VALUE = {
  "@type": CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
  "@baseType": CharValueSpecTypeEnum.CHAR_VALUE_SPEC,
  valueType: "String",
  unitOfMeasure: "",
  value: null,
  isDefault: true,
  validFor: {}
}

export const TYPES_SHOW_DESC = [
  TypeEnum.BUNDLED_GROUP_PO,
];

export const TYPES_ALLOW_CHILDREN = [
  TypeEnum.POLICY_ACTION, TypeEnum.POLICY_CONDITION_COMPOSITE
]

export const DEFAULT_ACTIONS_LIST = [
  {
    key: 'add',
    iconClass: 'pi pi-plus',
    label: 'Add',
  },
  {
    key: 'delete',
    iconClass: 'fa fa-trash',
    label: 'Delete',
  },
  {
    key: 'refresh',
    iconClass: 'pi pi-undo',
    label: 'Refresh',
    styleObject: { transform: 'rotate(-30deg)' },
  }
]

export const COMPONENT_CACHE_LIST = [
  {
    name: 'Policy Rule',
  },
  {
    name: 'Policy Rule Detail',
    isDetail: true
  },
  {
    name: 'Policy Event',
  },
  {
    name: 'Policy Event Detail',
    isDetail: true
  }
];

export const COMPONENT_STATE_LIST_MAP = {
  ['Policy Rule Detail']: "policy-rule",
  ['Policy Event Detail']: "policy-event",
}

export const actionTypeMap: Record<any, any> = {
  [ActionTypeAcronymEnum.OPERATION]: TypeEnum.POLICY_ACTION_OPERATION,
  [ActionTypeAcronymEnum.EVENT]: TypeEnum.POLICY_ACTION_EVENT,
  [ActionTypeAcronymEnum.ALARM]: TypeEnum.POLICY_ACTION_ALARM,
  [ActionTypeAcronymEnum.PROMOTION]: TypeEnum.POLICY_ACTION_PROMOTION,
};

export const actionTypeMapReverse: Record<any, any> = {
  [TypeEnum.POLICY_ACTION_OPERATION]: ActionTypeAcronymEnum.OPERATION,
  [TypeEnum.POLICY_ACTION_EVENT]: ActionTypeAcronymEnum.EVENT,
  [TypeEnum.POLICY_ACTION_ALARM]: ActionTypeAcronymEnum.ALARM,
  [TypeEnum.POLICY_ACTION_PROMOTION]: ActionTypeAcronymEnum.PROMOTION,
};

export const urlPathMap: Record<any, any> = {
  [TypeEnum.SIMPLE_PO]: '/productOffering',
  [TypeEnum.BUNDLE_PO]: '/productOffering',
  [TypeEnum.PRODUCT_SPEC]: '/productSpecification',
  [TypeEnum.CFS_SPEC]: '/serviceSpecification',
  [TypeEnum.RFS_SPEC]: '/serviceSpecification',
  [TypeEnum.RESOURCE_SPEC]: '/resourceSpecification'
};

export const entityTypeMap: Record<any, any> = {
  [TypeEnum.SIMPLE_PO]: TypeEnum.SIMPLE_PO,
  [TypeEnum.BUNDLE_PO]: TypeEnum.BUNDLE_PO,
  [TypeEnum.PRODUCT_SPEC]: TypeEnum.PRODUCT_SPEC,
  [TypeEnum.CFS_SPEC]: TypeEnum.CFS_SPEC,
  [TypeEnum.RFS_SPEC]: TypeEnum.RFS_SPEC,
  [TypeEnum.LOGICAL_RESOURCE_SPEC]: TypeEnum.RESOURCE_SPEC,
  [TypeEnum.PHYSICAL_RESOURCE_SPEC]: TypeEnum.RESOURCE_SPEC,
};
