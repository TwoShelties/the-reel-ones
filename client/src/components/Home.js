import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import ImageSlider from "./ImageSlider";
import Profile from "./Profile";

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();
  const slides = [
    {
      url: "https://cms-assets.theasc.com/The-Godfather-Featured.jpg?mtime=20180712152103",
      title: "the-godfather-wedding",
    },
    {
      url: "https://shots.filmschoolrejects.com/wp-content/uploads/2015/07/apocalyopsenow-1024x435.jpg",
      title: "apocalypse-now-diving",
    },
    {
      url: "https://filmschoolrejects.com/wp-content/uploads/2019/11/raging-bull-1.jpg",
      title: "raging-bull-fight-1",
    },
    {
      url: "https://pbblogassets.s3.amazonaws.com/uploads/2017/01/15145245/KANE-COVER-NEW.jpg",
      title: "citizen-kane-newspapers",
    },
    {
      url: "https://prod-images.tcm.com/Master-Profile-Images/casablanca1942.610.jpg?w=1216",
      title: "casablanca-embrace",
    },
    {
      url: "https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/great-movie-city-lights-1931/city-lights-image-7.jpg",
      title: "city-lights-chaplin",
    },
    {
      url: "https://www.indiewire.com/wp-content/uploads/2016/12/llfinkgfb4zvocxr1ezl.png?resize=600,338",
      title: "luke-tattooine",
    },
    {
      url: "https://deadline.com/wp-content/uploads/2018/08/taxidriver.png",
      title: "travis-bickle-mohawk",
    },
    {
      url: "https://movies.universalpictures.com/media/mobile-header-banner-5bf36da191eac-1-5d3788ce171d5-1.jpg",
      title: "schindlers-list-girl",
    },
    {
      url: "https://d23.com/app/uploads/2015/12/1180w-600h_magical-moment-toy-story-1024x521.jpg",
      title: "woody-buzz-flying",
    },
    {
      url: "https://sheldonschoolharrietmoore2.files.wordpress.com/2015/11/2.jpg",
      title: "pulp-fiction-aiming",
    },
    {
      url: "https://www.wearethemighty.com/app/uploads/legacy/assets.rbl.ms/17318563/origin.png",
      title: "sgt-elias-death",
    },
    {
      url: "https://www.history.com/.image/ar_215:100%2Cc_fill%2Ccs_srgb%2Cg_faces:center%2Cq_auto:good%2Cw_1280/MTU3OTIzNTc5MDc2MjkwMTk0/psycho039s-shower-scene-how-hitchcock-upped-the-terrorand-fooled-the-censorss-featured-photo.webp",
      title: "psycho-shower",
    },
    {
      url: "https://ychef.files.bbci.co.uk/1280x720/p0639ffn.webp",
      title: "2001-space-odyssey-hallway",
    },
    {
      url: "https://www.independent.ie/migration_catalog/d2d97/25303377.ece/AUTOCROP/w1240/ET",
      title: "et-bicycle",
    },
  ];

  const containerStyles = {
    width: "100%",
    height: "100vh",
    margin: "0 auto",
  };

  const logoutHandler = () => {
    console.log(
      "Removing token from local storage, and setting token to empty string..."
    );
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  if (token) {
    navigate("/profile");
  }

  return (
    <div>
      {!token ? (
        <div className="nav-header">
          <div className="nav-banner">
            <p className="banner-tagline">
              <span className="new-span">NEW!</span> Films now start at{" "}
              <span className="price-span">$0.99</span>.{" "}
              <span
                className="learn-more-span"
                onClick={() => {
                  navigate("/films");
                }}
              >
                Our Films &#x27A4;
              </span>
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div>
        <div style={containerStyles} className="content-container">
          {/* <p id="tagline">
          Nothing but the best films, according a squad of 90 year old film
          critics at the{" "}
          <a href="https://www.afi.com/">American Film Institute</a>.
        </p> */}
          <ImageSlider slides={slides} />

          {/* <h3>Why The Reel Ones?</h3> */}
          {/* <p>
          The classics may be generations older than you, but they're classics
          for a reason. Really smart people have spent years thinking about
          these films and have compiled a list of the best films ever made. And
          we've got 'em all, right here in one spot.
        </p>
        <h3>The problem?</h3>
        <p>
          No one uses DVDs, people don't know how to work VCRs, and Blockbuster
          went out of business decades ago. So how does one watch these archaic
          films?
        </p>
        <h3>The solution</h3>
        <p>
          Everyone knows how to stream content. You rent streamable films for
          one to seven days. No returns to the Blockbuster drop-box.
        </p>
        <h3>At what cost?</h3>
        <p>
          Our content is affordable. Per day, our rentals cost the same as a
          candy bar, or a wooden ruler from Staples. Prices range from $1-$1.99
          per day. If you can't afford at most $2 to watch the greatest films of
          all time, then we recommend a financial consultant.
        </p>
        <h3>Getting Started</h3>
        <p>
          As the person writing this code I personally recommend you start with{" "}
          <Link to="/films/2">The Godfather</Link> or{" "}
          <Link to="/films/24">Apocalypse Now</Link>. Both are incredible.{" "}
          <Link to="/films/46">Taxi Driver</Link> ain't bad either...
        </p> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
