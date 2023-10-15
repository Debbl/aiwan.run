const Header = (props: { title: string }) => {
  const { title } = props;

  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default Header;
