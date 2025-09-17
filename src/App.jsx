import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import useFetch from "./hooks/useFetch.jsx";
import { Link } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function Home({ search }) {
  const [eventType, setEventType] = useState("both");
  const { data, loading, error } = useFetch(
    "https://backend-grow-meet.vercel.app/events"
  );

  // function filterDataBySearch(data) {
  //   const searchFilteredData =
  //     search == ""
  //       ? typeFilteredData
  //       : typeFilteredData.filter(
  //           (event) =>
  //             event.title
  //               .toLowerCase()
  //               .split(" ")
  //               .includes(search.toLowerCase()) ||
  //             event.tags.includes(search.toLowerCase())
  //         );
  // }

  function renderData() {
    const typeFilteredData =
      eventType === "both"
        ? data
        : data.filter((event) => event.type == eventType);

    const q = search.trim().toLowerCase();
    console.log(q);
    const searchFilteredData =
      q == ""
        ? typeFilteredData
        : typeFilteredData.filter((event) => {
            const title = event.title.toLowerCase();
            const tags = event.tags
              .map((tag) => tag.toLowerCase())
              .filter((tag) => tag.includes(q));
            return title.includes(q) || tags.length > 0;

            // event.title
            //   .toLowerCase()
            //   .split(" ")
            //   .includes(search.toLowerCase()) ||
            //   event.tags.includes(search.toLowerCase());
          });
    // const testFilteredData = typeFilteredData.filter((event) => {
    //   const tags = event.tags
    //     .map((tag) => tag.toLowerCase())
    //     .filter((tag) => tag.includes(q));
    //   return tags.length > 1;
    // });
    // console.log(testFilteredData);

    return searchFilteredData.map((event) => (
      <Link
        to={`/eventDetail/${event._id}`}
        className="col-md-4 col-sm-6 mt-4 px-3 text-light text-decoration-none"
        key={event._id}
      >
        <div className="card postition-relative">
          <img className="card-img" src={event.imgUrl} alt="event img" />
          <span class="badge bg-light text-dark position-absolute m-2 shadow-sm">
            {event.type == "online" ? "Online Event" : "Offline Event"}
          </span>
        </div>
        <small className="text-body-secondary">
          {event.date.split("T")[0]} &#10242;{event.startTime}
        </small>
        <h3>{event.title}</h3>
      </Link>
    ));
  }

  return (
    <>
      <div className="d-flex justify-content-between mt-4">
        <h1>Meetup Events</h1>
        <div className="col-4">
          <select
            className="form-select"
            name="eventTypeFilter"
            id="eventTypeFilter"
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="both">Select Event Type</option>
            <option value="both">Both</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
      {loading && <p className="mt-4">Loading...</p>}
      {data ? (
        <>
          <div className="row">{renderData()}</div>
        </>
      ) : (
        error && <p>{error}</p>
      )}
    </>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Header search={search} setSearch={setSearch} searchBox={true} />
      <main className="container mt-3">
        <Home search={search} />
      </main>
      <Footer />
    </>
  );
}
