export enum KeyEnum {
  RESOURCE_SPEC_KEY = "resource-spec",
  TEMPLATE_RESOURCE_SPEC_KEY = "template-resource-spec",
  CFS_SPEC_KEY = "customer-fs",
  RFS_SPEC_KEY = "resource-fs",
  CATE_KEY = "category",
  TEMPLATE_SERVICE_SPEC_KEY = "template-service-spec",
  PRODUCT_SPEC_KEY = "product-spec",
  BUNDLE_PO_KEY = "bundle-po",
  SIMPLE_PO_KEY = "simple-po",
  PO_PRICE_KEY = "po-price",
  FEATURE_SPEC_KEY = "feature-spec",
  PRODUCT_CATEGORY_KEY = "category",
  CHANNEL_KEY = "channel",
  PROMOTION_KEY = "promotion",
  PRODUCT_OFFERING_KEY = "product-offering",
  PLACE_KEY = "place",
  INDIVIDUAL_KEY = "individual",
  ORGANIZATION_KEY = "organization",
  POLICY_RULE_KEY = "policy-rule",
}

export enum TypeEnum {
  RESOURCE_SPEC = "ResourceSpecification",
  SERVICE_SPEC = "ServiceSpecification",
  CFS = "CustomerFacingService",
  RFS = "ResourceFacingService",
  PO = "ProductOffering",
  CATE = "Category",
  CFS_SPEC = "CustomerFacingServiceSpecification",
  RFS_SPEC = "ResourceFacingServiceSpecification",
  LOGICAL_RESOURCE_SPEC = "LogicalResourceSpecification",
  PHYSICAL_RESOURCE_SPEC = "PhysicalResourceSpecification",
  RESOURCE_SPEC_RELATIONSHIP = "ResourceSpecificationRelationship",
  SERVICE_SPEC_RELATIONSHIP = "ServiceSpecRelationship",
  RESOURCE_SPEC_REF = "ResourceSpecificationRef",
  SERVICE_SPEC_REF = "ServiceSpecificationRef",
  CATE_REF = "CategoryRef",
  PO_REF = "ProductOfferingRef",
  CHARACTERISTIC = "CharacteristicSpecification",
  CHARACTERISTIC_USE = "ProductSpecificationCharacteristicValueUse",
  PRODUCT_SPEC = "ProductSpecification",
  PRODUCT_SPEC_REF = "ProductSpecificationRef",
  PRODUCT_SPEC_RELATIONSHIP = "ProductSpecificationRelationship",
  ATTACHMENT = "Attachment",
  ATTACHMENT_REF_OR_VALUE = "AttachmentRefOrValue",
  BUNDLE_PO = "BundleProductOffering",
  PRODUCT_OFFERING = "ProductOffering",
  BUNDLED_PO = "BundledProductOffering",
  SIMPLE_PO = "SimpleProductOffering",
  PRODUCT_OFFERING_RELATIONSHIP = "ProductOfferingRelationship",
  BUNDLED_PO_OPTION = "BundledProductOfferingOption",
  BUNDLED_GROUP_PO = "BundledGroupProductOffering",
  BUNDLED_GROUP_PO_OPTION = "BundledGroupProductOfferingOption",
  PO_PRICE = "ProductOfferingPrice",
  PO_PRICE_RELATIONSHIP = "ProductOfferingPriceRelationship",
  TERMS = "ProductOfferingTerm",
  POP_MATRIX = "ProductOfferingPriceMatrix",
  POP_MATRIX_CELL = "ProductOfferingPriceMatrixCell",
  PROPOSAL = "Proposal",
  PROPOSAL_REF = "ProposalRef",
  PROPOSAL_GROUP = "ProposalGroup",
  PROPOSAL_GROUP_REF = "ProposalGroupRef",
  PROPOSAL_SPEC = "ProposalSpecification",
  PROPOSAL_SPEC_REF = "ProposalSpecificationRef",
  TAX_ITEM = "TaxItem",
  CHARACTERISTIC_POP = "ProductSpecificationCharacteristicValueUse",
  PO_PRICE_REF = "ProductOfferingPriceRef",
  PROCESS_FLOW_SPEC = "ProcessFlowSpecification",
  PROCESS_FLOW_SPEC_REF = "ProcessFlowSpecificationRef",
  FEATURE_SPECIFICATION = "FeatureSpecification",
  FS_RELATIONSHIP = "FeatureSpecificationRelationship",
  ATTRIBUTE = "Attribute",
  CHARACTERISTIC_CATEGORY = "CharacteristicCategory",
  CHARACTERISTIC_CATEGORY_REF = "CharacteristicCategoryRef",
  CHARACTERISTIC_CATEGORY_CHILD = "CharacteristicCategoryChild",
  POLICY_VARIABLE_SET = "PolicyVariableSet",
  CHARACTERISTIC_CAT = "CharacteristicCategory",
  CHAR_CATALOG = "CharacteristicCatalog",
  CHAR_CATALOG_REF = "CharacteristicCatalogRef",
  PRODUCT_GROUP = "ProductGroup",
  PRODUCT_GROUP_REF = "ProductGroupRef",
  CRITERIA_SET = "CriteriaSet",
  CRITERIA_SET_REF = "CriteriaSetRef",
  CRITERIA = "Criteria",
  CRITERIA_REF = "CriteriaRef",
  PROMOTION = "Promotion",
  PROMOTION_PATTERN= "PromotionPattern",
  PROMOTION_CRITERIA_GROUP= "PromotionCriteriaGroup",
  PROMOTION_CRITERIA= "PromotionCriteria",
  PROMOTION_ACTION= "PromotionAction",
  ENTITY_REF= "EntityRef",
  ACTION_TYPE = "ActionType",
  POLICY_EVENT = "PolicyEvent",
  POLICY_VARIABLE = "PolicyVariable",
  POLICY_RULE = "PolicyRule",
  NOTE = "Note",
  POLICY_EVENT_REF = "PolicyEventRef",
  POLICY_CONDITION = "PolicyCondition",
  POLICY_CONDITION_REF = "PolicyConditionRef",
  POLICY_CONDITION_ATOMIC = "PolicyConditionAtomic",
  POLICY_CONDITION_COMPOSITE = "PolicyConditionComposite",
  POLICY_VARIABLE_REF = "PolicyVariableRef",
  POLICY_CONDITION_STATEMENT = "PolicyConditionStatement",
  POLICY_CONDITION_VARIABLE = "PolicyConditionVariable",
  POLICY_CONDITION_VALUE = "PolicyConditionValue",
  POLICY_NOTE = "PolicyNote",
  POLICY_LIST = "PolicyList",
  PICK_LIST = "PickList",
  PICK_LIST_ITEM = "PickListItem",
  PICK_LIST_STRING_ITEM = "PickListStringItem",
  PICK_LIST_NUMBER_ITEM = "PickListNumberItem",
  PICK_LIST_OBJECT_ITEM = "PickListObjectItem",
  POLICY_ACTION = "PolicyAction",
  POLICY_ACTION_REF = "PolicyActionRef",
  POLICY_ACTION_OPERATION = "PolicyActionOperation",
  POLICY_ACTION_EVENT = "PolicyActionEvent",
  POLICY_ACTION_ALARM = "PolicyActionAlarm",
  CHARACTERISTIC_SPEC_REF = "CharacteristicSpecificationRef",
  CHANNEL = "Channel",
  CHANNEL_REF = "ChannelRef",
  PROPERTY_SPECIFICATION = "PropertySpecification",
  PRODUCT_PROPERTY = "ProductProperty",
  POLICY_REF = "PolicyRef",
  POLICY_VARIABLE_SET_REF = "PolicyVariableSetRef",
  PRODUCT_CATEGORY = "ProductCategory",
  PLACE = "Place",
  INDIVIDUAL = "Individual",
  ORGANIZATION = "Organization",
  WORK_PROJECT = "WorkProject",
  WORK_PROJECT_REF = "WorkProjectRef",
  MY_TASK = "MyTask",
  ASSIGN_TASK = "AssignTask",
  PRODUCT_PROPERTY_ITEM_SPEC = "ProductPropertyItemSpecification",
  POLICY_ACTION_PROMOTION = "PolicyActionPromotion"
}

export enum StatusCodeEnum {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

export enum ValueTypeEnum {
  PICK_LIST = "PickList",
  NUMBER = "Number",
  TEXT = "Text",
  BOOLEAN = "Boolean",
  UPLOAD_FILE = "UploadFile",
  TOGGLE_SWITCH = "ToggleSwitch",
  MULTI_SELECT = "MultiSelect",
  DROPDOWN = "Dropdown",
  TEXTAREA = "TextArea",
  RANGE = "Range",
  OTHERS = "Others",
  JSON_OBJECT = "JsonObject",
  MULTI_TEXT = "MultiText",
  MULTI_NUMBER = "MultiNumber",
  DATETIME = "Datetime",
  RANGE_DATETIME = "RangeDatetime",
  MULTI_DATETIME = "MultiDatetime",
  MULTI_JSON_OBJECT = "MultiJsonObject",
  STRING = "String",
  OBJECT = "Object",
}

export enum SchemaLocationEnum {
  RESOURCE_SPEC = "https://mycsp.com:8080/tmf-api/schema/Resource/ResourceSpecification.schema.json",
  RESOURCE_SPEC_REF = "https://mycsp.com:8080/tmf-api/schema/Resource/ResourceSpecificationRef.schema.json",
  SERVICE_SPEC = "https://mycsp.com:8080/tmf-api/schemas/Service/ServiceSpecification.schema.json",
  SERVICE_SPEC_RELATIONSHIP = "https://mycsp.com:8080/tmfapi/schema/Service/ServiceSpecRelationship.schema.json",
  SERVICE_SPEC_REF = "https://mycsp.com:8080/tmf-api/schema/Service/ServiceSpecificationRef.schema.json",
  CATE_REF = "https://mycsp.com:8080/tmf-api/schemas/Product/Category.schema.json",
  PRODUCT_SPEC = "https://mycsp.com:8080/tmf-api/schema/Product/ProductSpecification.schema.json",
  PRODUCT_SPEC_RELATIONSHIP = "https://mycsp.com:8080/tmf-api/schema/Product/ProductSpecificationRelationship.schema.json",
  PO_REF = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOffering.schema.json",
  PRODUCT_OFFERING = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOffering.schema.json",
  BUNDLED_PRODUCT_OFFERING = "https://mycsp.com:8080/tmf-api/schemas/Product/BundledProductOffering.schema.json",
  PRODUCT_OFFERING_RELATIONSHIP = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOfferingRelationship.schema.json",
  BUNDLED_GROUP_PO = "https://mycsp.com:8080/tmf-api/schemas/Product/BundledGroupProductOffering.schema.json",
  PO_PRICE = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOfferingPrice.schema.json",
  TERM_REF = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOfferingTerm.schema.json",
  PROPOSAL_SPEC = "https://mycsp.com:8080/tmf-api/schema/Proposal/ProposalSpecification.schema.json",
  PO_PRICE_RELATIONSHIP = "https://mycsp.com:8080/tmf-api/schema/Product/ProductOfferingPriceRelationship.schema.json"
}

export enum RelationshipTypeEnum {
  REQUIRES = "requires",
  MATRIX_CELL = "matrixCell",
}

export enum WidthEnum {
  DEFAULT = 450,
  SMALL = 40,
  MID_MIN = 10,
  RIGHT_MIN = 0,
  WIDTH_LIST = 490,
}

export enum ScreenPathEnum {
  RESOURCE_SPEC = "/epc/resource-spec",
  CUSTOMER_FS = "/epc/customer-fs",
  RESOURCE_FS = "/epc/resource-fs",
  PRODUCT_SPEC = "/epc/product-spec",
  CATEGORY = "/epc/category",
  DFORM_CATEGORY = "/epc/dform-category",
  SIMPLE_PO = "/epc/simple-po",
  BUNDLE_PO = "/epc/bundle-po",
  PO_PRICE = "/epc/po-price",
  PROPOSAL = "/epc/proposal",
  PROPOSAL_DESIGN = "/epc/proposal-design",
  PROPOSAL_APPROVAL = "/epc/proposal-approval",
  PROPOSAL_CONFIGURATION = "/epc/proposal-config",
  PROPOSAL_VIEW = "/epc/proposal-view",
  PROCESS_FLOW_SPEC = "/epc/process-flow-spec",
  POLICY_EVENT = "/epc/policy-event",
  POLICY_CONDITION = "/epc/policy-condition",
  POLICY_VARIABLE_SET = "/epc/policy-variable-set",
  POLICY_RULE = "/epc/policy-rule",
  CHAR_CATALOG = "/epc/characteristic-catalog",
  PICK_LIST = "/epc/pick-list",
  POLICY_ACTION = "/epc/policy-action",
  CHARACTERISTIC_CATEGORY = "/epc/characteristic-category",
  PROPERTY_SPECIFICATION = "/epc/property-specification",
  PRODUCT_PROPERTY = "/epc/product-property",
  PROMOTION = "/epc/promotion",
  WORK_PROJECT = "/epc/work-project",
  MY_TASK = "/epc/my-task",
  MY_TASK_DETAIL = "/epc/my-task/detail",
  ASSIGN_TASK = "/epc/assign-task"
}

export enum DetailTabEnum {
  GENERAL = "General",
  CHARACTERISTICS = "Characteristic",
  CHARACTERISTICS_USE = "Characteristic Use",
  RELATED_PARTY = "Related Party",
  RELATIONSHIP = "Relationship",
  ATTACHMENT = "Attachment",
  CATEGORY = "Category",
  PRODUCT_OFFERING = "Product Offering",
  FEATURE_SPECIFICATION = "Feature Specification",
  PICK_LIST = "Pick List",
  PICK_LIST_ITEM = "PickList Item",
  PROPOSAL_SPEC = "Proposal Specification",
  CHARACTERISTIC_SPEC = "Characteristic Specification",
  CRITERIA_LIST = "Criteria",
  OPTION = "Option",
  PRICE = "Price",
  TERMS = "Terms",
  PLACE = "Place",
  MARKET_SEGMENT = "Market Segment",
  CHANNEL = "Channel",
  AGREEMENT = "Agreement",
  PROMOTION = "Promotion",
  QUALIFICATION_RULE = "Qualification Rule",
  PRICE_RULE = "Price Rule",
  ATTRIBUTE_RULE = "Attribute Rule",
  TAX = "Tax",
  REPLACEMENT_PRICE = "Replacement Price",
  VARIABLE = "Variable",
  DOMAIN = "Domain",
  ACTION = "Action",
  POLICY_CONDITION = "Condition",
  POLICY_EVENT = "Event",
  NOTE = "Note",
  STATEMENT = "Statement",
  PROPERTY_SPEC = "Property Specification",
  POLICY_RULE = "Policy Rule",
  ATTRIBUTE = "Attribute"
}

export enum StoreRSEnum {
  IS_SEARCH_TAB = "IS_SEARCH_TAB",
  IS_HIDDEN_DETAIL_TAB = "IS_HIDDEN_DETAIL_TAB",
  ACTIVE_TAB = "ACTIVE_TAB",
  IS_HIDDEN_SEARCH_TAB = "IS_HIDDEN_SEARCH_TAB",
  LIST_OBJECTS = "LIST_OBJECTS",
  RESOURCE_SPEC_ID = "RESOURCE_SPEC_ID",
  RESOURCE_SPEC_SELECTED = "RESOURCE_SPEC_SELECTED",
  OLD_RESOURCE_SPEC_SELECTED = "OLD_RESOURCE_SPEC_SELECTED"
}

export enum LocalStorageEnum {
  LAST_TAB = "lastTab",
  EPC_PERMISSIONS = "epc_permissions",
  LANGUAGE = "language",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER_ID = "user_id",
}

export enum CtlTypeEnum {
  TEXTBOX = "TEXTBOX",
  TEXTAREA = "TEXTAREA",
  COMBOBOX = "COMBOBOX",
  DATETIME = "DATETIME",
  CHECKBOX = "CHECKBOX",
  NUMBER = "NUMBER",
  SELECT_LIST = "SELECT_LIST",
  SELECT_LOV = "SELECT_LOV",
}

export enum CharValueSpecTypeEnum {
  CHAR_VALUE_SPEC = "CharacteristicValueSpecification",
}

export enum PermissionTypeEnum {
  CHECK_PERMISSION = "CheckPermission",
  PERMISSION_SPECIFICATION = "PermissionSpecification",
  RELATED_PARTY_REF_OR_PARTY_ROLE_REF = "RelatedPartyRefOrPartyRoleRef",
  PARTY_REF = "PartyRef"
}

export enum PermissionActionEnum {
  READ = "Read",
  WRITE = "Write",
  DELETE = "Delete",
  CREATE = "Create",
  UPDATE = "Update",
  READ_WRITE = "ReadWrite",
}

export enum PropertyEnum {
  IDX = "idx",
  NAME = "name",
  TITLE = "title",
  PATH = "path",
  FIELDS = "fields",
  CODE = "code",
  FILTER = "filter",
  VALUE_TYPE = "valueType",
  LAYOUT = "layout",
  OPERATOR = "operator",
  PICK_LIST = "pickList",
  SELECT_LIST = "selectList",
  EXTRA_INFO = "extraInfo",
  DESCRIPTION = "description",
  VARIABLE_SET = "variableSet",
  VARIABLE = "variable",
  VALUE = "value",
  DATA_TYPE = "dataType",
  VARIABLE_TYPE = "variableType",
  UNIT_OF_MEASURE = "unitOfMeasure",
  VALID_FOR = "validFor",
  IS_DEFAULT = "isDefault",
}

export enum KeyLayoutEnum {
  TEXTBOX = "TEXTBOX",
  SELECT_LIST = "SELECT_LIST",
  SELECT_LOV = "SELECT_LOV",
  DATETIME = "DATETIME",
  DRAG_DROP = "DRAG_DROP",
  OBJECT_SELECTOR = "OBJECT_SELECTOR",
}

export enum KeyValueTypeEnum {
  STRING = "String",
  COLLECTION = "Collection",
  NUMBER = "Number",
  OBJECT = "Object",
  DATETIME = "Datetime",
  OBJECT_IDENTIFIER = "ObjectIdentifier",
}

export enum DataTypeEnum {
  STRING = "String",
  NUMBER = "Number",
  OBJECT = "Object"
}

export enum AttributeDataTypeEnum {
  STRING = "String",
  NUMBER = "Number",
  ARRAY = "Array"
}

export enum PageLinkSizeEnum {
  MIN = 1,
  DEFAULT = 3,
}

export enum CtlTypeGeneralTabEnum {
  LABEL = "label",
  TEXTBOX = "textbox",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
  DATETIME = "datetime",
  RANGE_DATETIME = "rangeDatetime",
  NUMBER = "number",
  TOGGLE_SWITCH = "toggleSwitch",
  LIFECYCLE_STATUS = "lifecycleStatus",
  JSON_OBJECT = "JsonObject",
}

export enum TreeNodeActionEnum {
  DELETE = "delete",
  DETAIL = "detail",
  UNLINK = "unlink",
}

export enum ColorEnum {
  COMPOSITE = "#77e377",
  ATOMIC = "#2cc7f9",
  LINE = "#808080",
  STATEMENT = "#dcdbdb",
  VARIABLE = "#4af48b",
  CONDITION = "#40826d"
}

export enum ProposalStatusEnum {
  REJECTED = "Rejected",
  PENDING_DESIGN_APPROVAL = "PendingDesignApproval",
  DESIGN_REJECTED = "DesignRejected",
  CONFIGURATION = "Configuration",
  PENDING_CONFIG_APPROVAL = "PendingConfigurationApproval",
  CONFIG_REJECTED = "ConfigurationRejected",
  IN_DESIGN = "In design",
  IN_TEST = "In test",
  TEST_REJECTED = "TestRejected",
  ACTIVE = "Active",
  IN_STUDY = "In study",
}

export enum ProposalPathEnum {
  DESIGN_PROPOSAL = "proposal-design",
  APPROVE_PROPOSAL = "proposal-approval",
  CONFIG_PROPOSAL = "proposal-config",
  VIEW_PROPOSAL = "proposal-view",
}

export enum ProposalApiMappingEnum {
    DESIGN_PROPOSAL = "/proposalDesign",
    APPROVE_PROPOSAL = "/proposalApproval",
    CONFIG_PROPOSAL = "/proposalConfiguration",
    VIEW_PROPOSAL = "/proposalView",
}

export enum TaskStatusEnum {
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
  COMPLETE_DESIGN = "COMPLETE_DESIGN",
  REJECT_DESIGN = "REJECT_DESIGN",
  APPROVE_DESIGN = "APPROVE_DESIGN",
}

export enum LifecycleStatusEnum {
  IN_STUDY = "In study",
  IN_DESIGN = "In design",
  IN_TEST = "In test",
  ACTIVE = "Active",
  LAUNCH = "Launch",
  REJECTED = "Rejected",
  RETIRED = "Retired",
  OBSOLETE = "Obsolete"
}

export enum ActionTypeAcronymEnum {
  COMPOSITE = "Composite",
  ATOMIC = "Atomic",
  OPERATION = "Operation",
  EVENT = "Event",
  ALARM = "Alarm",
  PROMOTION = "Promotion"
}

export enum MethodApiEnum {
  PUT = "put",
  PATCH = "patch",
}
