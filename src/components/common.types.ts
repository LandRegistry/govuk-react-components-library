// Shared prop-shape building blocks used across multiple components' *.types
// files, so a single edit here fixes them everywhere instead of hunting down
// N inline copies of the same shape.

/**
 * The `formGroup` prop accepted by form-field components (Input, Textarea,
 * Select, Boolean, DateInput, PasswordInput, FileUpload). Only `className`
 * is ever read by any of them - it's applied to the wrapping
 * `govuk-form-group` div, nothing else is spread from it - so unlike props
 * that genuinely forward arbitrary HTML attributes, this has no catch-all.
 */
export interface FormGroupProps {
  className?: string;
}
