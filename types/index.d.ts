declare module '*.module.css' {
  const css: { [className: string]: string };
  export default css;
}

declare module '*.module.scss' {
  const scss: { [className: string]: string };
  export default scss;
}

declare module '*.mdx' {
  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
