export type CSSProperty = {
  name: string;
  value: string;
  important: boolean;
  location: string;
  pointer: string;
};

export type PseudoSelectorProperty = {
  [property: string]: CSSProperty;
};

export type MediaProperty = {
  [property: string]: CSSProperty | PseudoSelectorProperty;
};

export type MediaProperties = {
  [media: string]: MediaProperty | PseudoSelectorProperty;
};

export type CSSProperties = {
  media: MediaProperties;
  [property: string]: CSSProperty | MediaProperties | PseudoSelectorProperty;
};
