//
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footers/Footer";

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; // loader চললে true হবে

  return (
    <div className="min-h-screen flex flex-col">
      {/* ন্যাভবার */}
      <Navbar />

      {/* গ্লোবাল লোডিং ওভারলে */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      )}

      {/* মূল কনটেন্ট */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ফুটার */}
      <Footer />
    </div>
  );
};

export default Layout;
