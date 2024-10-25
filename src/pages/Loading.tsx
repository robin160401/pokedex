export const Loading = () => {
  return (
    <section className="loading">
      <img
        src="/public/pokeapi_logo.svg"
        alt=""
        className="loading__logo fade-in"
      />
      <img
        src="/public/PokeballLogo.svg"
        alt=""
        className="loading__pokeball bounce-in-top"
      />
    </section>
  );
};
