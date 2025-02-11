function NotFound() {
  const backgroundStyle = {
    backgroundImage: `url("/404_page.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "90vh",
    width: "100%",
    color: "white",
  };

  return (
    <main style={backgroundStyle}>
      <h1 style={{ paddingTop: "10%", textAlign: "center" }}>Oops</h1>
      <a href="/" style={{ display: "block", textAlign: "center", color: "lightblue", marginTop: "20px" }}>
        Go back to Home
      </a>
    </main>
  );
}

export default NotFound;
