export type AriaAttributesRoles = {
  [attribute: string]: {
    global: string;
    typeValue: string;
    values: string | Array<string>;
    defaultValue: string;
  };
};

export type Roles = {
  [role: string]: {
    baseConcept: string | Array<string>;
    attribute: string | Array<string>;
    requiredContextRole: string | Array<string>;
    requiredAria?: string | Array<string>;
    requiredRoles?: string | Array<string>;
    supportedAria?: string | Array<string>;
    supportedRoles?: string | Array<string>;
    implicitValueRoles: Array<Array<string>>;
    requiredOwnedElements: any;
    prohibitedAria?: string | Array<string>;
  };
};

export type Languages = {
  [lang: string]: number;
};
