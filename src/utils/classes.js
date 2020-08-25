export default function classNames(classNames='', conditionalClassNames={}) {
  return `${classNames} `.concat(Object.keys(conditionalClassNames).filter((key) => {
    return conditionalClassNames[key];
  }).join(' '));
}
