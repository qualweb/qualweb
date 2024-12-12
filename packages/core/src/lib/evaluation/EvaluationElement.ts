export type EvaluationElement = {
  pointer?: string;
  htmlCode?: string;
  accessibleName?: string;
  attributes?: string | string[];
  cssCode?: string;
  property?: {
    name?: string;
    value?: string;
  };
  stylesheetFile?: string;
  additional?: {
    [key: string]: string | number | boolean;
  };
};