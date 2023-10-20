const Header = (props: { title: string }) => {
  const { title } = props;

  return (
    <>
      <h1 className="mb-6 text-center">{title}</h1>
    </>
  );
};

export default Header;
