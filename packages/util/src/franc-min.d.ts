/**
 * Stop-gap typings for franc-min. Versions prior to 6.0.0 don't seem to have
 * typings, and 6.0.0 onwards is ESM-only, which we aren't ready for, yet.
 */
declare module 'franc-min' {
  export type Options = {
    /**
     * Languages to allow.
     */
    only?: Array<string>;
    /**
     * Languages to ignore.
     */
    ignore?: Array<string>;
    /**
     * Minimum length to accept.
     */
    minLength?: number;
  };

  function franc(value?: string | undefined, options?: Options | undefined): any | undefined;
}
