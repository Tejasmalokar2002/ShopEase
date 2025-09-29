import React, { useEffect, useState } from "react";
import FbIcon from "../common/FbIcon";
import InstaIcon from "../common/InstaIcon";

const STORAGE_KEY = "mySiteLocation";

const Footer = ({ content }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.lat && parsed?.lng) {
        // Reverse geocode using OpenStreetMap API
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${parsed.lat}&lon=${parsed.lng}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.address) {
              const { city, town, village, state, country } = data.address;
              const loc =
                `${city || town || village || ""}, ${state || ""}, ${country || ""}`.replace(
                  /^, |, $/g,
                  ""
                ); // cleanup commas
              setUserLocation(loc);
            }
          })
          .catch((err) => console.error("Reverse geocode failed:", err));
      }
    }
  }, []);

  return (
    <div className="bg-black text-white py-8">
      <div className="flex justify-around">
        {content?.items &&
          content?.items?.map((item, index) => {
            // Override Location description dynamically
            const isLocationSection =
              item?.title?.toLowerCase() === "location";

            return (
              <div key={index} className="flex flex-col">
                <p className="text-[16px] pb-[10px]">{item?.title}</p>

                {item?.list &&
                  item?.list?.map((listItem, idx) => (
                    <a
                      key={idx}
                      className="flex flex-col text-[12px] py-2"
                      href={listItem?.path}
                    >
                      {listItem?.label}
                    </a>
                  ))}

                {isLocationSection ? (
                  <p>{userLocation || item?.description}</p>
                ) : (
                  item?.description && <p>{item?.description}</p>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex gap-2 items-center justify-center py-4">
        <a href="/fb">
          <FbIcon />
        </a>
        <a href="/insta">
          <InstaIcon />
        </a>
      </div>

      <p className="text-sm text-white text-center">{content?.copyright}</p>
    </div>
  );
};

export default Footer;
