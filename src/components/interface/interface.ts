interface MenuItem {
  items: any,
  separator?: boolean,
}

interface IconItem {
  label: string;
  icon: string;
  isSvgIcon?: boolean;
  to: string;
  apiMapping: string[];
  tabId?: number;
  uniqueKey?: string;
  pageData?: any;
  isFromOtherPage?: boolean;
  isDialog?: boolean;
  visible?: boolean;
  taskId?: string;
  pageListInfo?: any;
}

interface PropertyItem {
  label: string;
  value: string;
}

interface NodeType {
  id: string | null;
  name: string;
  desc: string;
}

interface ObjectItem {
  label: string;
  key: string;
}

interface ObjectType {
  label: string;
  key: string;
  type: string;
  funcPath?: string;
}

interface ResourceSpec {
  id: number;
  name: string;
  description: string;
  version: string;
}

interface ServiceSpec {
  id: number;
  name: string;
  description: string;
  version: string;
}

interface TreeNode {
  selectedOption: ParamOption | null;
  selectedOperator: ObjectItem | null;
  validOptions: ParamOption[];
  id: string;
  value: any;
  objectSelected?: any;
  operators: SearchOperator[];
  options?: any[];
}

interface ParamOption {
  label: string;
  key: string;
  valueType: string;
  valueOptions?: any;
  hasI18n?: boolean;
  jsonpath?: boolean;
  config?: any;
  optionValue?: string;
}

interface SearchAttribute {
  label: string;
  key: string;
  value: string;
}

interface SortOption {
  label: string;
  key: string;
  value: string;
  default?: boolean;
}

interface SearchOperator {
  label: string;
  key: string;
}

interface NodeAction {
  label: string;
  key: string;
  iconClass: string;
}

interface PanelObject {
  key: string;
  value: any;
  totalRecords: number;
  resultCount: number;
}

interface ResourceSpecification {
  id: string;
  href: string;
  name: string;
  code: string;
  description: string;
  "@baseType": string;
  "@type": string;
  "@schemaLocation": string;
  version: number;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  lastUpdate: string;
  lifecycleStatus: string;
  isBundle: boolean;
  category: string;
  attachment: any[];
  relatedParty: any[];
  resourceSpecCharacteristic: SpecCharacteristicInterface[];
  resourceSpecRelationship: ResourceSpecRelationship[];
  targetResourceSchema: any;
  type?: any;
  featureSpecification: any;
}

interface CustomerFacingServiceSpecification {
  id: string;
  name: string;
  code: string;
  description: string;
  "@type": string;
  "@referredType": string;
  "@baseType": string;
  "@schemaLocation": string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  lifecycleStatus: string;
  serviceLevelSpecification: any[];
  resourceSpecification: ResourceSpecification[];
  specCharacteristic: SpecCharacteristicInterface[];
  entitySpecRelationship: any[];
  relatedParty: any[];
  featureSpecification: any[];
  attachment: any[];
  constraint: any[];
  serviceSpecRelationship: any[];
  isBundle: boolean;
  type?: string;
}

interface ResourceFacingServiceSpecification {
  id: string;
  name: string;
  code: string;
  description: string;
  "@type": string;
  "@referredType": string;
  "@baseType": string;
  "@schemaLocation": string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  lifecycleStatus: string;
  serviceLevelSpecification: any[];
  resourceSpecification: ResourceSpecification[];
  specCharacteristic: SpecCharacteristicInterface[];
  entitySpecRelationship: any[];
  relatedParty: any[];
  featureSpecification: any[];
  attachment: any[];
  constraint: any[];
  serviceSpecRelationship: any[];
  isBundle: boolean;
  type?: string;
}

interface Category {
  id: string;
  href: string;
  name: string;
  code: string;
  description: string;
  "@type": string;
  "@baseType": string;
  "@schemaLocation": string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  lifecycleStatus: string;
  productOffering: any[];
  subCategory: any[];
  parent: any;
  parentId: string | null;
  isRoot: boolean;
  type?: any;
}

interface SimpleProductOffering {
  id: string;
  name: string;
  code: string;
  description: string;
  "@type": string;
  "@baseType": string;
  "@schemaLocation": string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  lifecycleStatus: string;
  isBundle: boolean;
  isSellable: boolean;
  statusReason: string;
  place: any[];
  serviceLevelAgreement: any;
  productSpecification: ProductSpecification;
  prodSpecId: string;
  channel: any[];
  serviceCandidate: any;
  category: any[];
  resourceCandidate: any;
  productOfferingTerm: Terms[];
  productOfferingPrice: any[];
  agreement: any[];
  attachment: any[];
  marketSegment: any[];
  bundledProductOffering: any[];
  productOfferingRelationship: ProductOfferingRelationship[];
  productOfferingCharacteristic: SpecCharacteristicInterface[];
  prodSpecCharValueUse: any[];
  policy: any[];
  allowedAction: any[];
  externalIdentifiers: any[];
  type?: any;
  productFamily?: string;
  productLine?: string;
}

interface ResourceSpecRelationship {
  id: string;
  name: string;
  relationshipType: string;
  href?: string;
  '@type'?: string;
  isShowMore?: boolean;
}

interface RSDetailTab {
  id: string;
  name: string;
  title: string;
  target: string;
  iconClass: string;
}

interface LifecycleStatus {
  id: string;
  name: string;
  key: string;
  nextStatus: string[];
  disabled?: boolean;
}

interface TreeCard {
  key: string;
  id?: string;
  '@type'?: string;
  '@baseType'?: string;
  href?: string;
  title?: string;
  objectName?: string;
  description?: string;
  code?: string;
  children?: TreeCard[];
  isShow?: boolean;
  isRoot?: boolean;
  parentKey?: string;
  expanded?: boolean;
  version?: string;
  characteristics?: any[];
  typeObject: string;
  nodeData?: any[];
  groups?: any[];
}

interface ColumnField {
  field: string;
  column: string;
  key: string;
  hasI18n?: boolean;
  isToggle?: boolean;
  showTooltipBy?: string;
}

interface RSRelationship {
  id: string;
  name: string;
  '@type': string;
}

interface RSAttachment {
  id?: string;
  name: string;
  mimeType: string;
  url: string;
  href?: string;
  '@type'?: string;
  description?: string;
  isShowDetail?: boolean;
  isShowMore?: boolean;
}

interface ServiceSpecRelationship { 
  id: string;
  name: string;
  relationshipType: string;
  href?: string;
  '@type'?: string;
  '@referredType'?: string;
  isShowMore?: boolean;
}

interface CFSAttachment {
  id?: string;
  name: string;
  mimeType: string;
  url: string;
  href?: string;
  '@type'?: string;
  description?: string;
  isShowDetail?: boolean;
  isShowMore?: boolean;
}

interface RFSAttachment {
  id?: string;
  name: string;
  mimeType: string;
  url: string;
  href?: string;
  '@type'?: string;
  description?: string;
  isShowDetail?: boolean;
  isShowMore?: boolean;
}

interface ObjectTypeInterface {
  id: string;
  name: string;
  code: string;
  description: string;
  type: string;
  validFor: {
    startDateTime: any,
    endDateTime: any
  },
  active: boolean,
  status: boolean,
  version: string;
  sections: any[];
  attributes: SpecCharacteristicInterface[];
  attributeRules: any[];
  "@referredType": string;
  "@type": string;
  "@baseType": string;
  "@schemaLocation": string
}

interface SpecCharacteristicInterface {
  name: string;
  code: string;
  id: string;
  description: string;
  valueType: string;
  configurable: boolean;
  validFor: {
    startDateTime: any;
    endDateTime: any
  },
  "@valueSchemaLocation": string;
  minCardinality: number;
  maxCardinality: number;
  isUnique: boolean;
  regex: string;
  extensible: boolean;
  characteristicValueSpecification: any[];
  charSpecRelationship: any[];
  category?: CharacteristicCategory;
  layout?: any[];
  "@type": string;
  "@baseType": string;
  "@schemaLocation": string
}

interface CharacteristicCategory {
  id: string;
  name: string;
  description: string;
  code: string;
  "@type": string;
  "@baseType": string;
}

interface ProductSpecification {
  id: string;
  href: string;
  "@baseType": string;
  "@type": string;
  "@schemaLocation": string;
  name: string;
  code: string;
  productNumber: string;
  description: string;
  isBundle: boolean;
  lastUpdate: string;
  lifecycleStatus: string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;

  attachment: any[];
  relatedParty: any[];
  bundledProductSpecification: any[];
  productSpecCharacteristic: SpecCharacteristicInterface[];
  productSpecificationRelationship: ProductSpecRelationship[];
  serviceSpecification: any[];
  resourceSpecification: any[];
  targetResourceSchema: any;
  policy: any[];
}

interface ProductSpecRelationship {
  id: string;
  name: string;
  relationshipType: string;
  href?: string;
  '@type'?: string;
  '@referredType'?: string;
  isShowMore?: boolean;
}

interface SearchConfig {
  property: any;
  placeholder?: string;
  direction?: string;
  actions?: any[];
}


interface BundleProductOffering {
  id: string;
  href: string;
  "@baseType": string;
  "@type": string;
  "@schemaLocation": string;
  name: string;
  code: string;
  description: string;
  isBundle: boolean;
  lastUpdate: string;
  lifecycleStatus: string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  isSellable: boolean;
  pricingType: string;

  attachment: any[];
  productOfferingCharacteristic: SpecCharacteristicInterface[];
  productOfferingRelationship: ProductOfferingRelationship[];
  category: any[];
  productSpecification: ProductSpecification;
  prodSpecCharValueUse: any[];
  bundledProductOffering: any[];
  productOfferingPrice: any[];
  productOfferingTerm: Terms[];
  channel: any[];
  policy: any[];
  productFamily?: string;
  productLine?: string;
}

interface ProductOfferingRelationship {
  id: string;
  name: string;
  relationshipType: string;
  href?: string;
  '@type'?: string;
  '@referredType'?: string;
  isShowMore?: boolean;
}

interface NewPlace {
  id: string;
  name: string;
  description: string;
  '@type': string;
}

interface POPrice {
  id: string;
  href: string;
  name: string;
  code: string;
  isTemplate: boolean;
  description: string;
  "@baseType": string;
  "@type": string;
  "@schemaLocation": string;
  version: number;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  lastUpdate: string;
  lifecycleStatus: string;
  isBundle: boolean;
  popRelationship: any[];

  prodSpecCharValueUse: any[];
  place: any[];
  policy: any[];
  tax: any[];
  bundledPopRelationship: any[];
  productOfferingTerm: any[];

  percentage: number | null;
  price: Price;
  priceType: string;
  recurringChargePeriodLength: number;
  recurringChargePeriodType: string;
  unitOfMeasure: string;
  isMatrix: boolean;
  matrixCell: any[];
}

interface Price {
  unit: string,
  value: number;
  blockSize?: number;
  overagePrice?: number;
}

interface Terms {
  id: string;
  name: string;
  description: string;
  duration: {
    amount: number | null;
    units: string;
  };
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  '@type': string;
  "@baseType": string;
  "@schemaLocation": string;
  isShowDetail?: boolean;
}

interface Proposal {
  id: string;
  name: string;
  href?: string;
  type: string;
  description: string;
  createdBy: string,
  createdAt: any,
  lifecycleStatus: string;
  processFlowSpecification: any;
  workProject: any;
  isTemplate?: boolean;
  byTemplate?: any;
  groups: ProposalGroupRef[];
  extData?: string;
  '@type': string;
  "@baseType": string;
}

interface ProposalGroupRef {
  id: string;
  name: string;
  code: string;
  href?: string;
  groupType: string;
  description: string;
  state: string;
  conditionCombinationLogic?: string;
  proposalSpecification: ProposalSpecificationRef[];
  subGroup?: ProposalGroupRef[];
  '@type': string;
  "@baseType": string;
}

interface ProposalSpecificationRef {
  id: string;
  name: string;
  code: string;
  href?: string;
  key?: string;
  shortDescription: string;
  description: string;
  serviceSpecification?: any;
  policyCondition?: any;
  productOfferingPrice?: any;
  parent?: any;
  attribute: PropopalAttributeRef[];
  "@type": string;
  '@baseType': string;
  '@schemaLocation': string;
  "@referredType": string;
}

interface PropopalAttributeRef {
  idx: string;
  code: string;
  name?: string;
  valueType?: string;
  pickList?: string;
  attributeValue?: AttributeValue[];
  layout?: AttributeLayout;
  options?: OptionItem[];
  unitOptions?: OptionItem[];
}

interface AttributeValue {
    isDefault: boolean;
    value?: string | number;
    valueFrom?: number;
    valueTo?: number;
    valueType: string;
    unitOfMeasure?: string;
    validFor: any;
    '@type': string;
    '@baseType': string;
}

interface OptionItem {
    key: string | number;
    label?: string;
    value?: string;
}

interface ProposalTreeNode {
  nodeId: string;
  type: string;
  label: string;
  data: any;
  children?: ProposalTreeNode[];
}

interface ProposalNodePath {
  nodeId: string;
  groupType: string;
  groupIds: string[];
  specId?: string | null;
}

interface ProposalGroup {
  id: string;
  name: string;
  code: string;
  href?: string;
  groupType: string;
  state: string;
  description: string;
  proposalSpecification: ProposalSpecification[];
  '@type': string;
  '@baseType': string;
}

interface ProposalSpecification {
  id: string;
  name: string;
  code: string;
  href?: string;
  shortDescription: string;
  description: string;
  serviceSpecification?: any;
  policyCondition?: any;
  productOfferingPrice?: any;
  parent?: any;
  attribute: PropopalSpecificationAttributeRef[];
  "@type": string;
  "@baseType": string;
  isShowDetail?: boolean;
}

interface PropopalSpecificationAttributeRef {
  idx: string;
  code: string;
  name?: string;
  valueType?: string;
  pickList?: string;
  attributeValue?: AttributeValue[];
  options?: OptionItem[];
  unitOptions?: OptionItem[];
  layout: AttributeLayout;
  isShowDetail?: boolean;
}

interface AttributeLayout {
  title?: string;
  dataType?: string;
  ctlType: string;
  extraInfo?: string | extraInfoOptions[];
  unitCtlType?: string;
  unitExtraInfo?: string | extraInfoOptions[];
  validateRules?: string[];
}

interface extraInfoOptions {
  key: string;
  value: string;
}

interface POPriceRef { 
  id: string;
  name: string;
  href?: string;
  '@type'?: string;
}

interface CharacteristicCategoryValue {
    id: string;
    name: string;
    description: string;
    code: string;
    domain: string;
    version: string;
    isRoot: boolean;
    validFor?: ValidFor;
    parent?: Parent;
    characteristicSpecification?: CharacteristicSpecification[];
    "@type": string;
    "@baseType": string;
}

interface Parent {
    id: string;
    name: string;
    "@type": string;
    "@referredType": string;
}

interface CharacteristicSpecification {
  id: string;
  name: string;
  "@type": string;
  "@referredType": string;
}

interface ValidFor {
  startDateTime: Date | null;
  endDateTime: Date | null ;
}

interface SelectOptionType {
  value: string;
  label: string;
}

interface ProcessFlowSpecification {
  id: string;
  name: string;
  code: string;
  domain: string;
  description: string;
  processType: string;
  businessProcess?: string;
  businessProcessInfo?: BusinessProcessInfo;
  version: number | null;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  lifecycleStatus: string;
}

interface BusinessProcessInfo {
  id?: string;
  name?: string;
  key?: string;
  fileId: string;
  deployed: boolean;
}

interface FeatureSpecRelationship {
  id: string;
  name: string;
  relationshipType: string;
  href?: string;
  '@type'?: string;
  isShowMore?: boolean;
}

interface Characteristic {
  "@baseType": string;
  "@schemaLocation": string;
  "@type": string;
  "@valueSchemaLocation": string;
  id: string;
  name: string;
  code: string;
  characteristicCategory: string;
  description: string;
  valueType: string;
  pickList: string;
  configurable: boolean;
  validFor: ValidFor;
  minCardinality?: number;
  maxCardinality?: number;
  isUnique: boolean;
  regex: string;
  extensible: boolean;
  characteristicValueSpecification: any[];
  layout: any;
  pickListId: string;
  categoryId?: string;
}

interface PickList {
  id: string;
  name: string;
  code: string;
  description: string;
  version: string;
  dataType: string;
  active: boolean;
  validFor: ValidFor;
  items: PickListItem[];
  "@type": string;
  "@baseType": string;
}

interface PickListItem {
  id: string;
  code: string;
  valueType: string;
  unitOfMeasure: string;
  value: any;
  isDefault: boolean;
  validFor: ValidFor;
  "@type": string;
  "@baseType": string;
  isShowDetail?: boolean;
}
interface CharacteristicCategory {
  id: string;
  name: string;
  description: string;
  "@type": string;
  "@baseType": string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  version: number;
  lifecycleStatus: string;
  characteristicSub: any[];
  domain: string;
  domainType: string;
  parent: any;
  isRoot: boolean;
  type?: any;
  attachment: any[];
  productOfferingCharacteristic: SpecCharacteristicInterface[];
  productOfferingRelationship: ProductOfferingRelationship[];
  category: any[];
  productSpecification: ProductSpecification;
  prodSpecCharValueUse: any[];
  bundledProductOffering: any[];
  productOfferingPrice: any[];
  productOfferingTerm: Terms[];
}

interface PolicyEvent {
  id: string;
  name: string;
  type: string;
  description: string;
  createdBy: string,
  createdAt: any,
  lifecycleStatus: string;
  groups: ProposalGroupRef[];
  '@type': string;
  "@baseType": string;
}

interface CharacteristicCatalog {
  id: string;
  name: string;
  code: string;
  description: string;
  lifecycleStatus: string;
  version: string;
  validFor: {
    startDateTime: any;
    endDateTime: any;
  };
  attributes: CharacteristicSpecificationRef[];
  "@type": string;
  "@baseType": string;
}

interface CharacteristicSpecificationRef {
  id: string;
  name: string;
  "@type": string;
  "@referredType": string;
}

interface CharacteristicSpecification {
  id: string;
  name: string;
  code: string;
  description: string;
  valueType: string;
  configurable: boolean;
  minCardinality: number;
  maxCardinality: number;
  layout: {
    ctlType: string;
    extraInfo?: string;
  };
  catalog: CharacteristicCatalogRef;
  "@type": string;
}

interface CharacteristicCatalogRef {
  id: string;
  name: string;
  "@type": string;
}

interface PLMActionResponse {
  success: boolean;
  data?: {
    code: string;
    message: string;
    param?: any;
  };
}

interface ProductDesign {
  id: string;
  href: string;
  name: string;
  description: string;
  key: string;
  lead: {
    id: string;
    name: string;
    "@type": string;
  };
  startDate: string;
  status: string;
  workflow: {
    id: string;
    "@type": string;
  };
  issues: {
    id: string;
    name: string;
    "@type": string;
  }[];
}
