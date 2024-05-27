function Footer() {
  return <footer className="fw-lighter d-flex flex-column" style={{fontSize: "0.75rem"}}>
    <hr className="border border-danger"/>
    <div className="d-flex gap-3">
      <div>Desenvolvido por Erik ©2024 </div>
      <div>
        <span> Repositórios: </span>
        <a href="https://github.com/erik-ymmt/multi-search-back" target="_blank" className="link-secondary">Backend</a>
        <span> | </span>
        <a href="https://github.com/erik-ymmt/multi-search-front" target="_blank" className="link-secondary">Frontend</a>
      </div>
    </div>
  </footer>
}

export default Footer;
