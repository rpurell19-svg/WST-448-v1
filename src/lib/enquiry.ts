/**
 * Enquiry shape and validation, shared by the form and the API route so the
 * browser and the server can never disagree about what is valid.
 */

import { budgetRanges, projectTypes } from "@/data/company";

export type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "projectType"
  | "budget"
  | "message";

export type Enquiry = Record<EnquiryField, string>;

export const emptyEnquiry: Enquiry = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

/**
 * South African numbers, written the many ways people actually write them:
 * 082 526 9192, 0825269192, +27 82 526 9192, 0027825269192.
 * Also tolerates other international numbers so overseas clients aren't blocked.
 */
const PHONE = /^(?:\+|00)?[0-9][0-9\s().-]{7,18}[0-9]$/;

/** Deliberately permissive — the goal is to catch typos, not police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type Errors = Partial<Record<EnquiryField, string>>;

export function validateEnquiry(values: Enquiry): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (!PHONE.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number, e.g. 082 526 9192.";
  }

  if (!values.projectType) {
    errors.projectType = "Please choose the type of project.";
  } else if (!projectTypes.includes(values.projectType)) {
    errors.projectType = "Please choose an option from the list.";
  }

  if (values.budget && !budgetRanges.includes(values.budget)) {
    errors.budget = "Please choose an option from the list.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a little about your project.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail — at least a sentence.";
  }

  return errors;
}

export const SUCCESS_MESSAGE =
  "Thank you. Your enquiry has been received. We'll be in touch soon.";
