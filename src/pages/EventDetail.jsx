import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const params = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-grow-meet.vercel.app/events/${params.eventId}`
  );

  return (
    <>
      <Header />
      <main className="container">
        {loading && <p className="mt-4">Loading...</p>}
        {data ? (
          <>
            <div className="mt-3">
              <div className="row">
                {/* EVENT DETAIL */}
                <div className="col-sm-6 pe-2">
                  <h1>{data.title}</h1>
                  <p>
                    Hosted By:
                    <br />
                    <strong>{data.host.name}</strong>
                  </p>
                  <img
                    className="img-fluid rounded"
                    src={data.imgUrl}
                    alt="event img"
                  />
                  <div className="mt-3">
                    <h2>Details</h2>
                    <p className="mt-3">{data.details}</p>
                  </div>
                  <div className="mt-3">
                    <h2>Additional Information</h2>
                    <p className="mt-3">
                      <strong>Dress code: </strong>
                      {data.dressCode}
                    </p>
                    <p className="mt-3">
                      <strong>Age Restriction: </strong>
                      {data.ageRestrictions}
                    </p>
                    <div className="mt-3">
                      <h2 className="p-0 m-0">Event Tags: </h2>
                      {data.tags.map((tag) => (
                        <span
                          className="badge bg-warning text-dark me-2 mt-2"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TIME, VENUE AND SPEAKER */}
                <div className="col-sm-6 ps-2">
                  <div className="m-sm-0 mt-4" id="timeAndVenue">
                    <div className="card">
                      <div className="card-body">
                        <span className="ps-1">
                          <strong>From: </strong>
                          {data.date.split("T")[0]} &#10242;{data.startTime}
                        </span>
                        <br />
                        <span className="ps-1">
                          <strong>To: </strong>
                          {data.date.split("T")[0]} &#10242;{data.endTime}
                        </span>
                      </div>
                      <div className="m-3">
                        <span className="ps-1">
                          <strong>Venue: </strong>
                          {data.venue}
                        </span>
                        <br />
                        <span className="ps-1">
                          <strong>Address: </strong>
                          {data.address}
                        </span>
                      </div>
                      <div className="m-3">
                        <span className="ps-1">
                          <strong>Price: </strong>
                          {data.price == 0 ? "Free" : data.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SPEAKERS */}
                  <div id="speakers" className="mt-4">
                    <h2>Speakers: ({data.speakers.length})</h2>
                    {console.log(data.speakers)}
                    <div className="row">
                      {data.speakers.map((speaker) => (
                        <div className="col-6" key={speaker._id}>
                          <div className="card">
                            <img
                              className="card-img-top"
                              src={speaker.imgUrl}
                              alt="speaker img"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{speaker.name}</h5>
                              <p className="card-text">{speaker.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <div className="row">
                      {data.speakers.map(speaker=>{
                        <div className="col-6" key={speaker._id}>
                          <div className="card">
                            <p>{speaker.name}</p>
                          </div>
                        </div>  
                      })}
                    </div> */}
                    <div className="row">
                      {data.speakers.map((speaker) => {
                        <div className="col-6" key={speaker._id}>
                          <div className="card">
                            <p>{speaker.name}</p>
                          </div>
                        </div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          error && <p>{error}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
