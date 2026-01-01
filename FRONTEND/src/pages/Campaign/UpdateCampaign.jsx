import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { FaPen } from "react-icons/fa";
=======
import { FaMapMarkerAlt, FaPen } from "react-icons/fa";
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0

const UpdateCampaign = ({ onEdit }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  const API = "https://srv1168036.hstgr.cloud/api/admin/campaigns";

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
=======
  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://supreme-419p.onrender.com/api/admin/campaigns",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0

      const data = await res.json();

      if (res.ok && data.campaigns) {
        setCampaigns(data.campaigns);
      } else {
        setError(data.message || "Failed to fetch campaigns.");
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

<<<<<<< HEAD
  // 🔥 Show only first 5 items + ...
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length > 5) {
        return value.slice(0, 5).join(", ") + "...";
      }
      return value.join(", ");
    }
    return value || "-";
  };

  return (
    <div className="min-h-screen bg-[#171717] pt-4 px-4 md:px-10 pb-10">
=======
  return (
    <div className="min-h-screen bg-gray-50 pt-4 px-4 md:px-10 pb-10">
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
      <h1 className="text-2xl font-bold mb-6 text-center text-[#E4002B]">
        Edit Campaigns
      </h1>

      {loading ? (
<<<<<<< HEAD
        <p className="text-gray-200 text-center text-lg">Loading campaigns...</p>
      ) : error ? (
        <p className="text-red-500 text-center text-lg">{error}</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="bg-[#EDEDED] shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition 
              h-full flex flex-col justify-between"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">{c.name}</h3>

              <p className="text-gray-700 text-sm mb-2">
                <strong>Client:</strong> {c.client}
              </p>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Type:</strong> {c.type}
                </p>
                <p>
                  <strong>Region(s):</strong> {formatValue(c.regions)}
                </p>
                <p>
                  <strong>State(s):</strong> {formatValue(c.states)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={c.isActive ? "text-green-600" : "text-red-600"}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
=======
        <p className="text-gray-600">Loading campaigns...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {c.name}
              </h3>

              <p className="text-sm text-gray-700 mb-3">{c.client}</p>

              <div className="text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {c.state}
                </p>
                <p>Type: {c.type}</p>
                <p>Region: {c.region}</p>
                <p>Status: {c.isActive ? "Active" : "Inactive"}</p>
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
              </div>

              <button
                onClick={() => onEdit(c._id)}
<<<<<<< HEAD
                className="mt-5 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#E4002B] 
                text-white font-medium hover:bg-[#C3002B] transition"
=======
                className="mt-5 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#E4002B] text-white font-medium hover:bg-[#C3002B] transition"
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
              >
                <FaPen /> Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateCampaign;
