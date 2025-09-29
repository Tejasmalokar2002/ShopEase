// src/components/MapWithGeolocation.jsx
import React, { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "mySiteLocation";
const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 }; // India center
const LOCATION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function MapWithGeolocation() {
  const [location, setLocation] = useState(null); // {lat, lng}
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  // Read saved location if valid
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.lat && parsed?.lng && parsed?.timestamp) {
          if (Date.now() - parsed.timestamp < LOCATION_TTL_MS) {
            setLocation({ lat: parsed.lat, lng: parsed.lng });
            return;
          }
        }
      }
    } catch (e) {
      console.warn("Could not parse saved location", e);
    }

    // If no valid cached location, check permission
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((p) => {
          setPermissionStatus(p.state);
          if (p.state === "granted") {
            requestBrowserGeolocation();
          } else {
            setShowModal(true);
          }
        })
        .catch(() => setShowModal(true));
    } else {
      setShowModal(true);
    }
  }, []);

  const saveLocationToStorage = useCallback((lat, lng) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lat, lng, timestamp: Date.now() })
    );
  }, []);

  function requestBrowserGeolocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        saveLocationToStorage(coords.lat, coords.lng);
        setLoadingLocation(false);
        setShowModal(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLoadingLocation(false);
        setShowModal(false);
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location permission denied. You can enable it in your browser/site settings."
          );
        } else {
          alert("Unable to retrieve location: " + error.message);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function useDefaultLocation() {
    setLocation(DEFAULT_CENTER);
    saveLocationToStorage(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng);
    setShowModal(false);
  }

  function clearStoredLocation() {
    localStorage.removeItem(STORAGE_KEY);
    setLocation(null);
    setShowModal(true);
  }

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h3>Allow location access?</h3>
            <p>
              To provide localized content (nearest stores, delivery estimates,
              etc.), this site requests access to your location. It is stored
              only in your browser.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={requestBrowserGeolocation} disabled={loadingLocation}>
                {loadingLocation ? "Detecting…" : "Allow location"}
              </button>
              <button onClick={useDefaultLocation}>Use default location</button>
              <button onClick={() => setShowModal(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <strong>Current location:</strong>{" "}
        {location
          ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
          : "none"}
        <button style={{ marginLeft: 12 }} onClick={clearStoredLocation}>
          Change / Clear
        </button>
      </div>
    </div>
  );
}

// Styles
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.35)",
  zIndex: 1000,
};
const modalStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 420,
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
};
