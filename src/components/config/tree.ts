import { shallowRef } from "vue";
import IconIsaxBox11 from "../icon/IconIsaxBox11.vue";
import IconMobile from "../icon/IconMobile.vue";
import { RelationshipTypeEnum, SchemaLocationEnum, TypeEnum } from "./enum";

const createTreeObject = (
  key: string,
  iconComponent: any,
  iconText: string,
  children: any[] = [],
  hasNotAction: boolean = false,
  manualConfigParams: any[] = []
) => ({
  key,
  iconComponent: typeof iconComponent === 'string' ? iconComponent : shallowRef(iconComponent),
  iconText,
  children,
  hasNotAction,
  manualConfigParams
});

export const PROPERTIES_CONFIG: any = {
  //min <= default <= max
  numberRelOfferLowerLimit: {
    label: "number-min",
    value: null,
    typeValue: "number",
    acronym: 'Lower',
    validate: [
      {
        with: 'numberRelOfferDefault',
        operator: 'lte',
        acronym: 'Default'
      },
      {
        with: 'numberRelOfferUpperLimit',
        operator: 'lte',
        acronym: 'Upper'
      }
    ]
  },
  numberRelOfferDefault: {
    label: "number-default",
    value: null,
    typeValue: "number",
    acronym: 'Default',
    validate: [
      {
        with: 'numberRelOfferLowerLimit',
        operator: 'gte',
        acronym: 'Lower'
      },
      {
        with: 'numberRelOfferUpperLimit',
        operator: 'lte',
        acronym: 'Upper'
      }
    ]
  },
  numberRelOfferUpperLimit: {
    label: "number-max",
    value: null,
    typeValue: "number",
    acronym: 'Upper',
    validate: [
      {
        with: 'numberRelOfferDefault',
        operator: 'gte',
        acronym: 'Default'
      },
      {
        with: 'numberRelOfferLowerLimit',
        operator: 'gte',
        acronym: 'Lower'
      }
    ]
  }
}

export const mapTreeObjects = {
  LogicalResourceSpecification: createTreeObject(
    "resource-spec",
    IconMobile,
    "RS",
    [],
    true
  ),
  PhysicalResourceSpecification: createTreeObject(
    "resource-spec",
    IconMobile,
    "RS",
    [],
    true
  ),
  CustomerFacingServiceSpecification: createTreeObject(
    "customer-fs",
    IconIsaxBox11,
    "CFSS",
    [
      {
        ResourceFacingServiceSpecification: {
          property: "serviceSpecRelationship",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@baseType': TypeEnum.SERVICE_SPEC,
            '@type': TypeEnum.SERVICE_SPEC_RELATIONSHIP, 
            '@schemaLocation': SchemaLocationEnum.SERVICE_SPEC_RELATIONSHIP,
            relationshipType: RelationshipTypeEnum.REQUIRES
          },
          filters: [
            { key: '@referredType', value: TypeEnum.RFS_SPEC },
            { key: 'relationshipType', value: RelationshipTypeEnum.REQUIRES }
          ]
        },
      }
    ]
  ),
  ResourceFacingServiceSpecification: createTreeObject(
    "resource-fs",
    IconIsaxBox11,
    "RFSS",
    [
      {
        LogicalResourceSpecification: {
          property: "resourceSpecification",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@type': TypeEnum.RESOURCE_SPEC_REF, 
            '@schemaLocation': SchemaLocationEnum.RESOURCE_SPEC_REF 
          }
        },
      },
      {
        PhysicalResourceSpecification: {
          property: "resourceSpecification",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@type': TypeEnum.RESOURCE_SPEC_REF, 
            '@schemaLocation': SchemaLocationEnum.RESOURCE_SPEC_REF 
          }
        },
      },
    ]
  ),
  ProductSpecification: createTreeObject(
    "product-spec",
    'pi pi-file-text',
    "PS",
    [
      {
        LogicalResourceSpecification: {
          property: "resourceSpecification",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@type': TypeEnum.RESOURCE_SPEC_REF, 
            '@schemaLocation': SchemaLocationEnum.RESOURCE_SPEC_REF 
          }
        },
      },
      {
        PhysicalResourceSpecification: {
          property: "resourceSpecification",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@type': TypeEnum.RESOURCE_SPEC_REF, 
            '@schemaLocation': SchemaLocationEnum.RESOURCE_SPEC_REF 
          }
        },
      },
      {
        CustomerFacingServiceSpecification: {
          property: "serviceSpecification",
          params: 
          { 
            id: null, name: null, '@referredType': null, href: null,
            '@type': TypeEnum.SERVICE_SPEC_REF, 
            '@schemaLocation': SchemaLocationEnum.SERVICE_SPEC_REF
          }
        },
      },
    ]
  ),
  Category: createTreeObject(
      "category",
      "pi pi-clone",
      "C",
      [
        {
          Category: {
            property: "subCategory",
            params: {
                id: null, name: null, '@referredType': null, href: null,
                '@type': TypeEnum.CATE_REF,
                '@schemaLocation': SchemaLocationEnum.CATE_REF
            }
          },
        },
      ]
  ),
  SimpleProductOffering: createTreeObject(
    "simple-po",
    IconIsaxBox11,
    "SPO",
    [
      {
        ProductSpecification: {
          property: "productSpecification",
          params: {
            id: null, name: null, href: null,
            '@referredType': TypeEnum.PRODUCT_SPEC,
            '@type': TypeEnum.PRODUCT_SPEC,
            '@schemaLocation': SchemaLocationEnum.PRODUCT_SPEC
          }
        }
      }
    ],
    true,
    [
      {
        bundledProductOffering: {
          label: "Option",
          attribute: "bundledProductOfferingOption",
          properties: PROPERTIES_CONFIG
        }
      }
    ]
  ),
  BundleProductOffering: createTreeObject(
    "bundle-po",
    IconIsaxBox11,
    "BPO",
    [
      {
        ProductSpecification: {
          property: "productSpecification",
          params: {
            id: null, name: null, href: null,
            '@type': TypeEnum.PRODUCT_SPEC_REF,
          },
          hasNotChange: true
        }
      },
      {
        SimpleProductOffering: {
          property: "bundledProductOffering",
          params: {
            id: null, name: null, href: null,
            '@baseType': TypeEnum.PRODUCT_OFFERING,
            '@referredType': TypeEnum.SIMPLE_PO,
            '@type': TypeEnum.BUNDLED_PO,
            '@schemaLocation': SchemaLocationEnum.BUNDLED_PRODUCT_OFFERING,
            'bundledProductOfferingOption': {
              "@type": TypeEnum.BUNDLED_PO_OPTION,
              "@baseType": TypeEnum.BUNDLED_PO_OPTION,
              numberRelOfferDefault: null,
              numberRelOfferLowerLimit: null,
              numberRelOfferUpperLimit: null
            }
          }
        },
      },
      {
        BundleProductOffering: {
          property: "bundledProductOffering",
          params: {
            id: null, name: null, href: null,
            '@baseType': TypeEnum.PRODUCT_OFFERING,
            '@referredType': TypeEnum.BUNDLE_PO,
            '@type': TypeEnum.BUNDLED_PO,
            '@schemaLocation': SchemaLocationEnum.BUNDLED_PRODUCT_OFFERING,
            'bundledProductOfferingOption': {
              "@type": TypeEnum.BUNDLED_PO_OPTION,
              "@baseType": TypeEnum.BUNDLED_PO_OPTION,
              numberRelOfferDefault: null,
              numberRelOfferLowerLimit: null,
              numberRelOfferUpperLimit: null
            }
          }
        }
      },
      {
        BundledGroupProductOffering: {
          property: "bundledGroupProductOffering",
          params: {
            id: null, name: null, '@type': null, '@baseType': null, '@schemaLocation': null, href: null,
            bundledGroupProductOfferingOption: {
              "@type": TypeEnum.BUNDLED_GROUP_PO_OPTION,
              "@baseType": TypeEnum.BUNDLED_GROUP_PO_OPTION,
              numberRelOfferLowerLimit: null,
              numberRelOfferUpperLimit: null
            },
            bundledProductOffering: null
          }
        }
      }
    ],
    false,
    [
      {
        bundledProductOffering: {
          label: "Option",
          attribute: "bundledProductOfferingOption",
          properties: PROPERTIES_CONFIG
        }
      }
    ]
  ),
  BundledGroupProductOffering: createTreeObject(
    "bundled-group-po",
    "pi pi-th-large",
    "BGO",
    [
      {
        SimpleProductOffering: {
          property: "bundledProductOffering",
          params: {
            id: null, name: null, href: null,
            '@baseType': TypeEnum.PRODUCT_OFFERING,
            '@referredType': TypeEnum.SIMPLE_PO,
            '@type': TypeEnum.BUNDLED_PO,
            '@schemaLocation': SchemaLocationEnum.BUNDLED_PRODUCT_OFFERING,
            'bundledProductOfferingOption': {
              "@type": TypeEnum.BUNDLED_PO_OPTION,
              "@baseType": TypeEnum.BUNDLED_PO_OPTION,
              numberRelOfferDefault: null,
              numberRelOfferLowerLimit: null,
              numberRelOfferUpperLimit: null
            }
          }
        },
      },
      {
        BundleProductOffering: {
          property: "bundledProductOffering",
          params: {
            id: null, name: null, href: null,
            '@baseType': TypeEnum.PRODUCT_OFFERING,
            '@referredType': TypeEnum.BUNDLE_PO,
            '@type': TypeEnum.BUNDLED_PO,
            '@schemaLocation': SchemaLocationEnum.BUNDLED_PRODUCT_OFFERING,
            'bundledProductOfferingOption': {
              "@type": TypeEnum.BUNDLED_PO_OPTION,
              "@baseType": TypeEnum.BUNDLED_PO_OPTION,
              numberRelOfferDefault: null,
              numberRelOfferLowerLimit: null,
              numberRelOfferUpperLimit: null
            }
          }
        }
      }
    ],
    true,
    [
      {
        bundledGroupProductOffering: {
          label: "Option",
          attribute: "bundledGroupProductOfferingOption",
          properties: {
            //min <= max
            numberRelOfferLowerLimit: {
              label: "number-min",
              value: null,
              typeValue: "number",
              acronym: 'Lower',
              isRequired: true,
              validate: [
                {
                  with: 'numberRelOfferUpperLimit',
                  operator: 'lte',
                  acronym: 'Upper'
                }
              ]
            },
            numberRelOfferUpperLimit: {
              label: "number-max",
              value: null,
              typeValue: "number",
              acronym: 'Upper',
              isRequired: true,
              validate: [
                {
                  with: 'numberRelOfferLowerLimit',
                  operator: 'gte',
                  acronym: 'Lower'
                }
              ]
            }
          }
        }
      }
    ]
  ),
  ProductOfferingPrice: createTreeObject(
    "po-price",
    IconIsaxBox11,
    "POP",
    [],
    true
  ),
  ProductOfferingPriceMatrix: createTreeObject(
    "po-price",
    IconIsaxBox11,
    "POPM",
    [],
    true
  ),
};