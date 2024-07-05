import Body from "./body";
import Footer from "./footer";
import Header from "./header";

const FirstSection = () => {
  return (
    <div className="flex flex-col space-between h-full">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default FirstSection;
