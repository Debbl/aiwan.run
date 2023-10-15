import type { SVGProps } from "react";

interface IProps extends SVGProps<SVGSVGElement> {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const Icon = ({ icon: Icon, ..._props }: IProps) => {
  return <Icon {..._props} />;
};

export default Icon;
