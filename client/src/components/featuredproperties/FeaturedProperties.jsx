import "./featuredproperties.styles.css";

const FeaturedProperties = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Aparthotel Stare Miasto</span>
        <span className="fpCity">Madrid</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>

      <div className="fpItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Comfort Suites Airport</span>
        <span className="fpCity">Austin</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>

      <div className="fpItem">
        <img
          src="https://imgs.search.brave.com/jVN5d_ZS7IX3qzp3yTlLRdedvzACSI7QH1mg-z7Hmrg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZi5i/c3RhdGljLmNvbS94/ZGF0YS9pbWFnZXMv/aG90ZWwvbWF4MzAw/LzEyODk5MTM0Ny5q/cGc_az1jZTk3MDE4/NWIzOTRhYTUyYTY0/ZWQ3OWVhZTI4Y2Vi/Mzg5OTRlYWIyNmQ3/Yjk2YTU0NGQ5ZmFl/ZDYxODJiZWNlJm89/JmhwPTE"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Four Seasons Hotel</span>
        <span className="fpCity">Lisbon</span>
        <span className="fpPrice">Starting from $99</span>
        <div className="fpRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>

      <div className="fpItem">
        <img
          src="https://imgs.search.brave.com/_KiqgzW9UFwYkV6L40TAXgdVfeq9QaMi3_kWN4nvyTk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aGVm/aXR0cmF2ZWxsZXIu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE3LzA1L1RoZS1S/ZWdlbnQtU2luZ2Fw/b3JlLUEtRm91ci1T/ZWFzb25zLUhvdGVs/LWZveWVyLTEwLmpw/Zw"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Hilton Garden Inn</span>
        <span className="fpCity">Berlin</span>
        <span className="fpPrice">Starting from $105</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
