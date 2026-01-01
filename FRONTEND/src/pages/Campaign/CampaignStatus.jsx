import React, { useEffect, useState } from "react";
import Select from "react-select";

const CampaignStatus = ({ onViewCampaign }) => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

<<<<<<< HEAD
  const [status, setStatus] = useState("active");

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length > 5) {
        return value.slice(0, 5).join(", ") + "...";
      }
      return value.join(", ");
    }
    return value || "-";
  };
=======
  const [status, setStatus] = useState("active");   // ✅ default
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem("token");
<<<<<<< HEAD
      const res = await fetch("https://srv1168036.hstgr.cloud/api/admin/campaigns", {
=======
      const res = await fetch("https://supreme-419p.onrender.com/api/admin/campaigns", {
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
<<<<<<< HEAD
      if (res.ok) {
        const campaigns = data.campaigns || [];
        setAllCampaigns(campaigns);

        // Show only active campaigns initially
        setFilteredCampaigns(campaigns.filter((c) => c.isActive === true));
=======

      if (res.ok) {
        setAllCampaigns(data.campaigns || []);
        setFilteredCampaigns([]); // empty initially
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
      }
    } catch (err) {
      console.log("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

<<<<<<< HEAD
  const applyFilters = () => {
    let filtered = [...allCampaigns];
=======
  // ✅ Apply filters
  const applyFilters = () => {
    let filtered = [...allCampaigns];

    // Status filter
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
    if (status !== "all") {
      filtered = filtered.filter((c) =>
        status === "active" ? c.isActive === true : c.isActive === false
      );
    }
<<<<<<< HEAD
=======

>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
    setFilteredCampaigns(filtered);
  };

  const resetFilters = () => {
    setStatus("active");
    setFilteredCampaigns([]);
  };

  return (
<<<<<<< HEAD
    <div className="p-6 min-h-screen bg-[#171717]">
      <h2 className="text-2xl font-bold text-[#E4002B] mb-6 text-center">
=======
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#E4002B] mb-4">
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        Campaign Status
      </h2>

      {/* Filters */}
<<<<<<< HEAD
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
=======
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* ✅ Status Dropdown */}
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        <Select
          value={{
            value: status,
            label:
              status === "active"
                ? "Activated"
                : status === "inactive"
<<<<<<< HEAD
                  ? "Deactivated"
                  : "All",
=======
                ? "Deactivated"
                : "All",
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
          }}
          onChange={(e) => setStatus(e.value)}
          options={[
            { label: "Activated", value: "active" },
            { label: "Deactivated", value: "inactive" },
            { label: "All", value: "all" },
          ]}
<<<<<<< HEAD
          className="w-48"
          isSearchable
        />

        <button
          onClick={applyFilters}
          className="bg-[#E4002B] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#C3002B] transition"
=======
          className="w-44"
          isSearchable
        />

        {/* Search Button */}
        <button
          onClick={applyFilters}
          className="bg-[#E4002B] text-white px-4 py-2 rounded-md"
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        >
          Search
        </button>

<<<<<<< HEAD
        <button
          onClick={resetFilters}
          className="text-red-600 font-semibold hover:underline"
=======
        {/* Reset */}
        <button
          onClick={resetFilters}
          className="text-red-600 font-semibold"
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        >
          Reset
        </button>
      </div>

<<<<<<< HEAD
      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((c) => (
          <div
            key={c._id}
            className="bg-[#EDEDED] shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition 
            h-full flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900">{c.name}</h3>
              <p className="text-sm text-gray-700"><strong>Client:</strong> {c.client}</p>
              <p className="text-sm text-gray-700"><strong>Regions:</strong> {formatValue(c.regions)}</p>
              <p className="text-sm text-gray-700"><strong>States:</strong> {formatValue(c.states)}</p>

              <p className={`text-sm font-semibold mt-2 ${c.isActive ? "text-green-600" : "text-red-600"
                }`}>
=======
      {/* ✅ Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((c) => (
          <div
            key={c._id}
            className="border border-gray-300 bg-white rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-600">Client: {c.client}</p>
              <p className="text-sm text-gray-600">Region: {c.region}</p>
              <p className="text-sm text-gray-600">State: {c.state}</p>

              <p
                className={`mt-2 text-sm font-semibold ${
                  c.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
                Status: {c.isActive ? "Active" : "Inactive"}
              </p>
            </div>

<<<<<<< HEAD
            <button
              className="mt-5 bg-[#E4002B] text-white w-full py-2 rounded-lg hover:bg-[#C3002B] transition"
=======
            {/* ✅ View Details */}
            <button
              className="mt-4 w-full bg-[#E4002B] text-white py-2 rounded-md hover:bg-red-700 transition"
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
              onClick={() => onViewCampaign(c._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {!filteredCampaigns.length && (
        <p className="text-gray-200 text-center mt-8 text-lg">
=======
      {filteredCampaigns.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
          No campaigns found. Apply filters & search.
        </p>
      )}
    </div>
  );
};

export default CampaignStatus;
