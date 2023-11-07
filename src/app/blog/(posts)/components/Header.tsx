import { format } from "~/utils/time";

interface IProps {
  title: string;
  description: string;
  date: string;
  duration: number;
}
const Header = (props: IProps) => {
  const { title, description, date, duration } = props;
  const time = new Date(date);

  const dateStr = format(time, "yyyy-MM-dd");

  return (
    <header className="text-center">
      <h1 className="text-6xl">{title}</h1>
      <h3 className="text-gray-400">{description}</h3>
      <div>
        <span>{dateStr}</span>
        <span>{" · "}</span>
        <span>{`${duration}min`}</span>
      </div>
    </header>
  );
};

export default Header;
