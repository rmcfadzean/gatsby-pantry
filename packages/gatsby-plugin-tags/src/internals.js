import { join, remove, trim, isEmpty } from "lodash";

const pathify = (...args) => {
  const parsedArgs = remove(args.map(arg => trim(arg, "/")), a => !isEmpty(a));
  return `/${join(parsedArgs, "/")}/`;
};

export { pathify };
