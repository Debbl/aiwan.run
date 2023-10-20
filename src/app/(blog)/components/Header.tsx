const Header = (props: { title: string }) => {
  const { title } = props;

  return (
    <>
      <h1 className="text-center mb-6">{title}</h1>
    </>
  );
};

export default Header;
