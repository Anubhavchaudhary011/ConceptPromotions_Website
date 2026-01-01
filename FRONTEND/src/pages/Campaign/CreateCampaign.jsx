<<<<<<< HEAD
import React, { useState } from "react";
import Select from "react-select";
=======
import React, { useState, useRef, useEffect } from "react";
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
import { FaUser, FaBuilding } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
const regionStates = {
  North: [
    "Jammu and Kashmir",
    "Ladakh",
    "Himachal Pradesh",
    "Punjab",
    "Haryana",
    "Uttarakhand",
    "Uttar Pradesh",
    "Delhi",
    "Chandigarh",
  ],
  South: [
    "Andhra Pradesh",
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Telangana",
    "Puducherry",
    "Lakshadweep",
  ],
  East: [
    "Bihar",
    "Jharkhand",
    "Odisha",
    "West Bengal",
    "Sikkim",
    "Andaman and Nicobar Islands",
    "Arunachal Pradesh",
    "Assam",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Tripura",
  ],
  West: [
    "Rajasthan",
    "Gujarat",
    "Maharashtra",
    "Madhya Pradesh",
    "Goa",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
  ],
};

const campaignTypeOptions = [
  { value: "Retailer Enrolment", label: "Retailer Enrolment" },
  { value: "Display Payment", label: "Display Payment" },
  { value: "Incentive Payment", label: "Incentive Payment" },
  { value: "Others", label: "Others" },
];

const regionOptions = [
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" },
  { value: "All", label: "All" },
];

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#E4002B" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #E4002B" : "none",
    "&:hover": { borderColor: "#E4002B" },
    minHeight: "42px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FEE2E2" : "white",
    color: "#333",
    "&:active": { backgroundColor: "#FECACA" },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#FEE2E2",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#E4002B",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#E4002B",
    ":hover": {
      backgroundColor: "#E4002B",
      color: "white",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 20,
  }),
};

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [client, setClient] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [selectedCampaignType, setSelectedCampaignType] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllStates = () => {
    const allStates = Object.values(regionStates).flat();
    return allStates.map((state) => ({
      value: state,
      label: state,
    }));
  };

  const getStateOptions = () => {
    if (selectedRegions.length === 0) {
      return [];
    }

    // If "All" is selected
    if (selectedRegions.some(region => region.value === "All")) {
      return getAllStates();
    }

    // Get states for selected regions
    const filteredStates = selectedRegions.flatMap((region) => {
      return regionStates[region.value] || [];
    });

    return filteredStates.map((state) => ({
      value: state,
      label: state,
    }));
  };

  const stateOptions = getStateOptions();

  const handleRegionChange = (selected) => {
    setSelectedRegions(selected || []);
    
    // If "All" is selected, auto-select all states
    if (selected?.some(region => region.value === "All")) {
      setSelectedStates(getAllStates());
    } else if (selected && selected.length > 0) {
      // Filter out states that don't belong to selected regions
      const validStateValues = selected.flatMap(
        (region) => regionStates[region.value] || []
      );
      const filteredStates = selectedStates.filter((state) =>
        validStateValues.includes(state.value)
      );
      setSelectedStates(filteredStates);
    } else {
      setSelectedStates([]);
    }
  };

  const resetForm = () => {
    setCampaignName("");
    setClient("");
    setSelectedCampaignType(null);
    setSelectedRegions([]);
    setSelectedStates([]);
    setCampaignStartDate("");
    setCampaignEndDate("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!campaignName || !client || !selectedCampaignType || selectedRegions.length === 0 || selectedStates.length === 0 || !campaignStartDate || !campaignEndDate) {
=======
const CreateCampaign = () => {
  // ==== FORM STATE ====
  const [campaignName, setCampaignName] = useState("");
  const [client, setClient] = useState("");

  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [campaignSearch, setCampaignSearch] = useState("");
  const [showCampaignList, setShowCampaignList] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionSearch, setRegionSearch] = useState("");
  const [showRegionList, setShowRegionList] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [showStateList, setShowStateList] = useState(false);

  const [loading, setLoading] = useState(false);

  // Refs for closing dropdown on outside click
  const campaignRef = useRef();
  const regionRef = useRef();
  const stateRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (campaignRef.current && !campaignRef.current.contains(e.target)) {
        setShowCampaignList(false);
      }
      if (regionRef.current && !regionRef.current.contains(e.target)) {
        setShowRegionList(false);
      }
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setShowStateList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dropdown values
  const campaignTypes = ["Retailer Enrolment", "Display Payment", "Incentive Payment", "Others"];
  const regions = ["North", "East", "West", "South", "All"];

  const regionStates = {
    North: [
      "Jammu and Kashmir",
      "Ladakh",
      "Himachal Pradesh",
      "Punjab",
      "Haryana",
      "Uttarakhand",
      "Uttar Pradesh",
      "Delhi",
      "Chandigarh",
    ],
    South: [
      "Andhra Pradesh",
      "Karnataka",
      "Kerala",
      "Tamil Nadu",
      "Telangana",
      "Puducherry",
      "Lakshadweep",
    ],
    East: [
      "Bihar",
      "Jharkhand",
      "Odisha",
      "West Bengal",
      "Sikkim",
      "Andaman and Nicobar Islands",
      "Arunachal Pradesh",
      "Assam",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Tripura",
    ],
    West: [
      "Rajasthan",
      "Gujarat",
      "Maharashtra",
      "Madhya Pradesh",
      "Goa",
      "Chhattisgarh",
      "Dadra and Nagar Haveli and Daman and Diu",
    ],
  };

  const statesToShow =
    selectedRegion && selectedRegion !== "All"
      ? regionStates[selectedRegion] || []
      : ["All States", ...Object.values(regionStates).flat()];

  const filteredCampaigns = campaignTypes.filter((c) =>
    c.toLowerCase().includes(campaignSearch.toLowerCase())
  );

  const filteredRegions = regions.filter((r) =>
    r.toLowerCase().includes(regionSearch.toLowerCase())
  );

  const filteredStates = statesToShow.filter((s) =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!campaignName || !client || !selectedCampaign || !selectedRegion || !selectedState) {
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
      toast.error("All fields are required!", { theme: "dark" });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

<<<<<<< HEAD
      const response = await fetch("https://srv1168036.hstgr.cloud/api/admin/campaigns", {
=======
      const response = await fetch("https://supreme-419p.onrender.com/api/admin/campaigns", {
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: campaignName,
          client,
<<<<<<< HEAD
          type: selectedCampaignType.value,
          regions: selectedRegions.map(r => r.value),
          states: selectedStates.map(s => s.value),
          campaignStartDate,
          campaignEndDate,
=======
          type: selectedCampaign,
          region: selectedRegion,
          state: selectedState,
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error creating campaign", { theme: "dark" });
      } else {
<<<<<<< HEAD
        toast.success("Campaign created successfully!", { theme: "dark" });
=======
        toast.success("✅ Campaign created successfully!", { theme: "dark" });
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error", { theme: "dark" });
    }
    setLoading(false);
  };

<<<<<<< HEAD
=======
  const resetForm = () => {
    setCampaignName("");
    setClient("");
    setSelectedCampaign("");
    setCampaignSearch("");
    setSelectedRegion("");
    setRegionSearch("");
    setSelectedState("");
    setStateSearch("");
  };

>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
  return (
    <>
      <ToastContainer />

<<<<<<< HEAD
      <div className="w-full max-w-lg bg-[#EDEDED] shadow-md rounded-xl p-8 mx-auto">
=======
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8 mx-auto">
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#E4002B]">Create a Campaign</h1>
        </div>

<<<<<<< HEAD
        <div className="space-y-5">
=======
        <form className="space-y-5" onSubmit={handleSubmit}>
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Type campaign name here"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
              />
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Client <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Client Name"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
              />
            </div>
          </div>

          {/* Type of Campaign */}
<<<<<<< HEAD
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Type of Campaign <span className="text-red-500">*</span>
            </label>
            <Select
              styles={customSelectStyles}
              options={campaignTypeOptions}
              value={selectedCampaignType}
              onChange={setSelectedCampaignType}
              isSearchable
              placeholder="Select campaign type"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Region <span className="text-red-500">*</span>
            </label>
            <Select
              styles={customSelectStyles}
              options={regionOptions}
              value={selectedRegions}
              onChange={handleRegionChange}
              isSearchable
              isMulti
              placeholder="Select regions"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <Select
              styles={customSelectStyles}
              options={stateOptions}
              value={selectedStates}
              onChange={setSelectedStates}
              isSearchable
              isMulti
              placeholder={selectedRegions.length > 0 ? "Select states" : "Select region first"}
              isDisabled={selectedRegions.length === 0}
            />
          </div>

          {/* Campaign Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={campaignStartDate}
              onChange={(e) => setCampaignStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
            />
          </div>

          {/* Campaign End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={campaignEndDate}
              onChange={(e) => setCampaignEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
            />
=======
          <div className="relative" ref={campaignRef}>
            <label className="block text-sm font-medium mb-1">
              Type of Campaign <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Search or select type"
              value={selectedCampaign || campaignSearch}
              onChange={(e) => {
                setCampaignSearch(e.target.value);
                setSelectedCampaign("");
                setShowCampaignList(true);
              }}
              onFocus={() => setShowCampaignList(true)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
            />

            {showCampaignList && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto mt-1">
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setCampaignSearch("");
                        setShowCampaignList(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {campaign}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No match found</li>
                )}
              </ul>
            )}
          </div>

          {/* Region */}
          <div className="relative" ref={regionRef}>
            <label className="block text-sm font-medium mb-1">
              Region <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Search or select region"
              value={selectedRegion || regionSearch}
              onChange={(e) => {
                setRegionSearch(e.target.value);
                setSelectedRegion("");
                setShowRegionList(true);
              }}
              onFocus={() => setShowRegionList(true)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E4002B]"
            />

            {showRegionList && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto mt-1">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedRegion(region);
                        setRegionSearch("");
                        setShowRegionList(false);
                        setSelectedState("");
                        setStateSearch("");
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {region}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No match found</li>
                )}
              </ul>
            )}
          </div>

          {/* State */}
          <div className="relative" ref={stateRef}>
            <label className="block text-sm font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={selectedRegion ? "Search or select state" : "Select region first"}
              value={selectedState || stateSearch}
              onChange={(e) => {
                setStateSearch(e.target.value);
                setSelectedState("");
                setShowStateList(true);
              }}
              onFocus={() => setShowStateList(true)}
              disabled={!selectedRegion}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 ${
                selectedRegion ? "focus:ring-[#E4002B]" : "bg-gray-100 cursor-not-allowed"
              }`}
            />

            {showStateList && selectedRegion && (
              <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg max-h-48 overflow-y-auto mt-1">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedState(state);
                        setStateSearch("");
                        setShowStateList(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {state}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No match found</li>
                )}
              </ul>
            )}
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
          </div>

          {/* Submit */}
          <button
<<<<<<< HEAD
            onClick={handleSubmit}
=======
            type="submit"
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
            disabled={loading}
            className="w-full bg-[#E4002B] text-white py-2 rounded-lg font-medium hover:bg-[#C3002B] transition mb-10 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
<<<<<<< HEAD
        </div>
=======
        </form>
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
      </div>
    </>
  );
};

<<<<<<< HEAD
export default CreateCampaign;
=======
export default CreateCampaign;
>>>>>>> 4a2fe61ee6d0663e8a7052dc0ea1435b40b336d0
