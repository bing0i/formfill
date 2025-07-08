export type FormData = {
  firstName: string;
  email: string;
};

export type Errors = { firstName?: string; email?: string };

export type Touched = { [k: string]: boolean };
