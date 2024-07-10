// Footer.jsx

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Your App Name</p>
      {/* Add any additional footer content here */}
    </footer>
  );
};

const footerStyle = {
  background: "#333",
  color: "#fff",
  // textAlign: 'center', // Removing this line resolves the type error
  padding: "10px",
  left: "0",
  bottom: "0",
  width: "100%",
};

export default Footer;
